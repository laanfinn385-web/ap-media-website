"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

const steps = [
  { n: "01", h: "Wij bouwen alles voor je", body: "Content systeem, AI-chatbot, email flow — volledig op maat voor jouw business. Jij hoeft niks te installeren of uit te zoeken.", tag: "WEEK 1" },
  { n: "02", h: "Jij hoeft alleen nog te filmen", body: "Alles staat voor je klaar — het enige wat jij nog hoeft te doen is te filmen. Ik edit het voor je en zet het op al je socials.", tag: "DOORLOPEND" },
  { n: "03", h: "Jouw agenda vult zich", body: "Gekwalificeerde leads boeken zelf een intake in. Geen koude acquisitie. Geen gejaag. Gewoon een volle agenda.", tag: "VANAF WEEK 3" },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", toggleActions: "play none none none" };
      gsap.from(".hiw-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: st });
      gsap.from(".hiw-connector", { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power2.out", scrollTrigger: { ...st, start: "top 65%" } });
      gsap.from(".hiw-card", { y: 40, opacity: 0, scale: 0.96, duration: 0.7, ease: "power3.out", stagger: 0.15, scrollTrigger: { ...st, start: "top 65%" } });
    },
    { scope: sectionRef }
  );

  return (
    <section id="hoe-het-werkt" ref={sectionRef} className="section-pad-lg" style={{ padding: "120px 32px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="hiw-header" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
          <Eyebrow center color={PURPLE} dot={SPARK}>Hoe het werkt</Eyebrow>
          <h2 style={{ fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "#141413", margin: "20px 0 16px" }}>
            Drie simpele stappen.
          </h2>
          <p style={{ fontSize: 17, color: "#555", margin: 0 }}>
            Van eerste intakegesprek tot volle agenda — zonder dat jij een uur extra werk hebt.
          </p>
        </div>

        <div className="hiw-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, position: "relative" }}>
          <div className="hiw-connector" style={{ position: "absolute", left: "16%", right: "16%", top: 56, height: 2, background: `repeating-linear-gradient(to right, ${PURPLE}55 0, ${PURPLE}55 8px, transparent 8px, transparent 16px)`, zIndex: 0 }} />

          {steps.map((s, i) => (
            <article key={i} className="hiw-card" style={{ background: "#FCFBFA", borderRadius: 24, padding: "32px 28px", position: "relative", zIndex: 1, boxShadow: "0 4px 24px rgba(0,0,0,0.04)", minHeight: 280 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ width: 56, height: 56, borderRadius: "50%", background: PURPLE, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>
                  {s.n}
                </span>
                <span style={{ padding: "6px 12px", borderRadius: 999, background: "#EEE8DF", color: "#9A3A0A", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
                  {s.tag}
                </span>
              </div>
              <h3 style={{ fontSize: 24, lineHeight: 1.15, letterSpacing: "-0.02em", fontWeight: 500, color: "#141413", margin: "0 0 12px" }}>
                {s.h}
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 450, color: "#555", margin: 0 }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
