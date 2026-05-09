"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = { trigger: sectionRef.current!, start: "top 75%", toggleActions: "play none none none" };
      gsap.from(".about-portrait", { x: -50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".about-content", { x: 50, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".about-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", scrollTrigger: { ...st, start: "top 65%" } });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "40px 32px 80px" }}>
      <div
        className="about-card"
        style={{ maxWidth: 1180, margin: "0 auto", background: "#FCFBFA", borderRadius: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.04)", overflow: "hidden" }}
      >
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr" }}>
          {/* Portrait */}
          <div
            className="about-portrait about-portrait-col"
            style={{ position: "relative", padding: 32, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(180deg, ${PURPLE}08 0%, ${PURPLE}1a 100%)`, minHeight: 320 }}
          >
            <Image
              src="/assets/finn-portrait.jpg"
              alt="Finn — A&P Media"
              width={400}
              height={480}
              style={{ maxWidth: "100%", maxHeight: 480, height: "auto", width: "auto", borderRadius: 24, display: "block", boxShadow: "0 24px 48px rgba(0,0,0,0.18)", objectFit: "cover" }}
            />
            <div
              className="about-sig-pill"
              style={{ position: "absolute", left: 48, bottom: 48, padding: "10px 16px", borderRadius: 999, background: "rgba(252,251,250,0.96)", fontSize: 13, fontWeight: 500, color: "#141413", display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: SPARK, display: "inline-block" }} />
              Finn — oprichter A&P Media
            </div>
          </div>

          {/* Copy */}
          <div className="about-content about-content-col" style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Eyebrow color={PURPLE} dot={SPARK}>Over mij</Eyebrow>
            <h2 style={{ fontSize: "clamp(32px, 4.4vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.025em", fontWeight: 500, color: "#141413", margin: "20px 0 24px" }}>
              Hoi, ik ben <span style={{ color: PURPLE }}>Finn</span>.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 450, color: "#262627", margin: "0 0 16px" }}>
              Ik ben Finn, 16 jaar en oprichter van A&amp;P Media. Ik begon op mijn vijftiende
              met een techblog, werkte daar maanden aan zonder één euro te verdienen, en schreef
              uiteindelijk voor een Amerikaans techbedrijf. Daarna bouwde ik websites voor
              personal trainers, belde honderden bedrijven op voordat ik mijn eerste klant
              landde, en besloot opnieuw te pivotten toen ik zag waar de markt naartoe ging.
              Niet omdat het makkelijk was — maar omdat ik nooit stop totdat het werkt.
            </p>
            <p style={{ fontSize: 18, lineHeight: 1.55, fontWeight: 450, color: "#262627", margin: "0 0 28px" }}>
              Dat is ook hoe ik werk voor jou. Mijn eerste klant ging van 3 posts op zijn
              profiel en geen idee waar te beginnen, naar zijn eerste klanten via Instagram in
              de eerste paar weken. Ik weet wat het kost om iets op te bouwen, en ik geef alles
              voor jouw resultaten. Dat is ook waarom ik een garantie aanbied die ik zelf moet
              waarmaken — jij neemt geen enkel risico. Dat doe ik.
            </p>

            <div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: "1px solid #EEE8DF" }}>
              {[{ v: "100%", l: "NL-only focus" }, { v: "1-op-1", l: "persoonlijk contact" }].map((s, i) => (
                <div key={i} className="about-stat">
                  <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.02em", color: PURPLE, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "#696969", marginTop: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
