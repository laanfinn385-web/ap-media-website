"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Arrow from "@/components/shared/Arrow";
import Eyebrow from "@/components/shared/Eyebrow";

gsap.registerPlugin(useGSAP);

const PURPLE = "#3B0F66";
const PURPLE_DEEP = "#2A0A4A";
const SPARK = "#F37338";
const INK = "#141413";
const CANVAS = "#F3F0EE";
const LIFTED = "#FCFBFA";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const benefits = [
  "De 3 contenttypes die direct intakes genereren",
  "De 7 virale hoekformules die altijd werken",
  "Scriptstructuren + de volgorde van een goede reel",
  "Hoe je viral outlier hooks vindt in jouw niche",
  "Het tweefasen-groeimodel voor Instagram",
];

// ── Nav (standalone, no scroll state needed) ──────────────────────────────────
function Nav() {
  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "min(1240px, calc(100% - 24px))",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "10px 14px 10px 20px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: 999,
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        }}
      >
        <a href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <Image src="/assets/logo-web.png" alt="A&P Media" width={100} height={47} style={{ height: 47, width: "auto", objectFit: "contain" }} priority />
        </a>
        <a
          href="https://cal.com/finn-ap-media/groeigesprek"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: CANVAS, border: `1.5px solid ${PURPLE}`, borderRadius: 20, padding: "11px 22px", fontFamily: "inherit", fontWeight: 500, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap", transition: "background 240ms" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = PURPLE_DEEP)}
          onMouseLeave={(e) => (e.currentTarget.style.background = PURPLE)}
        >
          Boek een gesprek <Arrow size={13} />
        </a>
      </div>
    </div>
  );
}

