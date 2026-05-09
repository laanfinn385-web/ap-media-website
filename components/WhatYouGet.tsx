"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";
import Check from "./shared/Check";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

const items = [
  "Volledig beheerd content systeem — dagelijkse posts op alle platforms",
  "Ik edit al je content voor je",
  "AI-chatbot specifiek voor jouw business",
  "Volledig beheerde email flow",
  "Bi-weekly persoonlijke feedbackcalls",
  "Performance dashboard — altijd inzicht in je groei",
];

const bonuses = [
  { n: "Bonus 1", h: "Het Startpakket", body: "Professionele mic + light, aan huis bezorgd.", value: "€200" },
  { n: "Bonus 2", h: "De Content Vault", body: "Backupcontent voor drukke weken en vakanties.", value: "€100" },
  { n: "Bonus 3", h: "Trainingsbijeenkomst", body: "Live sessie + opgenomen video's.", value: "€250" },
];

export default function WhatYouGet() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", toggleActions: "play none none none" };
      gsap.from(".wyg-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: st });
      gsap.from(".wyg-deliverable", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out", scrollTrigger: { ...st, start: "top 65%" } });
      gsap.from(".wyg-bonus", { x: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", scrollTrigger: { ...st, start: "top 65%" } });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "80px 32px 80px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="wyg-header" style={{ textAlign: "center", marginBottom: 56 }}>
          <Eyebrow center color={PURPLE} dot={SPARK}>Wat je krijgt</Eyebrow>
          <h2 style={{ fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "#141413", margin: "20px 0 0" }}>
            Volle Agenda Methode <span style={{ color: PURPLE }}>inclusief:</span>
          </h2>
        </div>

        <div className="wyg-grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Deliverables */}
          <div className="wyg-deliverables-card" style={{ background: "#FCFBFA", borderRadius: 32, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#696969", marginBottom: 20 }}>● HOOFDPAKKET</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
              {items.map((it, i) => (
                <li key={i} className="wyg-deliverable" style={{ display: "flex", alignItems: "flex-start", gap: 14, fontSize: 16, lineHeight: 1.4, color: "#141413" }}>
                  <Check size={14} bg={PURPLE} />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bonuses */}
          <div style={{ display: "grid", gap: 14 }}>
            {bonuses.map((b, i) => (
              <div key={i} className="wyg-bonus" style={{ background: i === 0 ? PURPLE : "#FCFBFA", color: i === 0 ? "#F3F0EE" : "#141413", borderRadius: 20, padding: "20px 22px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0, background: i === 0 ? SPARK : `${PURPLE}11`, color: i === 0 ? "#141413" : PURPLE, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", textAlign: "center", lineHeight: 1.2 }}>
                  {b.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em", marginBottom: 2 }}>{b.h}</div>
                  <div style={{ fontSize: 13, color: i === 0 ? "rgba(243,240,238,0.75)" : "#696969", lineHeight: 1.4 }}>{b.body}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: i === 0 ? SPARK : "#9A3A0A", flexShrink: 0 }}>+{b.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
