"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";
import Arrow from "./shared/Arrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const PURPLE_DEEP = "#2A0A4A";
const SPARK = "#F37338";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", toggleActions: "play none none none" };
      gsap.from(".fcta-card", { scale: 0.95, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".fcta-arc", { strokeDashoffset: 1300, duration: 2.4, ease: "power2.out", stagger: 0.3, scrollTrigger: { ...st, start: "top 65%" } });
      gsap.from(".fcta-content", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { ...st, start: "top 65%" } });
      gsap.to(btnRef.current, { boxShadow: "0 32px 64px rgba(0,0,0,0.38)", duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2 });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "40px 32px 120px" }}>
      <div
        className="fcta-card"
        style={{ maxWidth: 1100, margin: "0 auto", background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DEEP} 100%)`, color: "#F3F0EE", borderRadius: 40, padding: "96px 48px", position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        <svg width="900" height="900" viewBox="0 0 900 900" className="mob-hide" style={{ position: "absolute", left: "50%", top: "120%", transform: "translate(-50%, -50%)", opacity: 0.18, pointerEvents: "none" }}>
          <path className="fcta-arc" d="M 50 450 A 400 400 0 1 1 850 450" stroke={SPARK} strokeWidth="2" fill="none" strokeDasharray="1300" />
          <path className="fcta-arc" d="M 150 450 A 300 300 0 1 1 750 450" stroke={SPARK} strokeWidth="1.5" fill="none" opacity="0.7" strokeDasharray="1000" />
          <path className="fcta-arc" d="M 250 450 A 200 200 0 1 1 650 450" stroke={SPARK} strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="700" />
        </svg>

        <div className="fcta-content" style={{ position: "relative" }}>
          <Eyebrow center color="#F3F0EE" dot={SPARK}>Boek je gesprek</Eyebrow>

          <h2 style={{ fontSize: "clamp(36px, 6vw, 80px)", lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 500, color: "#F3F0EE", margin: "24px auto 28px", maxWidth: 880 }}>
            Boek een gratis
            <br />
            <span style={{ color: SPARK }}>kennismakingsgesprek.</span>
          </h2>

          <p style={{ fontSize: 19, lineHeight: 1.5, fontWeight: 450, color: "rgba(243,240,238,0.85)", margin: "0 auto 40px", maxWidth: 580 }}>
            Geen verplichtingen. Geen verkooppraatje. We kijken samen of het een match is.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <a
              ref={btnRef}
              href="https://cal.com/finn-ap-media/groeigesprek"
              target="_blank"
              rel="noopener noreferrer"
              className="fcta-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "22px 44px", background: SPARK, color: "#141413", border: 0, borderRadius: 999, cursor: "pointer", fontFamily: "inherit", fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", boxShadow: "0 24px 48px rgba(0,0,0,0.28)", textTransform: "uppercase", textDecoration: "none", transition: "transform 240ms cubic-bezier(0.4,0,0.2,1)" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
            >
              Plan je gesprek
              <Arrow size={20} />
            </a>
          </div>

          <div style={{ display: "inline-flex", gap: 24, flexWrap: "wrap", justifyContent: "center", fontSize: 13, color: "rgba(243,240,238,0.7)" }}>
            <span>✓ Boek meteen een tijd</span>
            <span>✓ 30 minuten, online</span>
            <span>✓ Nederland-only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