// ── Form card ─────────────────────────────────────────────────────────────────
function LeadForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    if (!EMAIL_RE.test(email.trim())) {
      setErrorMsg("Vul een geldig e-mailadres in.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Er ging iets mis.");
      }

      // Trigger browser download from the streamed PDF
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Volle_Agenda_Content_Gids.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Er ging iets mis.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ background: LIFTED, borderRadius: 32, padding: "48px 40px", boxShadow: "0 24px 64px rgba(0,0,0,0.10)", textAlign: "center" }}>
        {/* animated check */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: PURPLE, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5 12 10 17 19 7" />
          </svg>
        </div>
        <h3 style={{ fontSize: 26, fontWeight: 500, letterSpacing: "-0.02em", color: INK, margin: "0 0 12px" }}>
          De gids staat klaar!
        </h3>
        <p style={{ fontSize: 16, color: "#555", lineHeight: 1.55, margin: "0 0 28px" }}>
          Je download is automatisch gestart. Check ook je downloads-map als je het bestand niet direct ziet.
        </p>
        <a
          href="https://cal.com/finn-ap-media/groeigesprek"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: PURPLE, color: CANVAS, borderRadius: 20, padding: "14px 28px", fontFamily: "inherit", fontWeight: 500, fontSize: 15, textDecoration: "none" }}
        >
          Boek ook een gratis gesprek <Arrow size={14} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: LIFTED, borderRadius: 32, padding: "48px 40px", boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}>
      {/* PDF icon / thumbnail */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, padding: "16px 20px", background: `${PURPLE}0d`, borderRadius: 16, border: `1px solid ${PURPLE}1a` }}>
        <div style={{ width: 48, height: 60, borderRadius: 8, background: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: PURPLE, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>Gratis PDF</div>
          <div style={{ fontSize: 15, fontWeight: 500, color: INK, lineHeight: 1.3 }}>Volle Agenda Content Gids</div>
          <div style={{ fontSize: 12, color: "#696969", marginTop: 2 }}>Het exacte systeem · direct downloadbaar</div>
        </div>
      </div>

      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#696969", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8 }}>
        Jouw e-mailadres
      </label>
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); if (errorMsg) setErrorMsg(""); }}
        placeholder="naam@voorbeeld.nl"
        autoComplete="email"
        style={{
          width: "100%",
          padding: "14px 18px",
          fontSize: 16,
          fontFamily: "inherit",
          fontWeight: 450,
          color: INK,
          background: "#fff",
          border: errorMsg ? "1.5px solid #CF4500" : "1.5px solid rgba(20,20,19,0.2)",
          borderRadius: 14,
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 200ms",
          marginBottom: errorMsg ? 8 : 16,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = PURPLE)}
        onBlur={(e) => (e.currentTarget.style.borderColor = errorMsg ? "#CF4500" : "rgba(20,20,19,0.2)")}
      />

      {errorMsg && (
        <p style={{ fontSize: 13, color: "#CF4500", margin: "0 0 16px", fontWeight: 500 }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: status === "loading" ? "#6B3FA0" : PURPLE,
          color: CANVAS,
          border: "none",
          borderRadius: 20,
          padding: "16px 24px",
          fontFamily: "inherit",
          fontWeight: 500,
          fontSize: 17,
          cursor: status === "loading" ? "wait" : "pointer",
          transition: "background 240ms",
          letterSpacing: "-0.02em",
        }}
        onMouseEnter={(e) => { if (status !== "loading") e.currentTarget.style.background = PURPLE_DEEP; }}
        onMouseLeave={(e) => { if (status !== "loading") e.currentTarget.style.background = PURPLE; }}
      >
        {status === "loading" ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Bezig...
          </>
        ) : (
          <>
            Download gratis gids
            <Arrow size={16} />
          </>
        )}
      </button>

      <p style={{ fontSize: 12, color: "#888", textAlign: "center", margin: "16px 0 0", lineHeight: 1.5 }}>
        Geen spam. Alleen waardevolle content voor coaches. Uitschrijven kan altijd.
      </p>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function GratisGids() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".lm-eyebrow", { y: -16, opacity: 0, duration: 0.6 })
        .from(".lm-h1", { y: 28, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".lm-body", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".lm-benefit", { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.4")
        .from(".lm-form", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6");
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} style={{ background: CANVAS, minHeight: "100vh", fontFamily: "inherit" }}>
      <Nav />

      {/* ambient glow */}
      <div aria-hidden style={{ position: "fixed", top: -160, right: -120, width: 560, height: 560, borderRadius: "50%", background: `radial-gradient(circle, ${PURPLE}18 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "fixed", bottom: -200, left: -100, width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${SPARK}12 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <main style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "140px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

        {/* Left — copy */}
        <div>
          <div className="lm-eyebrow">
            <Eyebrow color={PURPLE} dot={SPARK}>Gratis download</Eyebrow>
          </div>

          <h1
            className="lm-h1"
            style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.02, letterSpacing: "-0.03em", fontWeight: 500, color: INK, margin: "20px 0 24px" }}
          >
            Het systeem dat fitness coaches dagelijks laat posten én{" "}
            <span style={{ color: PURPLE }}>intakes boekt.</span>
          </h1>

          <p
            className="lm-body"
            style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 450, color: "#262627", margin: "0 0 32px", maxWidth: 460 }}
          >
            De Volle Agenda Content Gids geeft je het exacte systeem om consistente content te maken die volgers omzet in intakegesprekken.
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {benefits.map((b, i) => (
              <li key={i} className="lm-benefit" style={{ display: "flex", alignItems: "flex-start", gap: 14, fontSize: 16, color: INK, lineHeight: 1.45 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: PURPLE, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="5 12 10 17 19 7" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* social proof strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 40, padding: "14px 20px", background: LIFTED, borderRadius: 14, boxShadow: "0 4px 16px rgba(0,0,0,0.04)", width: "fit-content" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22a06b", boxShadow: "0 0 0 3px #22a06b22", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#555" }}>100% gratis — geen creditcard nodig</span>
          </div>
        </div>

        {/* Right — form */}
        <div className="lm-form">
          <LeadForm />
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: INK, color: "#F3F0EE", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 10px" }}>
            <Image src="/assets/logo-web.png" alt="A&P Media" width={80} height={38} style={{ height: 38, width: "auto", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 13, color: "rgba(243,240,238,0.6)", flexWrap: "wrap" }}>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="/algemene-voorwaarden" style={{ color: "inherit", textDecoration: "none" }}>Algemene voorwaarden</a>
            <span>© 2026 A&amp;P Media</span>
          </div>
        </div>
      </footer>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          main {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 110px !important;
          }
        }
        @media (max-width: 480px) {
          form, div[style*="border-radius: 32px"] {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
