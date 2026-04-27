"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef, useCallback } from "react";
import { TerminalLink } from "@/components/terminal/terminal-link";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/site-data";
import { useHorizontalProjects } from "@/lib/gsap-animations";
import { GravityWrapper } from "@/components/motion/gravity-wrapper";
import { cn } from "@/lib/utils";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { getTarsifiedText } from "@/lib/tars-brain";

// Alternating offsets to break vertical symmetry — odd cards shift right
const CARD_OFFSETS = ["ml-0", "ml-0 sm:ml-12", "ml-0", "ml-0 sm:ml-6"];

export function FeaturedProjectsSection() {
  const { isInterstellarMode, humorLevel, honestyLevel } = useInterstellar();
  const sectionRef = useRef<HTMLElement>(null);
  useHorizontalProjects(sectionRef);

  // Spotlight border: track mouse relative to each card
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
      e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="container-page relative scroll-mt-24 py-28 sm:py-40"
    >
      <SectionHeading
        eyebrow="04 · Featured"
        title="Quattro progetti, quattro storie diverse."
        description={
          isInterstellarMode 
            ? getTarsifiedText("projects-intro", "Dalla dashboard SAPUI5 enterprise al dispatching real-time, passando per Lamborghini e aerospace.", humorLevel, honestyLevel)
            : "Dalla dashboard SAPUI5 enterprise al dispatching real-time, passando per Lamborghini e aerospace."
        }
      />

      <ul className="projects-track mt-16 flex flex-col gap-5">
        {caseStudies.map((p, idx) => (
          <li
            key={p.slug}
            className={cn("project-card", CARD_OFFSETS[idx] ?? "ml-0")}
          >
            <GravityWrapper intensity={1.5}>
            <TerminalLink
              href={`/projects/${p.slug}`}
              onMouseMove={handleMouseMove}
              className={cn(
                "group spotlight-card relative flex touch-manipulation flex-col gap-5 overflow-hidden",
                "rounded-2xl glass-card transition-all sm:flex-row sm:gap-8 sm:p-8 p-6",
                "hover:border-accent/30 hover:-translate-y-1.5",
              )}
            >
              {/* Holographic shimmer sweep */}
              <div
                aria-hidden
                className="shimmer-overlay pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 accent-glow opacity-0 transition-opacity duration-500 group-hover:opacity-50"
              />

              {/* Index + period — tabular nums for precision */}
              <div className="flex shrink-0 sm:w-48 sm:flex-col">
                <span className="tabular-nums font-mono text-xs uppercase tracking-widest text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="tabular-nums ml-auto font-mono text-xs text-muted sm:ml-0 sm:mt-2">
                  {p.period}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tighter sm:text-2xl leading-tight">
                    {p.title}
                  </h2>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="text-sm leading-relaxed text-muted sm:text-base text-pretty">
                  {p.teaser}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.stack.slice(0, 6).map((s) => (
                    <Badge key={s} tone="muted">
                      {s}
                    </Badge>
                  ))}
                  {p.stack.length > 6 && (
                    <Badge tone="muted">+{p.stack.length - 6}</Badge>
                  )}
                </div>
              </div>
            </TerminalLink>
            </GravityWrapper>
          </li>
        ))}
      </ul>
    </section>
  );
}
