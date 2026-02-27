import { NextResponse } from "next/server";

// Allow longer execution time on Vercel
export const maxDuration = 60;

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

    const outputLang = lang === "ar" ? "Arabic" : "English";
    const currencyCode = currency || "USD";

    const prompt = `You are a professional travel planner. Create a complete travel plan for "${destination}" for ${days} days.

Search the web for the LATEST info about this destination.

IMPORTANT: All prices in ${currencyCode}. Return ONLY valid JSON (no markdown, no backticks):

{
  "destination": "city in ${outputLang}",
  "country": "country in ${outputLang}",
  "currency": "code and name in ${outputLang}",
  "flag": "emoji",
  "weather": "brief in ${outputLang}",
  "bestTime": "months in ${outputLang}",
  "language": "in ${outputLang}",
  "visa": "info in ${outputLang}",
  "timezone": "GMT offset",
  "priceCurrency": "${currencyCode}",
  "hotels": {
    "luxury": [{"name":"","area":"","desc":"","rating":"9.2/10","pricePerNight":0}],
    "mid": [{"name":"","area":"","desc":"","rating":"","pricePerNight":0}],
    "budget": [{"name":"","area":"","desc":"","rating":"","pricePerNight":0}]
  },
  "topAttractions": [
    {"name":"in ${outputLang}","desc":"brief in ${outputLang}","cost":0,"duration":"2-3h"}
  ],
  "schedule": [
    {"day":1,"title":"in ${outputLang}","morning":{"activity":"in ${outputLang}","cost":0},"afternoon":{"activity":"","cost":0},"evening":{"activity":"","cost":0},"restaurant":{"name":"real name","cuisine":"in ${outputLang}","priceLevel":"$$$","rating":"4.5/5"}}
  ],
  "topRestaurants": [
    {"name":"","cuisine":"in ${outputLang}","priceLevel":"$$","area":"","rating":"4.7/5","specialty":"in ${outputLang}"}
  ],
  "tips": ["in ${outputLang}"],
  "budgetEstimate": {
    "luxury": {"hotel":0,"food":0,"activities":0,"transport":0},
    "mid": {"hotel":0,"food":0,"activities":0,"transport":0},
    "budget": {"hotel":0,"food":0,"activities":0,"transport":0}
  }
}

RULES:
- 4 hotels per tier with ratings and prices in ${currencyCode}
- 6 top attractions with cost and duration
- ${days} days in schedule, each with a different real restaurant
- 6 top restaurants with ratings and specialties
- 7 practical tips
- ALL in ${outputLang}, prices in ${currencyCode}
- ONLY JSON`;

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
          model: "claude-sonnet-4-20250514",
          max_tokens: 12000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content: prompt }],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errText = await response.text();
        console.error("Anthropic API error:", response.status, errText);
        return NextResponse.json({ error: "AI service error" }, { status: 502 });
      }

      const data = await response.json();
      const textBlocks = data.content?.filter((b) => b.type === "text").map((b) => b.text).join("") || "";
      const cleaned = textBlocks.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

      if (!cleaned) {
        return NextResponse.json({ error: "Empty AI response" }, { status: 502 });
      }

      const plan = JSON.parse(cleaned);
      return NextResponse.json({ plan });
    } catch (fetchErr) {
      clearTimeout(timeout);
      if (fetchErr.name === "AbortError") {
        return NextResponse.json({ error: "Request took too long. Try a shorter trip or try again." }, { status: 504 });
      }
      throw fetchErr;
    }
  } catch (err) {
    console.error("Plan generation error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
