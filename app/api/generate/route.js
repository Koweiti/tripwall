import { NextResponse } from "next/server";

export const maxDuration = 60;

// ── In-memory cache (persists between requests on same serverless instance) ──
const cache = new Map();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(destination, days, lang, currency) {
  return `${destination.toLowerCase().trim()}_${days}_${lang}_${currency}`;
}

function getFromCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  // Limit cache size to prevent memory issues
  if (cache.size > 200) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, { data, timestamp: Date.now() });
}

export async function POST(request) {
  try {
    const { destination, days, lang, currency } = await request.json();

    if (!destination || !days) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    // ── Check cache first ──
    const cacheKey = getCacheKey(destination, days, lang, currency);
    const cached = getFromCache(cacheKey);
    if (cached) {
      console.log(`Cache hit: ${cacheKey}`);
      return NextResponse.json({ plan: cached, cached: true });
    }

    console.log(`Cache miss: ${cacheKey} — calling API`);

    const outputLang = lang === "ar" ? "Arabic" : "English";
    const currencyCode = currency || "USD";

    const prompt = `You are a travel planner. Create a plan for "${destination}" for ${days} days. Search web for latest info. Prices in ${currencyCode}.

Return ONLY valid JSON:
{
  "destination":"in ${outputLang}","country":"in ${outputLang}","currency":"code+name in ${outputLang}","flag":"emoji",
  "weather":"brief","bestTime":"months","language":"","visa":"","timezone":"GMT",
  "priceCurrency":"${currencyCode}",
  "hotels":{"luxury":[{"name":"","area":"","desc":"","rating":"","pricePerNight":0}],"mid":[same],"budget":[same]},
  "topAttractions":[{"name":"","desc":"","cost":0,"duration":""}],
  "schedule":[{"day":1,"title":"","morning":{"activity":"","cost":0},"afternoon":{"activity":"","cost":0},"evening":{"activity":"","cost":0},"restaurant":{"name":"","cuisine":"","priceLevel":"","rating":""}}],
  "topRestaurants":[{"name":"","cuisine":"","priceLevel":"","area":"","rating":"","specialty":""}],
  "tips":[],
  "budgetEstimate":{"luxury":{"hotel":0,"food":0,"activities":0,"transport":0},"mid":{same},"budget":{same}}
}

RULES: 4 hotels/tier, 6 attractions, ${days} days schedule, 6 restaurants, 7 tips. ALL ${outputLang}. Prices ${currencyCode}. ONLY JSON.`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 8000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: prompt }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text();
        console.error("API error:", response.status, errText);
        return NextResponse.json({ error: "AI service error" }, { status: 502 });
      }

      const data = await response.json();
      const textBlocks = data.content?.filter((b) => b.type === "text").map((b) => b.text).join("") || "";
      const cleaned = textBlocks.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

      if (!cleaned) {
        return NextResponse.json({ error: "Empty response" }, { status: 502 });
      }

      const plan = JSON.parse(cleaned);

      // ── Save to cache ──
      setCache(cacheKey, plan);
      console.log(`Cached: ${cacheKey}`);

      return NextResponse.json({ plan });
    } catch (fetchErr) {
      clearTimeout(timeout);
      if (fetchErr.name === "AbortError") {
        return NextResponse.json({ error: "Request timeout. Try again." }, { status: 504 });
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
