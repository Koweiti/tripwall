import { NextResponse } from "next/server";

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

Search the web for the LATEST and BEST rated information about this destination.

IMPORTANT: All prices must be in ${currencyCode}. Convert from USD if needed using current exchange rates.

Return ONLY valid JSON (no markdown, no backticks) with this structure:
{
  "destination": "city name in ${outputLang}",
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
    "luxury": [{"name":"","area":"","desc":"","pricePerNight":0}],
    "mid": [{"name":"","area":"","desc":"","pricePerNight":0}],
    "budget": [{"name":"","area":"","desc":"","pricePerNight":0}]
  },
  "schedule": [
    {"day":1,"title":"in ${outputLang}","morning":{"activity":"in ${outputLang}","cost":0},"afternoon":{"activity":"","cost":0},"evening":{"activity":"","cost":0},"restaurant":{"name":"real name","cuisine":"in ${outputLang}","priceLevel":"$$$"}}
  ],
  "tips": ["tip1 in ${outputLang}", "tip2", "tip3", "tip4", "tip5"],
  "budgetEstimate": {
    "luxury": {"hotel":0,"food":0,"activities":0,"transport":0},
    "mid": {"hotel":0,"food":0,"activities":0,"transport":0},
    "budget": {"hotel":0,"food":0,"activities":0,"transport":0}
  }
}

RULES:
- Search for REAL current top-rated hotels, restaurants, attractions
- 3 hotels per tier with REAL current prices in ${currencyCode}
- Exactly ${days} days in schedule
- ALL text in ${outputLang}
- ALL prices in ${currencyCode} (convert from USD using current rates)
- Budget totals for all ${days} days in ${currencyCode}
- Real restaurant names
- 5 practical tips
- ONLY JSON`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{ role: "user", content: prompt }],
      }),
    });

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
  } catch (err) {
    console.error("Plan generation error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
