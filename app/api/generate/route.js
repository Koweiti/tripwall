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

    const prompt = `You are a world-class professional travel planner. Create a COMPREHENSIVE travel plan for "${destination}" for ${days} days.

Search the web extensively for the LATEST and BEST rated information about this destination.

IMPORTANT: All prices must be in ${currencyCode}. Convert from USD if needed using current exchange rates.

Return ONLY valid JSON (no markdown, no backticks) with this structure:
{
  "destination": "city name in ${outputLang}",
  "country": "country in ${outputLang}",
  "currency": "code and name in ${outputLang}",
  "flag": "emoji",
  "weather": "detailed weather description in ${outputLang}",
  "bestTime": "best months to visit in ${outputLang}",
  "language": "in ${outputLang}",
  "visa": "detailed visa info in ${outputLang}",
  "timezone": "GMT offset",
  "priceCurrency": "${currencyCode}",
  "hotels": {
    "luxury": [{"name":"","area":"","desc":"short description","rating":"e.g. 9.2/10","pricePerNight":0}],
    "mid": [{"name":"","area":"","desc":"","rating":"","pricePerNight":0}],
    "budget": [{"name":"","area":"","desc":"","rating":"","pricePerNight":0}]
  },
  "topAttractions": [
    {"name":"in ${outputLang}","desc":"brief in ${outputLang}","cost":0,"duration":"e.g. 2-3 hours"}
  ],
  "schedule": [
    {"day":1,"title":"in ${outputLang}","morning":{"activity":"detailed in ${outputLang}","location":"specific place","cost":0},"afternoon":{"activity":"","location":"","cost":0},"evening":{"activity":"","location":"","cost":0},"restaurant":{"name":"real name","cuisine":"in ${outputLang}","priceLevel":"$$$","rating":"e.g. 4.5/5"}}
  ],
  "topRestaurants": [
    {"name":"real name","cuisine":"in ${outputLang}","priceLevel":"$$","area":"neighborhood","rating":"e.g. 4.7/5","specialty":"signature dish in ${outputLang}"}
  ],
  "tips": ["tip in ${outputLang}"],
  "budgetEstimate": {
    "luxury": {"hotel":0,"food":0,"activities":0,"transport":0},
    "mid": {"hotel":0,"food":0,"activities":0,"transport":0},
    "budget": {"hotel":0,"food":0,"activities":0,"transport":0}
  }
}

RULES:
- Search for REAL current top-rated hotels, restaurants, attractions
- 5 hotels per tier (luxury, mid, budget) with REAL ratings and prices in ${currencyCode}
- 8 top attractions with costs and durations
- Exactly ${days} days in schedule with DETAILED activities and specific locations
- Each day must have a DIFFERENT real restaurant with rating
- 8 top standalone restaurants (separate from daily schedule)
- ALL text in ${outputLang}
- ALL prices in ${currencyCode} (convert using current rates)
- Budget totals for all ${days} days in ${currencyCode}
- 8 practical travel tips
- Include ratings for hotels and restaurants
- ONLY JSON, nothing else`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
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
