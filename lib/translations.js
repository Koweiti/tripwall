const translations = {
  ar: {
    dir: "rtl",
    nav: { plan: "خطط رحلتك", how: "كيف يعمل", lang: "EN" },
    hero: { badge: "مدعوم بالذكاء الاصطناعي", h1a: "رحلتك القادمة", h1b: "مخططة بالكامل.", desc: "أدخل أي وجهة في العالم — يبحث TripWall تلقائياً عن أفضل الفنادق، المطاعم، والأماكن السياحية بتقييمات حقيقية ومحدّثة.", cta: "خطط رحلتك مجاناً", scroll: "اكتشف المزيد" },
    stats: [{ val: "500+", l: "وجهة حول العالم" }, { val: "< 30s", l: "لإنشاء خطة كاملة" }, { val: "100%", l: "مجاني بالكامل" }],
    how: { title: "كيف يعمل", sub: "ثلاث خطوات فقط", steps: [
      { n: "01", t: "اختر وجهتك", d: "اكتب أي مدينة أو دولة في العالم — لا حدود لاختياراتك." },
      { n: "02", t: "حدد المدة", d: "كم يوم ستقضي؟ من يوم واحد إلى 10 أيام." },
      { n: "03", t: "استلم خطتك", d: "جدول يومي + فنادق + مطاعم + ميزانية — كل شيء جاهز فوراً." },
    ]},
    features: { title: "ما يميزنا", items: [
      { icon: "🔍", t: "بحث مباشر", d: "نبحث في الإنترنت لحظياً عن أحدث التقييمات والأسعار." },
      { icon: "🌍", t: "أي وجهة", d: "من طوكيو إلى مراكش — اكتب أي مكان ونجهز لك خطة كاملة." },
      { icon: "💰", t: "ثلاث ميزانيات", d: "اقتصادي، متوسط، أو فاخر — خيارات تناسب كل ميزانية." },
      { icon: "📋", t: "جدول مفصّل", d: "صباح، ظهر، مساء — كل يوم مخطط بالتفصيل." },
      { icon: "💡", t: "نصائح محلية", d: "تأشيرة، عملة، طقس، ونصائح خاصة بكل وجهة." },
      { icon: "🆓", t: "مجاني تماماً", d: "لا اشتراك، لا بطاقة ائتمان — مجاناً بالكامل." },
    ]},
    cta: { title: "جاهز تخطط رحلتك؟", desc: "ابدأ الآن واحصل على خطة رحلة كاملة في أقل من 30 ثانية." },
    planner: { title: "خطط رحلتك", dest: "الوجهة", ph: "اكتب أي مدينة أو دولة...", pop: "الوجهات الشائعة", days: "المدة", go: "إنشاء الخطة ←", loading: "جاري إعداد خطة", searching: "يبحث في الإنترنت عن أحدث المعلومات والتقييمات...", err: "حدث خطأ. تأكد من اتصالك بالإنترنت وحاول مرة أخرى." },
    plan: { badge: "خطة رحلتك", currency: "العملة", weather: "الطقس", best: "أفضل وقت", language: "اللغة", visa: "التأشيرة", tz: "التوقيت", hotels: "الإقامة المقترحة", night: "ليلة", total: "إجمالي", sched: "الجدول اليومي", arrive: "يوم الوصول", last: "آخر يوم", dayN: "اليوم", am: "الصباح", pm: "بعد الظهر", eve: "المساء", free: "مجاني", budget: "تقدير الميزانية", hotelC: "الإقامة", act: "الأنشطة", food: "الطعام", trans: "المواصلات", nights: "ليالي", daysL: "أيام", grand: "الإجمالي التقريبي", note: "* الأسعار تقريبية بالدولار ومبنية على بحث مباشر. لا تشمل تذاكر الطيران.", tips: "نصائح مهمة", src: "تم إنشاء هذه الخطة بالذكاء الاصطناعي مع البحث المباشر", newTrip: "خطط لرحلة أخرى" },
    tiers: { budget: "اقتصادي", mid: "متوسط", luxury: "فاخر" },
    footer: "مدعوم بالذكاء الاصطناعي والبحث المباشر",
  },
  en: {
    dir: "ltr",
    nav: { plan: "Plan Your Trip", how: "How It Works", lang: "عربي" },
    hero: { badge: "AI-Powered", h1a: "Your Next Trip", h1b: "Fully Planned.", desc: "Enter any destination — TripWall searches for the best hotels, restaurants, and attractions with real, up-to-date ratings.", cta: "Plan Your Trip — Free", scroll: "Learn More" },
    stats: [{ val: "500+", l: "Destinations Worldwide" }, { val: "< 30s", l: "To Generate a Full Plan" }, { val: "100%", l: "Completely Free" }],
    how: { title: "How It Works", sub: "Just Three Steps", steps: [
      { n: "01", t: "Choose Destination", d: "Type any city or country — no limits." },
      { n: "02", t: "Set Duration", d: "From 1 day up to 10 days." },
      { n: "03", t: "Get Your Plan", d: "Schedule + hotels + restaurants + budget — instantly." },
    ]},
    features: { title: "Why TripWall", items: [
      { icon: "🔍", t: "Live Search", d: "Real-time search for the latest ratings and prices." },
      { icon: "🌍", t: "Any Destination", d: "Type any place and get a complete plan." },
      { icon: "💰", t: "Three Budgets", d: "Budget, mid-range, or luxury options." },
      { icon: "📋", t: "Detailed Schedule", d: "Every day planned with restaurants and activities." },
      { icon: "💡", t: "Local Tips", d: "Visa, currency, weather, and destination-specific tips." },
      { icon: "🆓", t: "Totally Free", d: "No subscription, no credit card required." },
    ]},
    cta: { title: "Ready to Plan?", desc: "Get a complete trip plan in less than 30 seconds." },
    planner: { title: "Plan Your Trip", dest: "DESTINATION", ph: "Type any city or country...", pop: "Popular Destinations", days: "DURATION", go: "Generate Plan →", loading: "Preparing plan for", searching: "Searching the web for the latest information and ratings...", err: "An error occurred. Check your connection and try again." },
    plan: { badge: "Your Trip Plan", currency: "Currency", weather: "Weather", best: "Best Time", language: "Language", visa: "Visa", tz: "Timezone", hotels: "Recommended Hotels", night: "night", total: "total", sched: "Daily Schedule", arrive: "Arrival Day", last: "Last Day", dayN: "Day", am: "Morning", pm: "Afternoon", eve: "Evening", free: "Free", budget: "Budget Estimate", hotelC: "Accommodation", act: "Activities", food: "Food & Drinks", trans: "Transport", nights: "nights", daysL: "days", grand: "Estimated Total", note: "* Approximate USD prices based on live search. Flights not included.", tips: "Important Tips", src: "Generated using AI with live web search", newTrip: "Plan Another Trip" },
    tiers: { budget: "Budget", mid: "Mid-range", luxury: "Luxury" },
    footer: "Powered by AI & Live Web Search",
  },
};

export default translations;
