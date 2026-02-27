"use client";
import { useState, useRef } from "react";
import translations from "../lib/translations";
import popularDests from "../lib/destinations";

export default function Home() {
  const [lang, setLang] = useState("ar");
  const [page, setPage] = useState("landing");
  const [dest, setDest] = useState("");
  const [days, setDays] = useState(4);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [tier, setTier] = useState("mid");
  const L = translations[lang];
  const isRTL = lang === "ar";

  const scrollToPlanner = () => {
    setPage("planner");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generate = async () => {
    if (!dest.trim()) return;
    setLoading(true);
    setError("");
    setPlan(null);
    setProgress(L.planner.searching);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: dest.trim(), days, lang }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setPlan(data.plan);
    } catch (err) {
      console.error(err);
      setError(L.planner.error);
    } finally {
      setLoading(false);
      setProgress("");
    }
  };

  const reset = () => { setPlan(null); setDest(""); setDays(4); setTier("mid"); setError(""); setPage("planner"); };
  const goHome = () => { setPlan(null); setDest(""); setDays(4); setError(""); setPage("landing"); };

  const hotels = plan?.hotels?.[tier] || [];
  const sched = plan?.schedule || [];
  const bd = plan?.budgetEstimate?.[tier] || {};
  const total = (bd.hotel || 0) + (bd.food || 0) + (bd.activities || 0) + (bd.transport || 0);
  const daysText = (n) => lang === "ar" ? (n === 1 ? "يوم واحد" : n === 2 ? "يومان" : `${n} أيام`) : `${n} ${n === 1 ? "day" : "days"}`;

  const sty = {
    wrap: { maxWidth: 800, margin: "0 auto", padding: "0 28px" },
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", color: "#1a1a1a", direction: isRTL ? "rtl" : "ltr" }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
        .fu{animation:fadeUp .5s ease both}
        .fu1{animation-delay:.06s}.fu2{animation-delay:.12s}.fu3{animation-delay:.18s}.fu4{animation-delay:.24s}.fu5{animation-delay:.3s}
        .hover-lift{transition:transform .25s,box-shadow .25s}
        .hover-lift:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(0,0,0,.06)}
      `}</style>

      {/* NAV */}
      <nav style={{ borderBottom: "1px solid #EEECE8", background: "rgba(250,250,248,.85)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ ...sty.wrap, display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
          <div onClick={goHome} style={{ fontSize: 20, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, letterSpacing: "-0.5px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2A7F62" }} />
            TripWall
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14 }}>
            <span onClick={scrollToPlanner} style={{ color: "#888", cursor: "pointer", fontWeight: 500 }}>{L.nav.plan}</span>
            {page === "landing" && <span onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })} style={{ color: "#888", cursor: "pointer", fontWeight: 500 }}>{L.nav.how}</span>}
            <button onClick={() => setLang(lang === "ar" ? "en" : "ar")} style={{
              padding: "6px 14px", borderRadius: 6, border: "1.5px solid #EEECE8", background: "transparent",
              fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#666", fontFamily: "inherit",
            }}>{L.nav.lang}</button>
          </div>
        </div>
      </nav>

      {/* LANDING */}
      {page === "landing" && (
        <>
          <section style={{ padding: "80px 0 60px" }}>
            <div style={sty.wrap}>
              <div className="fu" style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, background: "#E8F5EF", color: "#2A7F62", fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 20, textTransform: "uppercase" }}>{L.hero.badge}</div>
              <h1 className="fu fu1" style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: "clamp(38px,6vw,62px)", fontWeight: 400, lineHeight: 1.12, maxWidth: 600, marginBottom: 20, letterSpacing: "-1px" }}>
                {L.hero.h1a}<br /><span style={{ color: "#2A7F62" }}>{L.hero.h1b}</span>
              </h1>
              <p className="fu fu2" style={{ fontSize: 17, color: "#777", maxWidth: 480, lineHeight: 1.8, marginBottom: 36 }}>{L.hero.desc}</p>
              <button className="fu fu3" onClick={scrollToPlanner} style={{ padding: "16px 44px", borderRadius: 10, border: "none", fontSize: 16, fontWeight: 700, background: "#1a1a1a", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>{L.hero.cta}</button>
            </div>
          </section>

          <section style={{ borderTop: "1px solid #EEECE8", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ ...sty.wrap, display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
              {L.stats.map((s, i) => (
                <div key={i} style={{ padding: "32px 0", textAlign: "center", borderInlineStart: i > 0 ? "1px solid #EEECE8" : "none" }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "#2A7F62", marginBottom: 4 }}>{s.val}</div>
                  <div style={{ fontSize: 13, color: "#999" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="how" style={{ padding: "72px 0" }}>
            <div style={sty.wrap}>
              <div style={{ textAlign: "center", marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{L.how.subtitle}</div>
                <h2 style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: 36, fontWeight: 400 }}>{L.how.title}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
                {L.how.steps.map((step, i) => (
                  <div key={i} className="hover-lift" style={{ background: "#fff", border: "1px solid #EEECE8", borderRadius: 16, padding: 28 }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: "#E8E6E2", marginBottom: 14, fontFamily: "'DM Sans',sans-serif" }}>{step.num}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{step.title}</div>
                    <div style={{ fontSize: 14, color: "#888", lineHeight: 1.7 }}>{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: "0 0 72px" }}>
            <div style={sty.wrap}>
              <h2 style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: 36, fontWeight: 400, textAlign: "center", marginBottom: 40 }}>{L.features.title}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
                {L.features.items.map((f, i) => (
                  <div key={i} className="hover-lift" style={{ background: "#fff", border: "1px solid #EEECE8", borderRadius: 14, padding: "24px 22px" }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: "60px 0", background: "#111", color: "#fff", textAlign: "center" }}>
            <div style={sty.wrap}>
              <h2 style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: 32, fontWeight: 400, marginBottom: 16 }}>{L.ctaSection.title}</h2>
              <p style={{ color: "#888", marginBottom: 28, fontSize: 15 }}>{L.ctaSection.desc}</p>
              <button onClick={scrollToPlanner} style={{ padding: "16px 48px", borderRadius: 10, border: "2px solid #fff", fontSize: 16, fontWeight: 700, background: "transparent", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>{L.hero.cta}</button>
            </div>
          </section>
        </>
      )}

      {/* PLANNER */}
      {page === "planner" && !plan && !loading && (
        <div style={{ ...sty.wrap, paddingTop: 52, paddingBottom: 40 }} className="fu">
          <div style={{ fontSize: 12, fontWeight: 700, color: "#2A7F62", textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>{L.planner.title}</div>
          <h1 style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: 40, fontWeight: 400, marginBottom: 8 }}>{L.hero.h1a}, <span style={{ color: "#bbb" }}>{L.hero.h1b}</span></h1>
          <p style={{ color: "#999", fontSize: 15, marginBottom: 40, maxWidth: 440 }}>{L.hero.desc}</p>

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{L.planner.destLabel}</div>
            <input value={dest} onChange={e => setDest(e.target.value)} onKeyDown={e => e.key === "Enter" && generate()}
              placeholder={L.planner.destPlaceholder}
              style={{ width: "100%", maxWidth: 460, padding: "14px 18px", borderRadius: 10, border: "2px solid #EEECE8", fontSize: 16, fontFamily: "inherit", color: "#111", background: "#fff", direction: isRTL ? "rtl" : "ltr" }}
              onFocus={e => e.target.style.borderColor = "#2A7F62"} onBlur={e => e.target.style.borderColor = "#EEECE8"}
            />
          </div>

          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 11, color: "#ccc", marginBottom: 8 }}>{L.planner.popular}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {popularDests.map(d => (
                <button key={d.en} onClick={() => setDest(d[lang])} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                  border: dest === d[lang] ? "1.5px solid #1a1a1a" : "1px solid #E8E6E2",
                  background: dest === d[lang] ? "#1a1a1a" : "#fff", color: dest === d[lang] ? "#fff" : "#666", fontFamily: "inherit",
                }}>{d.flag} {d[lang]}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>{L.planner.daysLabel}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button onClick={() => setDays(Math.max(1, days - 1))} style={{ width: 42, height: 42, borderRadius: 8, border: "1px solid #E8E6E2", background: "#fff", fontSize: 20, cursor: "pointer", color: "#444", fontFamily: "inherit" }}>−</button>
              <span style={{ fontSize: 36, fontWeight: 800, minWidth: 50, textAlign: "center" }}>{days}</span>
              <button onClick={() => setDays(Math.min(10, days + 1))} style={{ width: 42, height: 42, borderRadius: 8, border: "1px solid #E8E6E2", background: "#fff", fontSize: 20, cursor: "pointer", color: "#444", fontFamily: "inherit" }}>+</button>
              <span style={{ fontSize: 14, color: "#aaa" }}>{daysText(days)}</span>
            </div>
          </div>

          <button onClick={generate} disabled={!dest.trim()} style={{
            padding: "16px 52px", borderRadius: 10, border: "none", fontSize: 16, fontWeight: 700,
            background: dest.trim() ? "#1a1a1a" : "#eee", color: dest.trim() ? "#fff" : "#bbb",
            cursor: dest.trim() ? "pointer" : "not-allowed", fontFamily: "inherit",
          }}>{L.planner.go}</button>

          {error && <div style={{ marginTop: 20, padding: "14px 18px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, color: "#dc2626", fontSize: 14 }}>{error}</div>}
        </div>
      )}

      {/* LOADING */}
      {page === "planner" && loading && (
        <div style={{ ...sty.wrap, textAlign: "center", padding: "100px 28px" }} className="fu">
          <div style={{ width: 36, height: 36, border: "3px solid #eee", borderTopColor: "#2A7F62", borderRadius: "50%", animation: "spin .7s linear infinite", margin: "0 auto 24px" }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>{L.planner.loading} {dest}</div>
          <div style={{ fontSize: 14, color: "#999", animation: "pulse 2s infinite" }}>{progress}</div>
        </div>
      )}

      {/* RESULTS */}
      {page === "planner" && plan && !loading && (
        <div style={sty.wrap}>
          <div className="fu fu1" style={{ padding: "44px 0 32px", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#2A7F62", textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{L.plan.badge}</div>
            <h2 style={{ fontFamily: "'DM Serif Display','Tajawal',serif", fontSize: 38, fontWeight: 400, marginBottom: 4 }}>{plan.flag} {plan.destination}</h2>
            <p style={{ fontSize: 15, color: "#888" }}>{daysText(sched.length)} • {plan.country}</p>
          </div>

          <div className="fu fu2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: "1px solid #EEECE8" }}>
            {[ { l: L.plan.currency, v: plan.currency }, { l: L.plan.weather, v: plan.weather }, { l: L.plan.bestTime, v: plan.bestTime }, { l: L.plan.language, v: plan.language }, { l: L.plan.visa, v: plan.visa }, { l: L.plan.timezone, v: plan.timezone } ].map((info, i) => (
              <div key={i} style={{ padding: "18px 4px", borderInlineStart: i % 3 !== 0 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{info.l}</div>
                <div style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{info.v}</div>
              </div>
            ))}
          </div>

          <div className="fu fu3" style={{ padding: "32px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2 }}>{L.plan.hotels}</div>
              <div style={{ display: "flex", gap: 5 }}>
                {["budget", "mid", "luxury"].map(ti => (
                  <button key={ti} onClick={() => setTier(ti)} style={{
                    padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer",
                    border: tier === ti ? "1.5px solid #1a1a1a" : "1px solid #E8E6E2",
                    background: tier === ti ? "#1a1a1a" : "#fff", color: tier === ti ? "#fff" : "#888", fontFamily: "inherit",
                  }}>{L.tiers[ti]}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: 12 }}>
              {hotels.map((h, i) => (
                <div key={i} className="hover-lift" style={{ border: "1px solid #EEECE8", borderRadius: 12, padding: 18, background: "#fff" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>{h.area}{h.desc ? ` — ${h.desc}` : ""}</div>
                  <span style={{ fontSize: 22, fontWeight: 800 }}>${h.pricePerNight}</span>
                  <span style={{ fontSize: 12, color: "#bbb" }}> / {L.plan.night}</span>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>${(h.pricePerNight * days).toLocaleString()} {L.plan.total}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fu fu4" style={{ padding: "32px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 20 }}>{L.plan.schedule}</div>
            {sched.map((d, idx) => (
              <div key={idx} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: idx < sched.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#1a1a1a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>{d.day || idx + 1}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{d.title}</div>
                    <div style={{ fontSize: 12, color: "#bbb" }}>{idx === 0 ? L.plan.arrival : idx === sched.length - 1 ? L.plan.lastDay : `${L.plan.dayN} ${idx + 1}`}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gap: 1, background: "#f5f5f5", borderRadius: 12, overflow: "hidden" }}>
                  {[ { icon: "☀️", label: L.plan.morning, data: d.morning }, { icon: "☁️", label: L.plan.afternoon, data: d.afternoon }, { icon: "🌙", label: L.plan.evening, data: d.evening } ].map((p, pi) => (
                    <div key={pi} style={{ display: "flex", gap: 12, padding: "13px 16px", background: "#fff", alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16, marginTop: 1 }}>{p.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, marginBottom: 2 }}>{p.label}</div>
                        <div style={{ fontSize: 14, color: "#222", lineHeight: 1.6 }}>{p.data?.activity || p.data}</div>
                      </div>
                      <div style={{ fontSize: 12, color: (p.data?.cost > 0) ? "#2A7F62" : "#ddd", fontWeight: 600, marginTop: 14 }}>
                        {(p.data?.cost > 0) ? `~$${p.data.cost}` : L.plan.free}
                      </div>
                    </div>
                  ))}
                </div>
                {d.restaurant && (
                  <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", background: "#FAFAF8", border: "1px solid #EEECE8", borderRadius: 8, fontSize: 13, color: "#666" }}>
                    🍽️ <span style={{ fontWeight: 600 }}>{d.restaurant.name}</span>
                    <span style={{ color: "#ddd" }}>•</span>
                    <span style={{ color: "#999" }}>{d.restaurant.cuisine}</span>
                    <span style={{ color: "#2A7F62", fontWeight: 600 }}>{d.restaurant.priceLevel}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="fu fu5" style={{ padding: "32px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{L.plan.budget} — {L.tiers[tier]}</div>
            <div style={{ borderRadius: 12, border: "1px solid #EEECE8", overflow: "hidden" }}>
              {[ { l: L.plan.hotelCat, v: bd.hotel||0, d: `${days} ${L.plan.nights}` }, { l: L.plan.activities, v: bd.activities||0, d: `${sched.length} ${L.plan.days}` }, { l: L.plan.food, v: bd.food||0, d: `${days} ${L.plan.days}` }, { l: L.plan.transport, v: bd.transport||0, d: `${days} ${L.plan.days}` } ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: "1px solid #f5f5f5", background: "#fff" }}>
                  <div><div style={{ fontSize: 14, fontWeight: 500 }}>{r.l}</div><div style={{ fontSize: 11, color: "#bbb" }}>{r.d}</div></div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>${r.v.toLocaleString()}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", background: "#1a1a1a", color: "#fff" }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{L.plan.grandTotal}</div>
                <div style={{ fontSize: 28, fontWeight: 800 }}>${total.toLocaleString()}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#bbb", marginTop: 10 }}>{L.plan.note}</div>
          </div>

          <div className="fu" style={{ padding: "32px 0", borderBottom: "1px solid #EEECE8" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>{L.plan.tips}</div>
            {(plan.tips || []).map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "11px 0", borderBottom: i < (plan.tips || []).length - 1 ? "1px solid #f5f5f5" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: "#f5f5f3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#999", flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: "#444", lineHeight: 1.7 }}>{tip}</div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 12, color: "#ccc", marginBottom: 16 }}>{L.plan.sourceNote}</div>
            <button onClick={reset} style={{ padding: "14px 44px", borderRadius: 10, border: "1px solid #ddd", background: "#fff", fontSize: 15, fontWeight: 600, color: "#666", cursor: "pointer", fontFamily: "inherit" }}>{L.plan.newTrip}</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #EEECE8", padding: "24px 0" }}>
        <div style={{ ...sty.wrap, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#ccc" }}>TripWall</div>
          <div style={{ fontSize: 11, color: "#ccc" }}>© 2026 — {L.footer.powered}</div>
        </div>
      </footer>
    </div>
  );
}
