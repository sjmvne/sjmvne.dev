"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { interests } from "@/lib/site-data";
import { useInterestExplosion } from "@/lib/gsap-animations";

export function InterestsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useInterestExplosion(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="interests"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="10 · Interests"
        title="Fuori dal codice."
        description="Poche cose, scelte bene. Quello che faccio quando il laptop è chiuso."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {interests.map((i, idx) => (
          <li
            key={i.title}
            className="interest-item flex flex-col gap-2 bg-background p-6 transition-colors hover:bg-surface/40"
          >
            <span className="font-mono text-xs text-accent">
              /{String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold tracking-tight">{i.title}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {i.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
