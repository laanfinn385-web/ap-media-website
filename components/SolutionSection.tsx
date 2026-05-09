"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

const barHeights = [42, 58, 35, 70, 84, 92, 100];
const stats = [
  { target: 7,  label: "Posts geplaatst" },
  { target: 20, label: "Leads opgevolgd" },
  { target: 8,  label: "Intakes geboekt" },
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const st = {
        trigger: sectionRef.current!,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      gsap.from(".solution-card", {
        scale: 0.94,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: st,
      });

      gsap.from(".solution-text", {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: st,
      });

      gsap.from(".solution-dashboard", {
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: st,
      });

      // Arc draw
      gsap.from(".solution-arc", {
        strokeDashoffset: 1000,
        duration: 2,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: st,
      });

      // Bar chart grow from bottom
      gsap.from(".bar-item", {
        scaleY: 0,
        transformOrigin: "bottom center",
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { ...st, start: "top 65%" },
      });

      // Stats count UP — use gsap.to on a proxy object
      const statEls = sectionRef.current!.querySelectorAll(".stat-value");
      stats.forEach(({ target }, i) => {
        const el = statEls[i] as HTMLElement;
        if (!el) return;
        el.textContent = "0";
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          delay: i * 0.15,
          onUpdate() {
            el.textContent = Math.round(proxy.val).toString();
          },
          scrollTrigger: { ...st, start: "top 60%" },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-pad-md mob-px" style={{ padding: "80px 32px 80px" }}>
      <div
        className="solution-card"
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          background: PURPLE,
          color: "#F3F0EE",
          borderRadius: 40,
          padding: "80px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbital arc decoration */}
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          className="mob-hide"
          style={{
            position: "absolute",
            right: -200,
            top: -200,
            opacity: 0.3,
            pointerEvents: "none",
          }}
        >
          <path
            className="solution-arc"
            d="M 100 400 A 300 300 0 1 1 700 400"
            stroke={SPARK}
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="1000"
          />
          <path
            className="solution-arc"
            d="M 200 400 A 200 200 0 1 1 600 400"
            stroke={SPARK}
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            strokeDasharray="1000"
          />
          <circle cx="700" cy="400" r="6" fill={SPARK} />
        </svg>

        <div className="solution-inner-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }}>
          {/* Text */}
          <div className="solution-text">
            <Eyebrow color="#F3F0EE" dot={SPARK}>
              De oplossing
            </Eyebrow>
            <h2
              style={{
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontWeight: 500,
                color: "#F3F0EE",
                margin: "20px 0 28px",
              }}
            >
              Volle Agenda
              <br />
              <span style={{ color: SPARK }}>Methode.</span>
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.55, fontWeight: 450, color: "rgba(243,240,238,0.85)", margin: "0 0 16px", maxWidth: 480 }}>
              Een volledig gebouwd en beheerd systeem dat dagelijks content
              plaatst, leads automatisch opvolgt, en intakegesprekken
              rechtstreeks in jouw agenda boekt.
            </p>
            <p style={{ fontSize: 22, lineHeight: 1.4, fontWeight: 500, color: "#F3F0EE", margin: 0 }}>
              Jij hoeft alleen maar te coachen.
            </p>
          </div>

          {/* Dashboard card */}
          <div
            className="solution-dashboard"
            style={{
              background: "#F3F0EE",
              color: "#141413",
              borderRadius: 24,
              padding: 24,
              boxShadow: "0 24px 48px rgba(0,0,0,0.25)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: PURPLE }}>
                ● Jouw 7-daagse overzicht
              </div>
              <span style={{ fontSize: 11, color: "#696969" }}>Live</span>
            </div>

            {/* Bar chart */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, alignItems: "end", height: 110, marginBottom: 16 }}>
              {barHeights.map((h, i) => (
                <div key={i} className="bar-item" style={{ height: `${h}%`, background: i === 6 ? SPARK : `${PURPLE}cc`, borderRadius: 8 }} />
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, paddingTop: 16, borderTop: "1px solid #EEE8DF" }}>
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="stat-value" style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", color: PURPLE }}>
                    0
                  </div>
                  <div style={{ fontSize: 11, color: "#696969", marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
