"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: footerRef.current!, start: "top 95%", toggleActions: "play none none none" },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="footer-inner" style={{ background: "#141413", color: "#F3F0EE", padding: "56px 32px 32px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="footer-top" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: "4px 10px" }}>
            <Image src="/assets/logo-web.png" alt="A&P Media" width={85} height={40} style={{ height: 40, width: "auto", display: "block", objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", gap: 24, fontSize: 14, color: "rgba(243,240,238,0.75)", flexWrap: "wrap" }}>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F0EE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,240,238,0.75)")}>
              Privacy
            </a>
            <a href="/algemene-voorwaarden" style={{ color: "inherit", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F3F0EE")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,240,238,0.75)")}>
              Algemene voorwaarden
            </a>
          </div>
        </div>

        <div style={{ paddingTop: 24, borderTop: "1px solid rgba(243,240,238,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(243,240,238,0.5)" }}>
          <div>© 2026 A&amp;P Media — Articulate Words, Purposeful Impact.</div>
          <div>Gemaakt voor coaches in Nederland.</div>
        </div>
      </div>
    </footer>
  );
}
