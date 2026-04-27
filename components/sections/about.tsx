"use client";

import { PawPrint } from "lucide-react";
import { useRef } from "react";
import { CountUp } from "@/components/motion/count-up";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/lib/site-data";
import { useAboutParallax } from "@/lib/gsap-animations";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { getTarsifiedText } from "@/lib/tars-brain";

function parseStat(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export function AboutSection() {
  const { isInterstellarMode, humorLevel, honestyLevel } = useInterstellar();
  const sectionRef = useRef<HTMLElement>(null);
  useAboutParallax(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="01 · About"
            title={about.title}
            description={
              isInterstellarMode 
                ? getTarsifiedText("about-description", "Sto in mezzo al codice da qualche anno. Un po' per chi paga lo stipendio, un po' per cose che mi vengono in mente da solo.", humorLevel, honestyLevel)
                : "Sto in mezzo al codice da qualche anno. Un po' per chi paga lo stipendio, un po' per cose che mi vengono in mente da solo."
            }
          />
          <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="about-paragraph">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="self-start lg:sticky lg:top-24" style={{ perspective: 800 }}>
          <div className="stats-card relative overflow-hidden rounded-2xl glass-card p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 accent-glow opacity-40"
            />
            <div className="relative grid grid-cols-2 gap-x-4 gap-y-6">
              {about.stats.map((stat) => {
                const parsed = parseStat(stat.value);
                return (
                  <div key={stat.label} className="flex flex-col gap-1">
                    <span className="flex items-baseline gap-1.5 bg-gradient-to-br from-foreground to-accent bg-clip-text font-mono text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
                      <CountUp to={parsed.num} suffix={parsed.suffix} />
                      {stat.label === "Cani" && (
                        <PawPrint className="h-4 w-4 shrink-0 text-accent" />
                      )}
                    </span>
                    <span className="text-xs leading-snug text-muted">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
