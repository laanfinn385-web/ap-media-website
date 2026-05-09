"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Arrow from "./shared/Arrow";

gsap.registerPlugin(useGSAP);

const PURPLE = "#3B0F66";
const SPARK = "#F37338";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { y: -24, opacity: 0, duration: 0.7 })
        .from(".hero-h1", { y: 36, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".hero-body", { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-ctas", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="hero-section"
      style={{
        paddingTop: 130,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* purple ambient glow */}
      <div className="mob-hide" style={{ position: "absolute", top: -120, right: -80, width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${PURPLE}22 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div className="mob-hide" style={{ position: "absolute", bottom: -200, left: -100, width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${SPARK}1a 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
        {/* Trust badge */}
        <div className="hero-badge" style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "#FCFBFA",
              border: `1px solid ${PURPLE}22`,
              padding: "8px 18px 8px 8px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 500,
              color: "#141413",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            <span style={{ padding: "4px 10px", borderRadius: 999, background: PURPLE, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>
              NIEUW
            </span>
            Volle Agenda Methode — voor fitness coaches
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: SPARK, display: "inline-block", flexShrink: 0 }} />
          </div>
        </div>

        {/* Headline */}
        <h1
          className="hero-h1"
          style={{
            fontSize: "clamp(38px, 6.5vw, 88px)",
            lineHeight: 0.98,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            color: "#141413",
            margin: "0 auto 28px",
            textAlign: "center",
            maxWidth: 1040,
          }}
        >
          10 intakegesprekken in 60 dagen —
          <br />
          <span style={{ color: PURPLE }}>of ik werk </span>
          <span className="dashline" style={{ color: PURPLE }}>gratis door</span>
          <span style={{ color: PURPLE }}>.</span>
        </h1>

        {/* Body */}
        <p
          className="hero-body"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.5,
            fontWeight: 450,
            color: "#262627",
            margin: "0 auto 36px",
            textAlign: "center",
            maxWidth: 720,
          }}
        >
          Het volledig beheerde groeisysteem voor online fitness coaches in
          Nederland. Ik plaats de content, volg leads op, en boek intakes
          rechtstreeks in jouw agenda.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          <a
            href="https://cal.com/finn-ap-media/groeigesprek"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: PURPLE,
              color: "#F3F0EE",
              border: `1.5px solid ${PURPLE}`,
              borderRadius: 20,
              padding: "16px 32px",
              fontFamily: "inherit",
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: "-0.32px",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 240ms cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#2A0A4A"; e.currentTarget.style.borderColor = "#2A0A4A"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = PURPLE; e.currentTarget.style.borderColor = PURPLE; }}
          >
            Plan je gesprek
            <Arrow size={15} />
          </a>
          <a
            href="#hoe-het-werkt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              color: "#141413",
              border: "1.5px solid #141413",
              borderRadius: 20,
              padding: "16px 32px",
              fontFamily: "inherit",
              fontWeight: 450,
              fontSize: 16,
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 240ms cubic-bezier(0.4,0,0.2,1), color 240ms cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#141413"; e.currentTarget.style.color = "#F3F0EE"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#141413"; }}
          >
            Hoe het werkt
          </a>
        </div>

        <div style={{ marginBottom: 96 }} />
      </div>
    </section>
  );
}
