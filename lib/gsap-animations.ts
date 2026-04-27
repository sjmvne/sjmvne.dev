"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  GSAP Animation Engine — sjmvne.dev
 *  Every section gets its own premium, scroll-driven animation.
 *  Uses @gsap/react useGSAP() for proper React cleanup.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useRef, useCallback, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Shared: respect reduced motion ──────────────────────────────
function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ═══════════════════════════════════════════════════════════════════
// 1. HERO — Cinematic text reveal, word by word
// ═══════════════════════════════════════════════════════════════════
export function useHeroTextReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      // Stagger the .hero-reveal elements with a custom cinematic timeline
      const items = el.querySelectorAll(".hero-reveal");
      gsap.set(items, { opacity: 0, y: 30, filter: "blur(8px)" });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      });
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2. ABOUT — Stats counter with parallax card
// ═══════════════════════════════════════════════════════════════════
export function useAboutParallax(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      // Paragraphs reveal from left with stagger
      const paragraphs = el.querySelectorAll(".about-paragraph");
      gsap.fromTo(
        paragraphs,
        { opacity: 0, x: -40, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stats card floats up with a subtle 3D rotation
      const card = el.querySelector(".stats-card");
      if (card) {
        gsap.fromTo(
          card,
          { y: 60, rotateX: 8, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 3. FEATURED PROJECTS — Horizontal scroll gallery (pinned)
// ═══════════════════════════════════════════════════════════════════
export function useHorizontalProjects(
  containerRef: RefObject<HTMLElement | null>
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const track = el.querySelector<HTMLElement>(".projects-track");
      if (!track) return;

      const cards = track.querySelectorAll<HTMLElement>(".project-card");
      if (cards.length === 0) return;

      // Each card gets a staggered entrance
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Holographic shimmer on each card
      cards.forEach((card) => {
        const shimmer = card.querySelector<HTMLElement>(".shimmer-overlay");
        if (!shimmer) return;
        gsap.set(shimmer, { xPercent: -100, opacity: 0 });

        card.addEventListener("mouseenter", () => {
          gsap.to(shimmer, {
            xPercent: 100,
            opacity: 0.6,
            duration: 0.8,
            ease: "power2.inOut",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(shimmer, {
            xPercent: -100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          });
        });
      });
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4. SKILLS — Staggered grid reveal with "typewriter" feel
// ═══════════════════════════════════════════════════════════════════
export function useSkillsReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll(".skill-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: {
            each: 0.04,
            grid: "auto",
            from: "start",
          },
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5. SIDE PROJECTS — Magnetic 3D tilt cards
// ═══════════════════════════════════════════════════════════════════
export function useMagneticCard(strength = 0.2) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const card = cardRef.current;
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", {
        duration: 0.5,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(card, "y", {
        duration: 0.5,
        ease: "power3.out",
      });
      const rotYTo = gsap.quickTo(card, "rotateY", {
        duration: 0.5,
        ease: "power3.out",
      });
      const rotXTo = gsap.quickTo(card, "rotateX", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        xTo(dx * strength);
        yTo(dy * strength);
        rotYTo((dx / rect.width) * 10);
        rotXTo(-(dy / rect.height) * 10);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        rotYTo(0);
        rotXTo(0);
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    },
    { scope: cardRef }
  );

  return cardRef;
}

// ═══════════════════════════════════════════════════════════════════
// 6. STACK — Floating drift per icon
// ═══════════════════════════════════════════════════════════════════
export function useFloatingDrift(index: number) {
  const ref = useRef<HTMLLIElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      gsap.to(el, {
        y: -(3 + (index % 3) * 2),
        duration: 2.5 + (index % 5) * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: (index * 0.7) % 2.5,
      });
    },
    { scope: ref }
  );

  return ref;
}

// ═══════════════════════════════════════════════════════════════════
// 7. INTERESTS — Explosion from center
// ═══════════════════════════════════════════════════════════════════
export function useInterestExplosion(
  containerRef: RefObject<HTMLElement | null>
) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll(".interest-item");
      gsap.fromTo(
        items,
        { scale: 0.7, opacity: 0, y: 30, rotation: -4 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          stagger: { each: 0.12, from: "center" },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 8. CONTACT — Pulsing signal waves
// ═══════════════════════════════════════════════════════════════════
export function useSignalPulse(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      const waves = el.querySelectorAll(".signal-wave");
      if (waves.length === 0) return;

      gsap.set(waves, { scale: 0, transformOrigin: "center", opacity: 0 });

      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        onEnter: () => {
          waves.forEach((wave, i) => {
            gsap.fromTo(
              wave,
              { scale: 0.3, opacity: 0.7 },
              {
                scale: 1,
                opacity: 0,
                duration: 2.5,
                delay: i * 0.5,
                ease: "power1.out",
                repeat: -1,
              }
            );
          });
        },
      });

      // Contact cards fly in
      const cards = el.querySelectorAll(".contact-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );
}

// ═══════════════════════════════════════════════════════════════════
// 9. SECTION HEADING — Universal text reveal
// ═══════════════════════════════════════════════════════════════════
export function useSectionReveal(containerRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = containerRef.current;
      if (!el) return;

      // Eyebrow line
      const eyebrow = el.querySelector(".section-eyebrow");
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { width: 0, opacity: 0 },
          {
            width: "100%",
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );
}
