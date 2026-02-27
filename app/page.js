"use client";
import { useState, useEffect, useRef } from "react";

/* ── Scroll Reveal ── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={{ ...style, opacity: v?1:0, transform: v?"translateY(0)":"translateY(30px)", transition: `all .7s ease ${delay}s` }}>{children}</div>;
}

/* ── Data ── */
const DESTS = [
  { ar: "دبي", en: "Dubai", flag: "🇦🇪", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" },
  { ar: "إسطنبول", en: "Istanbul", flag: "🇹🇷", img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80" },
  { ar: "باريس", en: "Paris", flag: "🇫🇷", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
  { ar: "لندن", en: "London", flag: "🇬🇧", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80" },
  { ar: "طوكيو", en: "Tokyo", flag: "🇯🇵", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80" },
  { ar: "بالي", en: "Bali", flag: "🇮🇩", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
  { ar: "روما", en: "Rome", flag: "🇮🇹", img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80" },
  { ar: "برشلونة", en: "Barcelona", flag: "🇪🇸", img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80" },
  { ar: "نيويورك", en: "New York", flag: "🇺🇸", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80" },
  { ar: "مراكش", en: "Marrakech", flag: "🇲🇦", img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80" },
  { ar: "القاهرة", en: "Cairo", flag: "🇪🇬", img: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80" },
  { ar: "كوالالمبور", en: "Kuala Lumpur", flag: "🇲🇾", img: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80" },
];

const heroImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=80",
];

const T = {
  ar: {
    nav: { plan: "خطط رحلتك", how: "كيف يعمل", lang: "EN" },
    hero: { badge: "مدعوم بالذكاء الاصطناعي", h1a: "اكتشف العالم", h1b: "بخطة مثالية", desc: "أدخل أي وجهة — نبحث لك عن أفضل الفنادق والمطاعم والأماكن بتقييمات حقيقية ومحدّثة", cta: "ابدأ التخطيط", scroll: "اكتشف المزيد" },
    stats: [{ v: "500+", l: "وجهة" }, { v: "< 30s", l: "لإنشاء خطة" }, { v: "100%", l: "مجاني" }],
    how: { title: "كيف يعمل", sub: "ثلاث خطوات", steps: [
      { n: "01", t: "اختر وجهتك", d: "اكتب أي مدينة في العالم" },
      { n: "02", t: "حدد المدة", d: "من يوم واحد إلى 10 أيام" },
      { n: "03", t: "استلم خطتك", d: "جدول + فنادق + مطاعم + ميزانية" },
    ]},
    dest: { title: "وجهات مميزة", sub: "اختر وجهتك أو اكتب أي مدينة" },
    cta: { title: "جاهز للمغامرة؟", desc: "خطة سفر كاملة في ثوانٍ — مجاناً" },
    planner: { title: "خطط رحلتك", dest: "الوجهة", ph: "اكتب أي مدينة أو دولة...", pop: "اختر وجهة سريعة", days: "عدد الأيام", go: "إنشاء الخطة", loading: "جاري إعداد خطة", searching: "يبحث عن أحدث المعلومات...", err: "حدث خطأ. حاول مرة أخرى." },
    plan: { badge: "خطة رحلتك", currency: "العملة", weather: "الطقس", best: "أفضل وقت", language: "اللغة", visa: "التأشيرة", tz: "التوقيت", hotels: "الفنادق", night: "ليلة", total: "إجمالي", sched: "الجدول اليومي", arrive: "يوم الوصول", last: "آخر يوم", dayN: "اليوم", am: "صباحاً", pm: "ظهراً", eve: "مساءً", free: "مجاني", budget: "الميزانية", hotelC: "الإقامة", act: "الأنشطة", food: "الطعام", trans: "المواصلات", nights: "ليالي", daysL: "أيام", grand: "الإجمالي", note: "* أسعار تقريبية. لا تشمل الطيران.", tips: "نصائح", attractions: "أبرز المعالم", restaurants: "أفضل المطاعم", src: "خطة مبنية بالذكاء الاصطناعي والبحث المباشر", newTrip: "رحلة جديدة" },
    tiers: { budget: "اقتصادي", mid: "متوسط", luxury: "فاخر" },
    footer: "مدعوم بالذكاء الاصطناعي",
    currLabel: "الأسعار بـ",
  },
  en: {
    nav: { plan: "Plan Trip", how: "How It Works", lang: "عربي" },
    hero: { badge: "AI-Powered", h1a: "Discover the World", h1b: "With the Perfect Plan", desc: "Enter any destination — we find the best hotels, restaurants, and attractions with real, live ratings", cta: "Start Planning", scroll: "Learn More" },
    stats: [{ v: "500+", l: "Destinations" }, { v: "< 30s", l: "To Plan" }, { v: "100%", l: "Free" }],
    how: { title: "How It Works", sub: "Three Steps", steps: [
      { n: "01", t: "Pick Destination", d: "Type any city in the world" },
      { n: "02", t: "Set Duration", d: "From 1 day up to 10 days" },
      { n: "03", t: "Get Your Plan", d: "Schedule + hotels + restaurants + budget" },
    ]},
    dest: { title: "Featured Destinations", sub: "Pick one or type any city" },
    cta: { title: "Ready for Adventure?", desc: "Complete travel plan in seconds — totally free" },
    planner: { title: "Plan Your Trip", dest: "DESTINATION", ph: "Type any city or country...", pop: "Quick picks", days: "DURATION", go: "Generate Plan", loading: "Preparing plan for", searching: "Searching for the latest info...", err: "Error occurred. Try again." },
    plan: { badge: "Your Trip Plan", currency: "Currency", weather: "Weather", best: "Best Time", language: "Language", visa: "Visa", tz: "Timezone", hotels: "Hotels", night: "night", total: "total", sched: "Daily Schedule", arrive: "Arrival", last: "Last Day", dayN: "Day", am: "Morning", pm: "Afternoon", eve: "Evening", free: "Free", budget: "Budget", hotelC: "Hotels", act: "Activities", food: "Food", trans: "Transport", nights: "nights", daysL: "days", grand: "Total", note: "* Approximate prices. Flights not included.", tips: "Tips", attractions: "Top Attractions", restaurants: "Top Restaurants", src: "Built with AI & live web search", newTrip: "New Trip" },
    tiers: { budget: "Budget", mid: "Mid-range", luxury: "Luxury" },
    footer: "Powered by AI",
    currLabel: "Prices in",
  }
};

export default function TripWall() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("landing");
  const [dest, setDest] = useState("");
  const [days, setDays] = useState(4);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [tier, setTier] = useState("mid");
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroIn, setHeroIn] = useState(false);
  const [cur, setCur] = useState({ code: "USD", sym: "$", name: "USD" });
  const L = T[lang];
  const rtl = lang === "ar";

  useEffect(() => { setTimeout(() => setHeroIn(true), 200); }, []);
  useEffect(() => { const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 6000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const C = {
      KW:{c:"KWD",s:"د.ك",a:"دينار كويتي",e:"KWD"},AE:{c:"AED",s:"د.إ",a:"درهم إماراتي",e:"AED"},SA:{c:"SAR",s:"ر.س",a:"ريال سعودي",e:"SAR"},
      QA:{c:"QAR",s:"ر.ق",a:"ريال قطري",e:"QAR"},BH:{c:"BHD",s:"د.ب",a:"دينار بحريني",e:"BHD"},OM:{c:"OMR",s:"ر.ع",a:"ريال عماني",e:"OMR"},
      EG:{c:"EGP",s:"ج.م",a:"جنيه مصري",e:"EGP"},JO:{c:"JOD",s:"د.أ",a:"دينار أردني",e:"JOD"},MA:{c:"MAD",s:"د.م",a:"درهم مغربي",e:"MAD"},
      TR:{c:"TRY",s:"₺",a:"ليرة تركية",e:"TRY"},GB:{c:"GBP",s:"£",a:"جنيه إسترليني",e:"GBP"},
      FR:{c:"EUR",s:"€",a:"يورو",e:"EUR"},DE:{c:"EUR",s:"€",a:"يورو",e:"EUR"},IT:{c:"EUR",s:"€",a:"يورو",e:"EUR"},ES:{c:"EUR",s:"€",a:"يورو",e:"EUR"},
      US:{c:"USD",s:"$",a:"دولار",e:"USD"},IN:{c:"INR",s:"₹",a:"روبية",e:"INR"},JP:{c:"JPY",s:"¥",a:"ين",e:"JPY"},MY:{c:"MYR",s:"RM",a:"رينغيت",e:"MYR"},
    };
    fetch("https://ipapi.co/json/").then(r=>r.json()).then(d=>{
      const cc=d?.country_code; if(cc&&C[cc]){const x=C[cc]; setCur({code:x.c,sym:x.s,name:lang==="ar"?x.a:x.e});}
    }).catch(()=>{});
  }, [lang]);

  const goPlan = () => { setPage("planner"); window.scrollTo({top:0}); };
  const goHome = () => { setPlan(null); setDest(""); setError(""); setPage("landing"); setHeroIn(false); setTimeout(()=>setHeroIn(true),200); };
  const reset = () => { setPlan(null); setDest(""); setDays(4); setTier("mid"); setError(""); };

  const generate = async () => {
    if (!dest.trim()) return;
    setLoading(true); setError(""); setPlan(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest.trim(), days, lang, currency: cur.code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setPlan(data.plan);
    } catch(err) { console.error(err); setError(L.planner.err); }
    finally { setLoading(false); }
  };

  const hotels = plan?.hotels?.[tier]||[];
  const sched = plan?.schedule||[];
  const bd = plan?.budgetEstimate?.[tier]||{};
  const tot = (bd.hotel||0)+(bd.food||0)+(bd.activities||0)+(bd.transport||0);
  const dt = n => lang==="ar"?(n===1?"يوم واحد":n===2?"يومان":`${n} أيام`):`${n} ${n===1?"day":"days"}`;
  const P = v => `${cur.sym}${v?.toLocaleString()||0}`;
  const W = { maxWidth: 900, margin: "0 auto", padding: "0 28px" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", direction: rtl?"rtl":"ltr", fontFamily: "'Tajawal','DM Sans',-apple-system,sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes kenburns{0%{transform:scale(1)}100%{transform:scale(1.08)}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        input:focus,button:focus{outline:none}
        ::selection{background:#c9a96e;color:#000}
        .glow{transition:all .4s cubic-bezier(.2,0,0,1)}
        .glow:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(201,169,110,.12)}
        .imgcard{position:relative;overflow:hidden;border-radius:16px;cursor:pointer;transition:transform .5s cubic-bezier(.2,0,0,1)}
        .imgcard:hover{transform:scale(1.02)}
        .imgcard img{transition:transform .8s cubic-bezier(.2,0,0,1)}
        .imgcard:hover img{transform:scale(1.1)}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(10,10,10,.6)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <div onClick={goHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#c9a96e,#a8874a)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontSize: 14, fontWeight: 800 }}>T</div>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "1px" }}>TRIPWALL</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 13 }}>
            <span onClick={goPlan} style={{ color: "rgba(255,255,255,.6)", cursor: "pointer", fontWeight: 500, transition: "color .2s" }}>{L.nav.plan}</span>
            <button onClick={() => setLang(lang==="ar"?"en":"ar")} style={{ padding: "6px 16px", borderRadius: 6, border: "1px solid rgba(255,255,255,.15)", background: "transparent", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "rgba(255,255,255,.7)", fontFamily: "inherit" }}>{L.nav.lang}</button>
          </div>
        </div>
      </nav>

      {/* ═══ LANDING ═══ */}
      {page==="landing" && <>
        {/* HERO — Full bleed image */}
        <section style={{ position: "relative", height: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {heroImages.map((img,i) => (
            <div key={i} style={{ position: "absolute", inset: 0, opacity: heroIdx===i?1:0, transition: "opacity 1.5s ease", animation: heroIdx===i?"kenburns 8s ease forwards":"none" }}>
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.3) 0%, rgba(0,0,0,.6) 60%, rgba(10,10,10,1) 100%)" }} />
          
          <div style={{ position: "relative", textAlign: "center", maxWidth: 700, padding: "0 28px", opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(30px)", transition: "all 1s ease .3s" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 24, background: "rgba(201,169,110,.12)", border: "1px solid rgba(201,169,110,.25)", marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a96e", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "#c9a96e", letterSpacing: 2, textTransform: "uppercase" }}>{L.hero.badge}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: "clamp(42px,7vw,76px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px" }}>
              {L.hero.h1a}<br /><span style={{ fontWeight: 600, color: "#c9a96e" }}>{L.hero.h1b}</span>
            </h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,.55)", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.8 }}>{L.hero.desc}</p>
            <button onClick={goPlan} style={{ padding: "17px 52px", borderRadius: 12, border: "none", fontSize: 16, fontWeight: 700, background: "linear-gradient(135deg,#c9a96e,#a8874a)", color: "#000", cursor: "pointer", fontFamily: "inherit", letterSpacing: .5, transition: "transform .3s" }}>{L.hero.cta}</button>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: .4 }}>
            <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{L.hero.scroll}</span>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #fff, transparent)" }} />
          </div>
        </section>

        {/* STATS */}
        <Reveal><section style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(3,1fr)", padding: "40px 28px" }}>
            {L.stats.map((s,i) => (
              <div key={i} style={{ textAlign: "center", borderInlineStart: i>0?"1px solid rgba(255,255,255,.06)":"none" }}>
                <div style={{ fontSize: 36, fontWeight: 300, color: "#c9a96e", fontFamily: "'Cormorant Garamond',serif", marginBottom: 4 }}>{s.v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.35)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section></Reveal>

        {/* DESTINATIONS with photos */}
        <section style={{ padding: "80px 0" }}>
          <div style={W}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a96e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>{L.dest.sub}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: 40, fontWeight: 400 }}>{L.dest.title}</h2>
            </div></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 14 }}>
              {DESTS.map((d,i) => (
                <Reveal key={d.en} delay={i*.04}>
                  <div className="imgcard" onClick={() => { setDest(d[lang]); goPlan(); }} style={{ height: 220 }}>
                    <img src={d.img} alt={d.en} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{d.flag} {d[lang]}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" style={{ padding: "80px 0", background: "rgba(255,255,255,.02)" }}>
          <div style={W}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a96e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>{L.how.sub}</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: 40, fontWeight: 400 }}>{L.how.title}</h2>
            </div></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
              {L.how.steps.map((s,i) => (
                <Reveal key={i} delay={i*.1}><div className="glow" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 20, padding: "36px 28px" }}>
                  <div style={{ fontSize: 48, fontWeight: 300, color: "rgba(201,169,110,.2)", fontFamily: "'Cormorant Garamond',serif", marginBottom: 16 }}>{s.n}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,.4)", lineHeight: 1.7 }}>{s.d}</div>
                </div></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Reveal><section style={{ position: "relative", margin: "0 28px 80px", borderRadius: 24, overflow: "hidden", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.65)" }} />
          <div style={{ position: "relative", textAlign: "center", padding: "60px 28px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: 38, fontWeight: 400, marginBottom: 14 }}>{L.cta.title}</h2>
            <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 32, fontSize: 16 }}>{L.cta.desc}</p>
            <button onClick={goPlan} style={{ padding: "16px 48px", borderRadius: 12, border: "2px solid rgba(201,169,110,.4)", fontSize: 16, fontWeight: 700, background: "rgba(201,169,110,.1)", color: "#c9a96e", cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>{L.hero.cta}</button>
          </div>
        </section></Reveal>
      </>}

      {/* ═══ PLANNER ═══ */}
      {page==="planner" && !plan && !loading && (
        <div style={{ ...W, paddingTop: 100, paddingBottom: 60 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a96e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>{L.planner.title}</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: 44, fontWeight: 400, marginBottom: 8, lineHeight: 1.15 }}>{L.hero.h1a}, <span style={{ color: "rgba(255,255,255,.25)" }}>{L.hero.h1b}</span></h1>
          <p style={{ color: "rgba(255,255,255,.35)", fontSize: 15, marginBottom: 44, maxWidth: 460 }}>{L.hero.desc}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{L.planner.dest}</div>
            <input value={dest} onChange={e=>setDest(e.target.value)} onKeyDown={e=>e.key==="Enter"&&generate()} placeholder={L.planner.ph}
              style={{ width: "100%", maxWidth: 480, padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", fontSize: 17, fontFamily: "inherit", color: "#fff", background: "rgba(255,255,255,.04)", direction: rtl?"rtl":"ltr", transition: "all .3s" }}
              onFocus={e=>{e.target.style.borderColor="rgba(201,169,110,.4)";e.target.style.background="rgba(255,255,255,.06)"}}
              onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,.1)";e.target.style.background="rgba(255,255,255,.04)"}} />
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.2)", marginBottom: 10 }}>{L.planner.pop}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {DESTS.map(d => (
                <button key={d.en} onClick={()=>setDest(d[lang])} style={{ padding: "8px 16px", borderRadius: 20, fontSize: 13, cursor: "pointer", border: dest===d[lang]?"1px solid #c9a96e":"1px solid rgba(255,255,255,.08)", background: dest===d[lang]?"rgba(201,169,110,.15)":"rgba(255,255,255,.03)", color: dest===d[lang]?"#c9a96e":"rgba(255,255,255,.5)", fontFamily: "inherit", transition: "all .2s" }}>{d.flag} {d[lang]}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>{L.planner.days}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={()=>setDays(Math.max(1,days-1))} style={{ width: 46, height: 46, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)", fontSize: 22, cursor: "pointer", color: "#fff", fontFamily: "inherit" }}>−</button>
              <span style={{ fontSize: 42, fontWeight: 300, minWidth: 55, textAlign: "center", fontFamily: "'Cormorant Garamond',serif" }}>{days}</span>
              <button onClick={()=>setDays(Math.min(10,days+1))} style={{ width: 46, height: 46, borderRadius: 10, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.03)", fontSize: 22, cursor: "pointer", color: "#fff", fontFamily: "inherit" }}>+</button>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,.3)" }}>{dt(days)}</span>
            </div>
          </div>

          <button onClick={generate} disabled={!dest.trim()} style={{ padding: "17px 56px", borderRadius: 12, border: "none", fontSize: 17, fontWeight: 700, background: dest.trim()?"linear-gradient(135deg,#c9a96e,#a8874a)":"rgba(255,255,255,.06)", color: dest.trim()?"#000":"rgba(255,255,255,.2)", cursor: dest.trim()?"pointer":"not-allowed", fontFamily: "inherit" }}>{L.planner.go}</button>

          <div style={{ marginTop: 16, fontSize: 12, color: "rgba(255,255,255,.2)" }}>💱 {L.currLabel} <span style={{ color: "#c9a96e", fontWeight: 600 }}>{cur.name} ({cur.sym})</span></div>

          {error && <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(220,38,38,.1)", border: "1px solid rgba(220,38,38,.2)", borderRadius: 12, color: "#ef4444", fontSize: 14 }}>{error}</div>}
        </div>
      )}

      {/* LOADING */}
      {page==="planner" && loading && (
        <div style={{ ...W, textAlign: "center", padding: "160px 28px" }}>
          <div style={{ width: 40, height: 40, border: "2px solid rgba(255,255,255,.1)", borderTopColor: "#c9a96e", borderRadius: "50%", animation: "spin .7s linear infinite", margin: "0 auto 28px" }} />
          <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 10, fontFamily: "'Cormorant Garamond',serif" }}>{L.planner.loading} {dest}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,.3)", animation: "pulse 2s infinite" }}>{L.planner.searching}</div>
        </div>
      )}

      {/* ═══ RESULTS ═══ */}
      {page==="planner" && plan && !loading && (
        <div style={{ ...W, paddingTop: 90 }}>
          <Reveal><div style={{ padding: "0 0 32px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#c9a96e", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>{L.plan.badge}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond','Tajawal',serif", fontSize: 44, fontWeight: 400, marginBottom: 6 }}>{plan.flag} {plan.destination}</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.35)" }}>{dt(sched.length)} • {plan.country}</p>
          </div></Reveal>

          {/* Quick Info */}
          <Reveal delay={.1}><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", padding: "20px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            {[{l:L.plan.currency,v:plan.currency},{l:L.plan.weather,v:plan.weather},{l:L.plan.best,v:plan.bestTime},{l:L.plan.language,v:plan.language},{l:L.plan.visa,v:plan.visa},{l:L.plan.tz,v:plan.timezone}].map((x,i)=>(
              <div key={i} style={{ padding: "14px 6px", borderInlineStart: i%3?"1px solid rgba(255,255,255,.04)":"none" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>{x.l}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{x.v}</div>
              </div>
            ))}
          </div></Reveal>

          {/* Hotels */}
          <Reveal delay={.15}><div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2 }}>{L.plan.hotels}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["budget","mid","luxury"].map(ti=>(
                  <button key={ti} onClick={()=>setTier(ti)} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: tier===ti?"1px solid #c9a96e":"1px solid rgba(255,255,255,.08)", background: tier===ti?"rgba(201,169,110,.12)":"transparent", color: tier===ti?"#c9a96e":"rgba(255,255,255,.4)", fontFamily: "inherit" }}>{L.tiers[ti]}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {hotels.map((h,i)=>(
                <div key={i} className="glow" style={{ border: "1px solid rgba(255,255,255,.06)", borderRadius: 14, padding: 20, background: "rgba(255,255,255,.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{h.name}</div>
                    {h.rating && <div style={{ fontSize: 10, fontWeight: 700, color: "#c9a96e", background: "rgba(201,169,110,.1)", padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>{h.rating}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginBottom: 14 }}>{h.area}{h.desc?` — ${h.desc}`:""}</div>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#c9a96e" }}>{P(h.pricePerNight)}</span><span style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}> / {L.plan.night}</span>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.15)", marginTop: 3 }}>{P(h.pricePerNight*days)} {L.plan.total}</div>
                </div>
              ))}
            </div>
          </div></Reveal>

          {/* Top Attractions */}
          {plan.topAttractions?.length>0 && <Reveal delay={.1}><div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.attractions}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
              {plan.topAttractions.map((a,i)=>(
                <div key={i} className="glow" style={{ border: "1px solid rgba(255,255,255,.06)", borderRadius: 14, padding: 18, background: "rgba(255,255,255,.02)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#c9a96e", fontWeight: 600 }}>{a.cost>0?P(a.cost):L.plan.free}</span>
                    {a.duration && <span style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>⏱ {a.duration}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div></Reveal>}

          {/* Schedule */}
          <div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 22 }}>{L.plan.sched}</div>
            {sched.map((d,idx)=>(
              <Reveal key={idx} delay={idx*.05}><div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: idx<sched.length-1?"1px solid rgba(255,255,255,.04)":"none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#c9a96e,#a8874a)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{d.day||idx+1}</div>
                  <div><div style={{ fontSize: 17, fontWeight: 700 }}>{d.title}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.2)" }}>{idx===0?L.plan.arrive:idx===sched.length-1?L.plan.last:`${L.plan.dayN} ${idx+1}`}</div></div>
                </div>
                <div style={{ display: "grid", gap: 1, background: "rgba(255,255,255,.03)", borderRadius: 14, overflow: "hidden" }}>
                  {[{i:"☀️",l:L.plan.am,d:d.morning},{i:"☁️",l:L.plan.pm,d:d.afternoon},{i:"🌙",l:L.plan.eve,d:d.evening}].map((p,pi)=>(
                    <div key={pi} style={{ display: "flex", gap: 14, padding: "14px 18px", background: "rgba(10,10,10,.8)", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 18, marginTop: 1 }}>{p.i}</span>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: "rgba(255,255,255,.2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{p.l}</div><div style={{ fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>{p.d?.activity||p.d}</div></div>
                      <div style={{ fontSize: 12, color: p.d?.cost>0?"#c9a96e":"rgba(255,255,255,.1)", fontWeight: 600, marginTop: 14 }}>{p.d?.cost>0?`~${P(p.d.cost)}`:L.plan.free}</div>
                    </div>
                  ))}
                </div>
                {d.restaurant && <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, fontSize: 13, color: "rgba(255,255,255,.5)" }}>🍽️ <span style={{ fontWeight: 600, color: "#fff" }}>{d.restaurant.name}</span> <span style={{ color: "rgba(255,255,255,.1)" }}>•</span> {d.restaurant.cuisine} <span style={{ color: "#c9a96e", fontWeight: 600 }}>{d.restaurant.priceLevel}</span> {d.restaurant.rating && <><span style={{ color: "rgba(255,255,255,.1)" }}>•</span> <span style={{ color: "#f59e0b" }}>★ {d.restaurant.rating}</span></>}</div>}
              </div></Reveal>
            ))}
          </div>

          {/* Top Restaurants */}
          {plan.topRestaurants?.length>0 && <Reveal delay={.1}><div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.restaurants}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
              {plan.topRestaurants.map((r,i)=>(
                <div key={i} className="glow" style={{ border: "1px solid rgba(255,255,255,.06)", borderRadius: 14, padding: 18, background: "rgba(255,255,255,.02)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>🍽️ {r.name}</div>
                    {r.rating && <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,.08)", padding: "2px 7px", borderRadius: 5, flexShrink: 0 }}>★ {r.rating}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>{r.cuisine} <span style={{ color: "#c9a96e" }}>{r.priceLevel}</span></div>
                  {r.area && <div style={{ fontSize: 11, color: "rgba(255,255,255,.15)", marginTop: 4 }}>📍 {r.area}</div>}
                  {r.specialty && <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)", marginTop: 6, fontStyle: "italic" }}>✨ {r.specialty}</div>}
                </div>
              ))}
            </div>
          </div></Reveal>}

          {/* Budget */}
          <Reveal delay={.1}><div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.budget} — {L.tiers[tier]}</div>
            <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,.06)", overflow: "hidden" }}>
              {[{l:L.plan.hotelC,v:bd.hotel||0,d:`${days} ${L.plan.nights}`},{l:L.plan.act,v:bd.activities||0,d:`${sched.length} ${L.plan.daysL}`},{l:L.plan.food,v:bd.food||0,d:`${days} ${L.plan.daysL}`},{l:L.plan.trans,v:bd.transport||0,d:`${days} ${L.plan.daysL}`}].map((r,i)=>(
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,.04)", background: "rgba(255,255,255,.02)" }}>
                  <div><div style={{ fontSize: 14, fontWeight: 500 }}>{r.l}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,.15)" }}>{r.d}</div></div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#c9a96e" }}>{P(r.v)}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", background: "linear-gradient(135deg,rgba(201,169,110,.12),rgba(201,169,110,.04))" }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{L.plan.grand}</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#c9a96e", fontFamily: "'Cormorant Garamond',serif" }}>{P(tot)}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.15)", marginTop: 10 }}>{L.plan.note}</div>
          </div></Reveal>

          {/* Tips */}
          <Reveal delay={.1}><div style={{ padding: "32px 0", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,.2)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.tips}</div>
            {(plan.tips||[]).map((tip,i)=>(
              <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i<(plan.tips||[]).length-1?"1px solid rgba(255,255,255,.04)":"none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(201,169,110,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#c9a96e", flexShrink: 0 }}>{i+1}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,.5)", lineHeight: 1.75 }}>{tip}</div>
              </div>
            ))}
          </div></Reveal>

          <div style={{ textAlign: "center", padding: "36px 0" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.15)", marginBottom: 18 }}>{L.plan.src}</div>
            <button onClick={reset} style={{ padding: "14px 44px", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "transparent", fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,.5)", cursor: "pointer", fontFamily: "inherit" }}>{L.plan.newTrip}</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.06)", padding: "28px 0" }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.15)", letterSpacing: 1 }}>TRIPWALL</span>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.1)" }}>© 2026 — {L.footer}</div>
        </div>
      </footer>
    </div>
  );
}
