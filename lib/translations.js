const translations = {
  ar: {
    dir: "rtl",
    nav: { logo: "TripWall", plan: "خطط رحلتك", how: "كيف يعمل", lang: "EN" },
    hero: {
      badge: "مدعوم بالذكاء الاصطناعي",
      h1a: "رحلتك القادمة",
      h1b: "مخططة بالكامل.",
      desc: "أدخل أي وجهة في العالم — يبحث TripWall تلقائياً عن أفضل الفنادق، المطاعم، والأماكن السياحية بتقييمات حقيقية ومحدّثة.",
      cta: "خطط رحلتك مجاناً",
      scroll: "اكتشف المزيد",
    },
    stats: [
      { val: "500+", label: "وجهة حول العالم" },
      { val: "< 30s", label: "لإنشاء خطة كاملة" },
      { val: "100%", label: "مجاني بالكامل" },
    ],
    how: {
      title: "كيف يعمل",
      subtitle: "ثلاث خطوات فقط",
      steps: [
        { num: "01", title: "اختر وجهتك", desc: "اكتب أي مدينة أو دولة في العالم — لا حدود لاختياراتك." },
        { num: "02", title: "حدد المدة", desc: "كم يوم ستقضي؟ من يوم واحد إلى 10 أيام." },
        { num: "03", title: "استلم خطتك", desc: "جدول يومي + فنادق + مطاعم + ميزانية — كل شيء جاهز فوراً." },
      ],
    },
    features: {
      title: "ما يميزنا",
      items: [
        { icon: "🔍", title: "بحث مباشر", desc: "نبحث في الإنترنت لحظياً عن أحدث التقييمات والأسعار." },
        { icon: "🌍", title: "أي وجهة", desc: "من طوكيو إلى مراكش — اكتب أي مكان ونجهز لك خطة كاملة." },
        { icon: "💰", title: "ثلاث ميزانيات", desc: "اقتصادي، متوسط، أو فاخر — خيارات تناسب كل ميزانية." },
        { icon: "📋", title: "جدول مفصّل", desc: "صباح، ظهر، مساء — كل يوم مخطط بالتفصيل." },
        { icon: "💡", title: "نصائح محلية", desc: "تأشيرة، عملة، طقس، ونصائح خاصة بكل وجهة." },
        { icon: "🆓", title: "مجاني تماماً", desc: "لا اشتراك، لا بطاقة ائتمان — مجاناً بالكامل." },
      ],
    },
    planner: {
      title: "خطط رحلتك",
      destLabel: "الوجهة",
      destPlaceholder: "اكتب أي مدينة أو دولة...",
      popular: "الوجهات الشائعة",
      daysLabel: "المدة",
      go: "إنشاء الخطة ←",
      loading: "جاري إعداد خطة",
      searching: "يبحث في الإنترنت عن أحدث المعلومات والتقييمات...",
      error: "حدث خطأ. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.",
    },
    plan: {
      badge: "خطة رحلتك",
      currency: "العملة", weather: "الطقس", bestTime: "أفضل وقت",
      language: "اللغة", visa: "التأشيرة", timezone: "التوقيت",
      hotels: "الإقامة المقترحة", night: "ليلة", total: "إجمالي",
      schedule: "الجدول اليومي", arrival: "يوم الوصول", lastDay: "آخر يوم", dayN: "اليوم",
      morning: "الصباح", afternoon: "بعد الظهر", evening: "المساء", free: "مجاني",
      budget: "تقدير الميزانية",
      hotelCat: "الإقامة", activities: "الأنشطة", food: "الطعام", transport: "المواصلات",
      nights: "ليالي", days: "أيام",
      grandTotal: "الإجمالي التقريبي",
      note: "* الأسعار تقريبية بالدولار ومبنية على بحث مباشر. لا تشمل تذاكر الطيران.",
      tips: "نصائح مهمة",
      sourceNote: "تم إنشاء هذه الخطة بالذكاء الاصطناعي مع البحث المباشر",
      newTrip: "خطط لرحلة أخرى",
    },
    tiers: { budget: "اقتصادي", mid: "متوسط", luxury: "فاخر" },
    footer: { powered: "مدعوم بالذكاء الاصطناعي والبحث المباشر" },
    ctaSection: { title: "جاهز تخطط رحلتك؟", desc: "ابدأ الآن واحصل على خطة رحلة كاملة في أقل من 30 ثانية." },
  },
  en: {
    dir: "ltr",
    nav: { logo: "TripWall", plan: "Plan Your Trip", how: "How It Works", lang: "عربي" },
    hero: {
      badge: "AI-Powered",
      h1a: "Your Next Trip",
      h1b: "Fully Planned.",
      desc: "Enter any destination — TripWall searches for the best hotels, restaurants, and attractions with real, up-to-date ratings.",
      cta: "Plan Your Trip — Free",
      scroll: "Learn More",
    },
    stats: [
      { val: "500+", label: "Destinations Worldwide" },
      { val: "< 30s", label: "To Generate a Full Plan" },
      { val: "100%", label: "Completely Free" },
    ],
    how: {
      title: "How It Works",
      subtitle: "Just Three Steps",
      steps: [
        { num: "01", title: "Choose Destination", desc: "Type any city or country — no limits." },
        { num: "02", title: "Set Duration", desc: "From 1 day up to 10 days." },
        { num: "03", title: "Get Your Plan", desc: "Schedule + hotels + restaurants + budget — instantly." },
      ],
    },
    features: {
      title: "Why TripWall",
      items: [
        { icon: "🔍", title: "Live Search", desc: "Real-time search for the latest ratings and prices." },
        { icon: "🌍", title: "Any Destination", desc: "Type any place and get a complete plan." },
        { icon: "💰", title: "Three Budgets", desc: "Budget, mid-range, or luxury options." },
        { icon: "📋", title: "Detailed Schedule", desc: "Every day planned with restaurants and activities." },
        { icon: "💡", title: "Local Tips", desc: "Visa, currency, weather, and destination-specific tips." },
        { icon: "🆓", title: "Totally Free", desc: "No subscription, no credit card required." },
      ],
    },
    planner: {
      title: "Plan Your Trip",
      destLabel: "DESTINATION",
      destPlaceholder: "Type any city or country...",
      popular: "Popular Destinations",
      daysLabel: "DURATION",
      go: "Generate Plan →",
      loading: "Preparing your plan for",
      searching: "Searching the web for the latest information...",
      error: "An error occurred. Check your connection and try again.",
    },
    plan: {
      badge: "Your Trip Plan",
      currency: "Currency", weather: "Weather", bestTime: "Best Time",
      language: "Language", visa: "Visa", timezone: "Timezone",
      hotels: "Recommended Hotels", night: "night", total: "total",
      schedule: "Daily Schedule", arrival: "Arrival Day", lastDay: "Last Day", dayN: "Day",
      morning: "Morning", afternoon: "Afternoon", evening: "Evening", free: "Free",
      budget: "Budget Estimate",
      hotelCat: "Accommodation", activities: "Activities", food: "Food & Drinks", transport: "Transport",
      nights: "nights", days: "days",
      grandTotal: "Estimated Total",
      note: "* Approximate USD prices based on live search. Flights not included.",
      tips: "Important Tips",
      sourceNote: "Generated using AI with live web search",
      newTrip: "Plan Another Trip",
    },
    tiers: { budget: "Budget", mid: "Mid-range", luxury: "Luxury" },
    footer: { powered: "Powered by AI & Live Web Search" },
    ctaSection: { title: "Ready to Plan?", desc: "Get a complete trip plan in less than 30 seconds." },
  },
};

export default translations;
