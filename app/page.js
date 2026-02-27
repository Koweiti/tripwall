"use client";
import { useState, useEffect, useRef } from "react";
import translations from "../lib/translations";
import popularDests from "../lib/destinations";

/* ── Animated Globe ── */
function Globe() {
  return (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="grd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A7F62" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2A7F62" stopOpacity="0.03" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#grd)" stroke="#2A7F62" strokeOpacity="0.12" strokeWidth="1" />
      <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="#2A7F62" strokeOpacity="0.08" strokeWidth="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="20s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="100" cy="100" rx="55" ry="80" fill="none" stroke="#2A7F62" strokeOpacity="0.08" strokeWidth="0.8">
        <animateTransform attributeName="transform" type="rotate" values="0 100 100;-360 100 100" dur="25s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="#2A7F62" strokeOpacity="0.06" strokeWidth="0.8" />
      <line x1="20" y1="100" x2="180" y2="100" stroke="#2A7F62" strokeOpacity="0.06" strokeWidth="0.5" />
      {[60, 80, 120, 140].map(y => (
        <line key={y} x1={100 - Math.sqrt(Math.max(0, 6400 - (y-100)**2))} y1={y} x2={100 + Math.sqrt(Math.max(0, 6400 - (y-100)**2))} y2={y} stroke="#2A7F62" strokeOpacity="0.04" strokeWidth="0.5" />
      ))}
      <circle r="3" fill="#2A7F62" fillOpacity="0.5">
        <animateMotion dur="8s" repeatCount="indefinite" path="M20,100 Q100,30 180,100 Q100,170 20,100" />
      </circle>
      <circle r="2" fill="#2A7F62" fillOpacity="0.3">
        <animateMotion dur="12s" repeatCount="indefinite" path="M100,20 Q170,100 100,180 Q30,100 100,20" />
      </circle>
    </svg>
  );
}

/* ── Scroll Reveal ── */
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      ...style, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>{children}</div>
  );
}

const DESTS = popularDests;

const T = translations;



