"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

const reviews = [
  { quote: "Met zijn snelle en kundige handelen heeft die een mooi resultaat weten neer te zetten, Dankjewel Finn", name: "Ben V.", role: "Eigenaar Energize Gym", initials: "BV" },
  { quote: "We zijn tevreden over de samenwerking met dit marketingbedrijf. De communicatie was prettig en professioneel.", name: "Umit U.", role: "Online fitness coach", initials: "UU" },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".review-header", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current!, start: "top 80%", toggleActions: "play none none none" } });
      gsap.from(".review-card", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.2, scrollTrigger: { trigger: sectionRef.current!, start: "top 70%", toggleActions: "play none none none" } });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "40px 32px 120px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="review-header" style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
          <Eyebrow center color={PURPLE} dot={SPARK}>Wat coaches zeggen</Eyebrow>
          <h2 style={{ fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "#141413", margin: "20px 0 0" }}>
            Resultaten van <span style={{ color: PURPLE }}>echte coaches.</span>
          </h2>
        </div>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {reviews.map((r, i) => (
            <article key={i} className="review-card" style={{ background: "#FCFBFA", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 56, lineHeight: 0.7, color: PURPLE, fontFamily: "Georgia, serif", fontWeight: 700 }}>&ldquo;</div>
                <span style={{ display: "inline-flex", gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={SPARK}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}
                </span>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "#262627", margin: 0, flex: 1, fontWeight: 450 }}>{r.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid #EEE8DF" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${PURPLE}11`, color: PURPLE, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", flexShrink: 0 }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#141413" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "#696969" }}>{r.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
