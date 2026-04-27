"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Contact: concentric ripple / signal rings that pulse outward from a fixed origin.
 * Inspired by real sonar / radio transmitter visualizations.
 */
export function SignalWaves({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const waves = svg.querySelectorAll<SVGCircleElement>(".signal-wave");

    gsap.set(waves, { scale: 0, transformOrigin: "center", opacity: 0 });

    ScrollTrigger.create({
      trigger: section,
      start: "top 65%",
      onEnter: () => {
        waves.forEach((wave, i) => {
          gsap.to(wave, {
            scale: 1,
            opacity: 0,
            duration: 2.4,
            delay: i * 0.6,
            ease: "power2.out",
            repeat: -1,
            transformOrigin: "center",
          });
          gsap.set(wave, { opacity: 0.7 });
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((s) => s.kill());
  }, [sectionRef]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
      width="500"
      height="500"
      viewBox="0 0 500 500"
    >
      {[50, 100, 150, 200, 250].map((r, i) => (
        <circle
          key={i}
          className="signal-wave"
          cx="250"
          cy="250"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
      ))}
      <circle cx="250" cy="250" r="5" fill="var(--accent)" fillOpacity="0.9" />
    </svg>
  );
}
