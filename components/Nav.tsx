"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Arrow from "./shared/Arrow";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
    });
  }, { scope: navRef });

  return (
    <div
      style={{
        position: "fixed",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        width: "min(1240px, calc(100% - 24px))",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        ref={navRef}
        className="nav-pill"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "10px 14px 10px 20px",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRadius: 999,
          boxShadow: scrolled
            ? "0 8px 32px 0 rgba(0,0,0,0.10)"
            : "0 4px 24px 0 rgba(0,0,0,0.05)",
          transition: "box-shadow 240ms cubic-bezier(0.4,0,0.2,1), background 240ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div className="nav-logo" style={{ display: "inline-flex", alignItems: "center" }}>
          <Image
            src="/assets/logo-web.png"
            alt="A&P Media"
            width={113}
            height={53}
            style={{ height: 53, width: "auto", display: "block", objectFit: "contain" }}
            priority
          />
        </div>

        <a
          href="https://cal.com/finn-ap-media/groeigesprek"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#3B0F66",
            color: "#F3F0EE",
            border: "1.5px solid #3B0F66",
            borderRadius: 20,
            padding: "12px 24px",
            fontFamily: "inherit",
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: "-0.32px",
            cursor: "pointer",
            textDecoration: "none",
            transition: "background 240ms cubic-bezier(0.4,0,0.2,1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2A0A4A")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3B0F66")}
        >
          Boek een gesprek
          <Arrow size={14} />
        </a>
      </div>
    </div>
  );
}
