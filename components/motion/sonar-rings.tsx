"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Skills: SVG sonar/radar sweep that expands from the center on scroll.
 * Rings animate outward as the section enters the viewport.
 */
export function SonarRings({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const svg = svgRef.current;
    const section = sectionRef.current;
    if (!svg || !section) return;

    const rings = svg.querySelectorAll<SVGCircleElement>(".sonar-ring");

    gsap.set(rings, { scale: 0, transformOrigin: "center", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(rings, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.18,
      ease: "elastic.out(1, 0.7)",
    });

    // Continuous pulse after reveal
    const pulse = gsap.to(rings, {
      scale: 1.06,
      opacity: 0.5,
      duration: 1.8,
      stagger: 0.25,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => pulse.play(),
      onLeaveBack: () => pulse.pause(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      pulse.kill();
    };
  }, [sectionRef]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute right-[-80px] top-[-60px] h-[400px] w-[400px] opacity-20"
      viewBox="0 0 400 400"
    >
      {[160, 120, 80, 45].map((r, i) => (
        <circle
          key={i}
          className="sonar-ring"
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray={i % 2 === 0 ? "6 4" : "none"}
        />
      ))}
      {/* Sweep line */}
      <line
        className="sonar-ring"
        x1="200"
        y1="200"
        x2="200"
        y2="40"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <circle cx="200" cy="200" r="4" fill="var(--accent)" fillOpacity="0.8" />
    </svg>
  );
}
