export const metadata = {
  title: "TripWall — AI Trip Planner | مخطط رحلات ذكي",
  description: "Plan your trip to any destination with AI-powered recommendations. Hotels, restaurants, daily schedule, and budget — all generated instantly.",
  keywords: "trip planner, travel, AI, hotels, restaurants, budget, مخطط رحلات, سفر, ذكاء اصطناعي",
  openGraph: {
    title: "TripWall — AI Trip Planner",
    description: "Enter any destination, get a complete trip plan in seconds.",
    type: "website",
    url: "https://tripwall.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #FAFAF8; font-family: 'Tajawal', 'DM Sans', -apple-system, sans-serif; }
          input:focus, button:focus { outline: none; }
          a { text-decoration: none; color: inherit; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
