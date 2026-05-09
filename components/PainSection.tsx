"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

const tasks = [
  { h: "Dagelijks content posten", sub: "Reels, carrousels, captions, hooks — over alle kanalen" },
  { h: "DM's en leads opvolgen", sub: "Binnen 5 minuten antwoorden. Elke dag. Ook in het weekend." },
  { h: "Email flows bouwen", sub: "Welkomstreeks, nurture, win-back — geschreven en getest" },
  { h: "Funnels en automatisering", sub: "Boekingstool, kwalificatieformulier, agenda-koppeling" },
];

export default function PainSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(".pain-watermark", { y: 30, opacity: 0, duration: 1.2, ease: "power2.out", scrollTrigger: st });
      gsap.from(".pain-left", { x: -40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: st });
      gsap.from(".pain-right", { x: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: st });
      gsap.from(".pain-item", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.12, scrollTrigger: { ...st, start: "top 70%" } });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-pad-lg" style={{ padding: "120px 32px 80px" }}>
      <div className="pain-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.05fr", gap: 64, alignItems: "center" }}>

        {/* Left column */}
        <div className="pain-left" style={{ position: "relative" }}>
          <div className="pain-watermark mob-hide" style={{ position: "absolute", left: -8, top: -10, fontSize: 130, fontWeight: 500, letterSpacing: "-0.04em", color: "#EEE8DF", lineHeight: 0.9, pointerEvents: "none", userSelect: "none" }}>
            De<br />pijn
          </div>
          <div style={{ position: "relative" }}>
            <Eyebrow color={PURPLE} dot={SPARK}>Het probleem</Eyebrow>
            <h2 style={{ fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "#141413", margin: "20px 0 24px" }}>
              Jij bent een goede coach.
              <br />
              Maar je agenda is <span style={{ color: PURPLE }}>niet vol.</span>
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 450, color: "#262627", margin: "0 0 20px", maxWidth: 480 }}>
              Niet omdat je aanbod slecht is. Maar omdat consistente content,
              leadopvolging en geautomatiseerde systemen dingen zijn waar jij geen
              tijd voor hebt — en eerlijk gezegd ook niet voor opgeleid bent.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 500, color: "#141413", margin: 0, maxWidth: 480 }}>
              Dat is precies waar wij voor gebouwd zijn.
            </p>
          </div>
        </div>

        {/* Right card */}
        <div className="pain-right" style={{ background: "#FCFBFA", borderRadius: 32, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#696969", marginBottom: 20 }}>
            ● WAT JE NU NIET DOET
          </div>
          {tasks.map((t, i) => (
            <div key={i} className="pain-item" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 0", borderBottom: i < tasks.length - 1 ? "1px solid #EEE8DF" : "none" }}>
              <span style={{ width: 28, height: 28, borderRadius: "50%", background: `${PURPLE}11`, color: PURPLE, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#141413", marginBottom: 2 }}>{t.h}</div>
                <div style={{ fontSize: 13, color: "#696969", lineHeight: 1.4 }}>{t.sub}</div>
              </div>
              <span style={{ marginLeft: "auto", flexShrink: 0, padding: "4px 10px", borderRadius: 999, background: "#EEE8DF", color: "#9A3A0A", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em" }}>
                KOST UREN
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
