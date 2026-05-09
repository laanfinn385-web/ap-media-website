"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

export default function ScarcitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 80%", toggleActions: "play none none none" };
      gsap.from(".scarcity-left", { x: -40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: st });
      gsap.from(".scarcity-right", { x: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: st });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "40px 32px 80px" }}>
      <div className="scarcity-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="scarcity-left" style={{ background: "#FCFBFA", borderRadius: 24, padding: 32, border: `1.5px solid ${PURPLE}22` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: SPARK, boxShadow: `0 0 0 4px ${SPARK}33`, display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9A3A0A" }}>Beperkt aantal plekken</span>
          </div>
          <h3 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 500, color: "#141413", margin: "0 0 16px" }}>
            Maximaal <span style={{ color: PURPLE }}>4 plekken</span> per maand.
          </h3>
          <p style={{ fontSize: 15, color: "#555", margin: 0 }}>
            Omdat elk traject persoonlijk begeleid wordt, accepteren we maandelijks een beperkt aantal coaches.
          </p>
        </div>

        <div className="scarcity-right" style={{ background: "#141413", color: "#F3F0EE", borderRadius: 24, padding: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: SPARK, display: "inline-block" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: SPARK }}>Aanbod loopt af</span>
          </div>
          <h3 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 500, color: "#F3F0EE", margin: "0 0 16px" }}>
            Lanceringsprijs alleen <span style={{ color: SPARK }}>deze maand</span> beschikbaar.
          </h3>
          <p style={{ fontSize: 15, color: "rgba(243,240,238,0.7)", margin: 0 }}>
            Hierna gaat het pakket terug naar de standaardprijs. De garantie en bonussen blijven, maar de prijs niet.
          </p>
        </div>
      </div>
    </section>
  );
}