export default function TripWall() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("landing");
  const [dest, setDest] = useState("");
  const [days, setDays] = useState(4);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [tier, setTier] = useState("mid");
  const [heroIn, setHeroIn] = useState(false);
  const [userCurrency, setUserCurrency] = useState({ code: "USD", symbol: "$", name: "دولار أمريكي" });
  const L = T[lang];
  const rtl = lang === "ar";

  useEffect(() => { setTimeout(() => setHeroIn(true), 100); }, []);

  // Auto-detect user's country and currency
  useEffect(() => {
    const CURRENCIES = {
      KW: { code: "KWD", symbol: "د.ك", nameAr: "دينار كويتي", nameEn: "Kuwaiti Dinar" },
      AE: { code: "AED", symbol: "د.إ", nameAr: "درهم إماراتي", nameEn: "UAE Dirham" },
      SA: { code: "SAR", symbol: "ر.س", nameAr: "ريال سعودي", nameEn: "Saudi Riyal" },
      QA: { code: "QAR", symbol: "ر.ق", nameAr: "ريال قطري", nameEn: "Qatari Riyal" },
      BH: { code: "BHD", symbol: "د.ب", nameAr: "دينار بحريني", nameEn: "Bahraini Dinar" },
      OM: { code: "OMR", symbol: "ر.ع", nameAr: "ريال عماني", nameEn: "Omani Rial" },
      EG: { code: "EGP", symbol: "ج.م", nameAr: "جنيه مصري", nameEn: "Egyptian Pound" },
      JO: { code: "JOD", symbol: "د.أ", nameAr: "دينار أردني", nameEn: "Jordanian Dinar" },
      LB: { code: "LBP", symbol: "ل.ل", nameAr: "ليرة لبنانية", nameEn: "Lebanese Pound" },
      IQ: { code: "IQD", symbol: "د.ع", nameAr: "دينار عراقي", nameEn: "Iraqi Dinar" },
      MA: { code: "MAD", symbol: "د.م", nameAr: "درهم مغربي", nameEn: "Moroccan Dirham" },
      TN: { code: "TND", symbol: "د.ت", nameAr: "دينار تونسي", nameEn: "Tunisian Dinar" },
      TR: { code: "TRY", symbol: "₺", nameAr: "ليرة تركية", nameEn: "Turkish Lira" },
      GB: { code: "GBP", symbol: "£", nameAr: "جنيه إسترليني", nameEn: "British Pound" },
      EU: { code: "EUR", symbol: "€", nameAr: "يورو", nameEn: "Euro" },
      FR: { code: "EUR", symbol: "€", nameAr: "يورو", nameEn: "Euro" },
      DE: { code: "EUR", symbol: "€", nameAr: "يورو", nameEn: "Euro" },
      IT: { code: "EUR", symbol: "€", nameAr: "يورو", nameEn: "Euro" },
      ES: { code: "EUR", symbol: "€", nameAr: "يورو", nameEn: "Euro" },
      US: { code: "USD", symbol: "$", nameAr: "دولار أمريكي", nameEn: "US Dollar" },
      IN: { code: "INR", symbol: "₹", nameAr: "روبية هندية", nameEn: "Indian Rupee" },
      PK: { code: "PKR", symbol: "₨", nameAr: "روبية باكستانية", nameEn: "Pakistani Rupee" },
      MY: { code: "MYR", symbol: "RM", nameAr: "رينغيت ماليزي", nameEn: "Malaysian Ringgit" },
      ID: { code: "IDR", symbol: "Rp", nameAr: "روبية إندونيسية", nameEn: "Indonesian Rupiah" },
      JP: { code: "JPY", symbol: "¥", nameAr: "ين ياباني", nameEn: "Japanese Yen" },
    };
    fetch("https://ipapi.co/json/")
      .then(r => r.json())
      .then(data => {
        const cc = data?.country_code;
        if (cc && CURRENCIES[cc]) {
          const c = CURRENCIES[cc];
          setUserCurrency({ code: c.code, symbol: c.symbol, name: lang === "ar" ? c.nameAr : c.nameEn });
        }
      })
      .catch(() => {});
  }, [lang]);

  const goPlan = () => { setPage("planner"); window.scrollTo({ top: 0 }); };
  const goHome = () => { setPlan(null); setDest(""); setPage("landing"); setHeroIn(false); setTimeout(() => setHeroIn(true), 100); };

  const generate = async () => {
    if (!dest.trim()) return;
    setLoading(true); setPlan(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest.trim(), days, lang, currency: userCurrency.code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setPlan(data.plan);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const reset = () => { setPlan(null); setDest(""); setDays(4); setTier("mid"); };

  const hotels = plan?.hotels?.[tier] || [];
  const sched = plan?.schedule || [];
  const bd = plan?.budgetEstimate?.[tier] || {};
  const tot = (bd.hotel||0)+(bd.food||0)+(bd.activities||0)+(bd.transport||0);
  const dtxt = n => lang==="ar"?(n===1?"يوم واحد":n===2?"يومان":`${n} أيام`):`${n} ${n===1?"day":"days"}`;
  const W = { maxWidth: 860, margin: "0 auto", padding: "0 32px" };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", color: "#1a1a1a", direction: rtl?"rtl":"ltr", fontFamily: "'Tajawal','DM Sans',-apple-system,sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=DM+Sans:wght@300;400;500;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        input:focus,button:focus{outline:none}
        ::selection{background:#2A7F62;color:#fff}
        .glass{background:rgba(250,250,248,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
        .clift{transition:transform .35s cubic-bezier(.2,0,0,1),box-shadow .35s ease}
        .clift:hover{transform:translateY(-6px);box-shadow:0 16px 48px rgba(42,127,98,.08)}
        .pill{transition:all .25s cubic-bezier(.2,0,0,1)}
        .pill:hover{transform:scale(1.04);box-shadow:0 4px 16px rgba(0,0,0,.06)}
        .sline{width:48px;height:3px;background:#2A7F62;border-radius:2px}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#ddd;border-radius:3px}
      `}</style>

      {/* NAV */}
      <nav className="glass" style={{ borderBottom: "1px solid rgba(0,0,0,.06)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <div onClick={goHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#2A7F62,#1a5c45)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontWeight: 800 }}>T</div>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.5px" }}>TripWall</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 14 }}>
            <span onClick={goPlan} style={{ color: "#666", cursor: "pointer", fontWeight: 500 }}>{L.nav.plan}</span>
            {page==="landing" && <span onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} style={{ color: "#666", cursor: "pointer", fontWeight: 500 }}>{L.nav.how}</span>}
            <button onClick={() => setLang(lang==="ar"?"en":"ar")} style={{ padding: "7px 16px", borderRadius: 8, border: "1.5px solid #E8E6E2", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#555", fontFamily: "inherit" }}>{L.nav.lang}</button>
          </div>
        </div>
      </nav>

      {/* ═══ LANDING ═══ */}
      {page==="landing" && <>
        {/* HERO */}
        <section style={{ position: "relative", overflow: "hidden", minHeight: "88vh", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 20%,rgba(42,127,98,.04) 0%,transparent 60%),radial-gradient(ellipse at 20% 80%,rgba(42,127,98,.03) 0%,transparent 50%)" }} />
          <div style={{ position: "absolute", top: 40, [rtl?"left":"right"]: 40, width: 120, height: 120, opacity: .12, backgroundImage: "radial-gradient(circle,#2A7F62 1px,transparent 1px)", backgroundSize: "16px 16px" }} />

          <div style={{ ...W, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", width: "100%" }}>
            <div style={{ order: rtl?2:1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 24, background: "linear-gradient(135deg,rgba(42,127,98,.08),rgba(42,127,98,.04))", border: "1px solid rgba(42,127,98,.12)", marginBottom: 24, opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(16px)", transition: "all .6s ease .1s" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2A7F62", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2A7F62", letterSpacing: 1.5, textTransform: "uppercase" }}>{L.hero.badge}</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: "clamp(40px,5.5vw,64px)", fontWeight: 600, lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1px", opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(24px)", transition: "all .7s ease .2s" }}>
                {L.hero.h1a}<br /><span style={{ background: "linear-gradient(135deg,#2A7F62,#1a5c45)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{L.hero.h1b}</span>
              </h1>
              <p style={{ fontSize: 17, color: "#777", maxWidth: 420, lineHeight: 1.85, marginBottom: 36, opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(20px)", transition: "all .7s ease .35s" }}>{L.hero.desc}</p>
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", opacity: heroIn?1:0, transform: heroIn?"translateY(0)":"translateY(16px)", transition: "all .7s ease .5s" }}>
                <button onClick={goPlan} style={{ padding: "16px 40px", borderRadius: 12, border: "none", fontSize: 16, fontWeight: 700, background: "#1a1a1a", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>{L.hero.cta}</button>
                <span onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} style={{ fontSize: 14, color: "#999", cursor: "pointer", fontWeight: 500 }}>{L.hero.scroll} ↓</span>
              </div>
            </div>
            <div style={{ order: rtl?1:2, position: "relative", display: "flex", justifyContent: "center", opacity: heroIn?1:0, transform: heroIn?"scale(1)":"scale(0.85)", transition: "all .9s cubic-bezier(.2,0,0,1) .3s" }}>
              <div style={{ width: "min(380px,90%)", aspectRatio: "1", animation: "float 6s ease-in-out infinite" }}><Globe /></div>
              {[{ emoji: "🗼", name: rtl?"باريس":"Paris", top: "8%", right: "5%", d: "0s" },
                { emoji: "⛩️", name: rtl?"طوكيو":"Tokyo", bottom: "15%", left: "0%", d: "1s" },
                { emoji: "🏙️", name: rtl?"دبي":"Dubai", top: "55%", right: "-5%", d: "2s" }
              ].map((c, i) => (
                <div key={i} style={{ position: "absolute", ...(c.top?{top:c.top}:{}), ...(c.bottom?{bottom:c.bottom}:{}), ...(c.left?{left:c.left}:{}), ...(c.right?{right:c.right}:{}), background: "#fff", borderRadius: 12, padding: "10px 16px", boxShadow: "0 4px 20px rgba(0,0,0,.06)", display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, animation: `float 4s ease-in-out ${c.d} infinite`, border: "1px solid rgba(0,0,0,.04)" }}>
                  <span style={{ fontSize: 20 }}>{c.emoji}</span> {c.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <Reveal>
          <section style={{ borderTop: "1px solid #EEECE8", borderBottom: "1px solid #EEECE8", background: "#fff" }}>
            <div style={{ ...W, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
              {L.stats.map((s,i) => (
                <div key={i} style={{ padding: "36px 0", textAlign: "center", borderInlineStart: i>0?"1px solid #EEECE8":"none" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, background: "linear-gradient(135deg,#2A7F62,#1a5c45)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>{s.val}</div>
                  <div style={{ fontSize: 14, color: "#999" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* HOW */}
        <section id="how" style={{ padding: "80px 0" }}>
          <div style={W}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="sline" style={{ margin: "0 auto 16px" }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>{L.how.sub}</div>
              <h2 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: 40, fontWeight: 600 }}>{L.how.title}</h2>
            </div></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
              {L.how.steps.map((s,i) => (
                <Reveal key={i} delay={i*.12}><div className="clift" style={{ background: "#fff", border: "1px solid #EEECE8", borderRadius: 20, padding: "36px 28px", position: "relative", overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "absolute", top: -8, [rtl?"right":"left"]: -4, fontSize: 96, fontWeight: 800, color: "rgba(42,127,98,.04)", fontFamily: "'DM Sans'" }}>{s.n}</div>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(42,127,98,.1),rgba(42,127,98,.04))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <span style={{ fontSize: 20, fontWeight: 800, color: "#2A7F62" }}>{s.n}</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{s.t}</div>
                    <div style={{ fontSize: 14, color: "#888", lineHeight: 1.75 }}>{s.d}</div>
                  </div>
                </div></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: "0 0 80px" }}>
          <div style={W}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="sline" style={{ margin: "0 auto 16px" }} />
              <h2 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: 40, fontWeight: 600 }}>{L.features.title}</h2>
            </div></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16 }}>
              {L.features.items.map((f,i) => (
                <Reveal key={i} delay={i*.08}><div className="clift" style={{ background: "#fff", border: "1px solid #EEECE8", borderRadius: 18, padding: "28px 24px", height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#FAFAF8", border: "1px solid #EEECE8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{f.icon}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>{f.d}</div>
                </div></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <section style={{ margin: "0 32px 80px", borderRadius: 24, padding: "64px 40px", background: "linear-gradient(135deg,#111,#1a2a22)", color: "#fff", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 50%,rgba(42,127,98,.15) 0%,transparent 50%)" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: 36, fontWeight: 600, marginBottom: 14 }}>{L.cta.title}</h2>
              <p style={{ color: "rgba(255,255,255,.5)", marginBottom: 32, fontSize: 16, maxWidth: 400, margin: "0 auto 32px" }}>{L.cta.desc}</p>
              <button onClick={goPlan} style={{ padding: "16px 48px", borderRadius: 12, border: "2px solid rgba(255,255,255,.2)", fontSize: 16, fontWeight: 700, background: "rgba(255,255,255,.08)", color: "#fff", cursor: "pointer", fontFamily: "inherit", backdropFilter: "blur(8px)" }}>{L.hero.cta}</button>
            </div>
          </section>
        </Reveal>
      </>}

      {/* ═══ PLANNER ═══ */}
      {page==="planner" && !plan && !loading && (
        <div style={{ ...W, paddingTop: 56, paddingBottom: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}><div className="sline" /><span style={{ fontSize: 12, fontWeight: 700, color: "#2A7F62", textTransform: "uppercase", letterSpacing: 2 }}>{L.planner.title}</span></div>
          <h1 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: 42, fontWeight: 600, marginBottom: 8, lineHeight: 1.15 }}>{L.hero.h1a}, <span style={{ color: "#ccc" }}>{L.hero.h1b}</span></h1>
          <p style={{ color: "#999", fontSize: 15, marginBottom: 44, maxWidth: 460 }}>{L.hero.desc}</p>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{L.planner.dest}</div>
            <input value={dest} onChange={e => setDest(e.target.value)} onKeyDown={e => e.key==="Enter" && generate()} placeholder={L.planner.ph}
              style={{ width: "100%", maxWidth: 480, padding: "16px 20px", borderRadius: 14, border: "2px solid #EEECE8", fontSize: 17, fontFamily: "inherit", color: "#111", background: "#fff", direction: rtl?"rtl":"ltr", boxShadow: "0 2px 12px rgba(0,0,0,.02)", transition: "all .25s" }}
              onFocus={e => { e.target.style.borderColor="#2A7F62"; e.target.style.boxShadow="0 0 0 4px rgba(42,127,98,.08)"; }}
              onBlur={e => { e.target.style.borderColor="#EEECE8"; e.target.style.boxShadow="0 2px 12px rgba(0,0,0,.02)"; }} />
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, color: "#ccc", marginBottom: 10 }}>{L.planner.pop}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {DESTS.map(d => (
                <button key={d.en} className="pill" onClick={() => setDest(d[lang])} style={{ padding: "8px 18px", borderRadius: 24, fontSize: 13, cursor: "pointer", border: dest===d[lang]?"1.5px solid #1a1a1a":"1px solid #E8E6E2", background: dest===d[lang]?"#1a1a1a":"#fff", color: dest===d[lang]?"#fff":"#666", fontFamily: "inherit" }}>{d.flag} {d[lang]}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>{L.planner.days}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setDays(Math.max(1,days-1))} style={{ width: 46, height: 46, borderRadius: 12, border: "1.5px solid #E8E6E2", background: "#fff", fontSize: 22, cursor: "pointer", color: "#444", fontFamily: "inherit" }}>−</button>
              <span style={{ fontSize: 42, fontWeight: 800, minWidth: 55, textAlign: "center" }}>{days}</span>
              <button onClick={() => setDays(Math.min(10,days+1))} style={{ width: 46, height: 46, borderRadius: 12, border: "1.5px solid #E8E6E2", background: "#fff", fontSize: 22, cursor: "pointer", color: "#444", fontFamily: "inherit" }}>+</button>
              <span style={{ fontSize: 15, color: "#aaa" }}>{dtxt(days)}</span>
            </div>
          </div>
          <button onClick={generate} disabled={!dest.trim()} style={{ padding: "17px 56px", borderRadius: 14, border: "none", fontSize: 17, fontWeight: 700, background: dest.trim()?"#1a1a1a":"#eee", color: dest.trim()?"#fff":"#bbb", cursor: dest.trim()?"pointer":"not-allowed", fontFamily: "inherit" }}>{L.planner.go}</button>

          {/* Currency indicator */}
          <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#E8F5EF", borderRadius: 8, fontSize: 12, color: "#2A7F62", fontWeight: 500 }}>
            💱 {lang === "ar" ? "الأسعار ستظهر بـ" : "Prices shown in"} <span style={{ fontWeight: 700 }}>{userCurrency.name} ({userCurrency.symbol})</span>
          </div>
        </div>
      )}

      {/* LOADING */}
      {page==="planner" && loading && (
        <div style={{ ...W, textAlign: "center", padding: "120px 32px" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #eee", borderTopColor: "#2A7F62", borderRadius: "50%", animation: "spin .7s linear infinite", margin: "0 auto 28px" }} />
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>{L.planner.loading} {dest}</div>
          <div style={{ fontSize: 14, color: "#999", animation: "pulse 2s infinite" }}>{L.planner.searching}</div>
        </div>
      )}

      {/* RESULTS */}
      {page==="planner" && plan && !loading && (
        <div style={W}>
          <Reveal><div style={{ padding: "48px 0 36px", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}><div className="sline" /><span style={{ fontSize: 12, fontWeight: 600, color: "#2A7F62", textTransform: "uppercase", letterSpacing: 2 }}>{L.plan.badge}</span></div>
            <h2 style={{ fontFamily: "'Playfair Display','Tajawal',serif", fontSize: 42, fontWeight: 600, marginBottom: 6 }}>{plan.flag} {plan.destination}</h2>
            <p style={{ fontSize: 16, color: "#888" }}>{dtxt(sched.length)} • {plan.country}</p>
          </div></Reveal>

          <Reveal delay={.1}><div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid #EEECE8" }}>
            {[{l:L.plan.currency,v:plan.currency},{l:L.plan.weather,v:plan.weather},{l:L.plan.best,v:plan.bestTime},{l:L.plan.language,v:plan.language},{l:L.plan.visa,v:plan.visa},{l:L.plan.tz,v:plan.timezone}].map((x,i) => (
              <div key={i} style={{ padding: "20px 6px", borderInlineStart: i%3?"1px solid #f0f0f0":"none" }}>
                <div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{x.l}</div>
                <div style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{x.v}</div>
              </div>
            ))}
          </div></Reveal>

          {/* Hotels */}
          <Reveal delay={.15}><div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2 }}>{L.plan.hotels}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["budget","mid","luxury"].map(ti => (
                  <button key={ti} onClick={() => setTier(ti)} style={{ padding: "6px 16px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: tier===ti?"1.5px solid #1a1a1a":"1px solid #E8E6E2", background: tier===ti?"#1a1a1a":"#fff", color: tier===ti?"#fff":"#888", fontFamily: "inherit" }}>{L.tiers[ti]}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
              {hotels.map((h,i) => (
                <div key={i} className="clift" style={{ border: "1px solid #EEECE8", borderRadius: 16, padding: 22, background: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{h.name}</div>
                    {h.rating && <div style={{ fontSize: 11, fontWeight: 700, color: "#2A7F62", background: "#E8F5EF", padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>{h.rating}</div>}
                  </div>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 14 }}>{h.area}{h.desc?` — ${h.desc}`:""}</div>
                  <span style={{ fontSize: 24, fontWeight: 800 }}>{userCurrency.symbol}{h.pricePerNight}</span><span style={{ fontSize: 12, color: "#bbb" }}> / {L.plan.night}</span>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 3 }}>{userCurrency.symbol}{(h.pricePerNight*days).toLocaleString()} {L.plan.total}</div>
                </div>
              ))}
            </div>
          </div></Reveal>

          {/* Schedule */}
          <div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 22 }}>{L.plan.sched}</div>
            {sched.map((d,idx) => (
              <Reveal key={idx} delay={idx*.06}>
                <div style={{ marginBottom: 26, paddingBottom: 26, borderBottom: idx<sched.length-1?"1px solid #f5f5f3":"none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1a1a1a,#333)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, flexShrink: 0 }}>{d.day}</div>
                    <div><div style={{ fontSize: 17, fontWeight: 700 }}>{d.title}</div><div style={{ fontSize: 12, color: "#bbb" }}>{idx===0?L.plan.arrive:idx===sched.length-1?L.plan.last:`${L.plan.dayN} ${idx+1}`}</div></div>
                  </div>
                  <div style={{ display: "grid", gap: 1, background: "#f0efed", borderRadius: 14, overflow: "hidden" }}>
                    {[{i:"☀️",l:L.plan.am,d:d.morning},{i:"☁️",l:L.plan.pm,d:d.afternoon},{i:"🌙",l:L.plan.eve,d:d.evening}].map((p,pi) => (
                      <div key={pi} style={{ display: "flex", gap: 14, padding: "15px 18px", background: "#fff", alignItems: "flex-start" }}>
                        <span style={{ fontSize: 18, marginTop: 1 }}>{p.i}</span>
                        <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{p.l}</div><div style={{ fontSize: 14, color: "#222", lineHeight: 1.65 }}>{p.d?.activity||p.d}</div></div>
                        <div style={{ fontSize: 12, color: p.d?.cost>0?"#2A7F62":"#ddd", fontWeight: 600, marginTop: 16 }}>{p.d?.cost>0?`~${userCurrency.symbol}${p.d.cost}`:L.plan.free}</div>
                      </div>
                    ))}
                  </div>
                  {d.restaurant && <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "#fff", border: "1px solid #EEECE8", borderRadius: 10, fontSize: 13, color: "#666" }}>🍽️ <span style={{ fontWeight: 600 }}>{d.restaurant.name}</span> <span style={{ color: "#ddd" }}>•</span> <span style={{ color: "#999" }}>{d.restaurant.cuisine}</span> <span style={{ color: "#2A7F62", fontWeight: 600 }}>{d.restaurant.priceLevel}</span> {d.restaurant.rating && <><span style={{ color: "#ddd" }}>•</span> <span style={{ color: "#f59e0b", fontWeight: 600 }}>★ {d.restaurant.rating}</span></>}</div>}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Top Attractions */}
          {plan.topAttractions && plan.topAttractions.length > 0 && (
            <Reveal delay={.1}><div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{lang==="ar"?"أفضل المعالم السياحية":"Top Attractions"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
                {plan.topAttractions.map((a,i) => (
                  <div key={i} className="clift" style={{ border: "1px solid #EEECE8", borderRadius: 14, padding: 18, background: "#fff" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6, marginBottom: 10 }}>{a.desc}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#2A7F62", fontWeight: 600 }}>{a.cost > 0 ? `${userCurrency.symbol}${a.cost}` : (lang==="ar"?"مجاني":"Free")}</span>
                      {a.duration && <span style={{ fontSize: 11, color: "#bbb" }}>⏱ {a.duration}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div></Reveal>
          )}

          {/* Top Restaurants */}
          {plan.topRestaurants && plan.topRestaurants.length > 0 && (
            <Reveal delay={.1}><div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{lang==="ar"?"أفضل المطاعم":"Top Restaurants"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
                {plan.topRestaurants.map((r,i) => (
                  <div key={i} className="clift" style={{ border: "1px solid #EEECE8", borderRadius: 14, padding: 18, background: "#fff" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontSize: 15, fontWeight: 700 }}>🍽️ {r.name}</div>
                      {r.rating && <div style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", background: "#fffbeb", padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>★ {r.rating}</div>}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{r.cuisine} <span style={{ color: "#2A7F62", fontWeight: 600 }}>{r.priceLevel}</span></div>
                    {r.area && <div style={{ fontSize: 11, color: "#bbb", marginBottom: 6 }}>📍 {r.area}</div>}
                    {r.specialty && <div style={{ fontSize: 12, color: "#666", fontStyle: "italic" }}>✨ {r.specialty}</div>}
                  </div>
                ))}
              </div>
            </div></Reveal>
          )}

          {/* Budget */}
          <Reveal delay={.1}><div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.budget} — {L.tiers[tier]}</div>
            <div style={{ borderRadius: 16, border: "1px solid #EEECE8", overflow: "hidden" }}>
              {[{l:L.plan.hotelC,v:bd.hotel||0,d:`${days} ${L.plan.nights}`},{l:L.plan.act,v:bd.activities||0,d:`${sched.length} ${L.plan.daysL}`},{l:L.plan.food,v:bd.food||0,d:`${days} ${L.plan.daysL}`},{l:L.plan.trans,v:bd.transport||0,d:`${days} ${L.plan.daysL}`}].map((r,i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 22px", borderBottom: "1px solid #f5f5f3", background: "#fff" }}>
                  <div><div style={{ fontSize: 14, fontWeight: 500 }}>{r.l}</div><div style={{ fontSize: 11, color: "#bbb" }}>{r.d}</div></div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{userCurrency.symbol}{r.v.toLocaleString()}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 22px", background: "linear-gradient(135deg,#111,#1a2a22)", color: "#fff" }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{L.plan.grand}</div>
                <div style={{ fontSize: 30, fontWeight: 800 }}>{userCurrency.symbol}{tot.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#bbb", marginTop: 12 }}>{L.plan.note}</div>
          </div></Reveal>

          {/* Tips */}
          <Reveal delay={.1}><div style={{ padding: "36px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 18 }}>{L.plan.tips}</div>
            {plan.tips.map((tip,i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "13px 0", borderBottom: i<plan.tips.length-1?"1px solid #f5f5f3":"none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,rgba(42,127,98,.08),rgba(42,127,98,.03))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#2A7F62", flexShrink: 0 }}>{i+1}</div>
                <div style={{ fontSize: 14, color: "#444", lineHeight: 1.75 }}>{tip}</div>
              </div>
            ))}
          </div></Reveal>

          <div style={{ textAlign: "center", padding: "36px 0" }}>
            <div style={{ fontSize: 12, color: "#ccc", marginBottom: 18 }}>{L.plan.src}</div>
            <button onClick={reset} style={{ padding: "14px 44px", borderRadius: 12, border: "1.5px solid #ddd", background: "#fff", fontSize: 15, fontWeight: 600, color: "#666", cursor: "pointer", fontFamily: "inherit" }}>{L.plan.newTrip}</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #EEECE8", padding: "28px 0", background: "#fff" }}>
        <div style={{ ...W, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg,#2A7F62,#1a5c45)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 800 }}>T</div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#bbb" }}>TripWall</span>
          </div>
          <div style={{ fontSize: 11, color: "#ccc" }}>© 2026 — {L.footer}</div>
        </div>
      </footer>
    </div>
  );
}
