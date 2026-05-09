"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Eyebrow from "./shared/Eyebrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SPARK = "#F37338";

const pills = ["Geen verborgen kosten", "Geen lange contracten", "Volledig op resultaat"];

export default function GuaranteeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const st = {
        trigger: sectionRef.current!,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      gsap.from(".guarantee-card", {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: st,
      });

      gsap.from(".guarantee-watermark", {
        scale: 1.3,
        opacity: 0,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: st,
      });

      gsap.from(sealRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: { ...st, start: "top 65%" },
      });

      gsap.from(".guarantee-headline", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { ...st, start: "top 65%" },
      });

      gsap.from(".guarantee-pill", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { ...st, start: "top 55%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} style={{ padding: "80px 32px 80px" }}>
      <div
        className="guarantee-card"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "#141413",
          color: "#F3F0EE",
          borderRadius: 40,
          padding: "88px 48px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Big watermark */}
        <div
          className="guarantee-watermark"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontSize: "clamp(280px, 36vw, 460px)",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            color: "rgba(243,115,56,0.06)",
            lineHeight: 0.9,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          60
        </div>

        {/* Seal */}
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div
            className="pulse-ring"
            style={{
              position: "absolute",
              inset: -8,
              borderRadius: "50%",
              background: `${SPARK}22`,
              width: "calc(100% + 16px)",
              height: "calc(100% + 16px)",
              top: -8,
              left: -8,
            }}
          />
          <div
            ref={sealRef}
            style={{
              position: "relative",
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: SPARK,
              color: "#141413",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.04em",
              textAlign: "center",
              lineHeight: 1.1,
              padding: 12,
            }}
          >
            GARANTIE OF GRATIS
          </div>
        </div>

        <Eyebrow center color="#F3F0EE" dot={SPARK}>
          De garantie
        </Eyebrow>

        <h2
          className="guarantee-headline"
          style={{
            fontSize: "clamp(48px, 7vw, 96px)",
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            color: "#F3F0EE",
            margin: "24px 0 24px",
            position: "relative",
          }}
        >
          10 intakegesprekken
          <br />
          in <span style={{ color: SPARK }}>60 dagen.</span>
        </h2>

        <p
          style={{
            fontSize: 22,
            lineHeight: 1.4,
            fontWeight: 500,
            color: "#F3F0EE",
            margin: "0 auto 16px",
            maxWidth: 720,
            position: "relative",
          }}
        >
          Gegarandeerd — of ik werk gratis door totdat je ze hebt.
        </p>

        <p
          style={{
            fontSize: 17,
            lineHeight: 1.5,
            fontWeight: 450,
            color: "rgba(243,240,238,0.7)",
            margin: "0 auto 36px",
            maxWidth: 600,
            position: "relative",
          }}
        >
          Jij draagt nul risico. Ik stop niet totdat je succesvol bent.
        </p>

        <div
          style={{
            display: "inline-flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {pills.map((t) => (
            <span
              key={t}
              className="guarantee-pill"
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(243,240,238,0.08)",
                color: "#F3F0EE",
                fontSize: 13,
                fontWeight: 500,
                border: "1px solid rgba(243,240,238,0.15)",
              }}
            >
              ✓ {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
