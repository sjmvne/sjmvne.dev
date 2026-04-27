"use client";

import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { TerminalLink } from "@/components/terminal/terminal-link";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/site-data";
import { useHorizontalProjects } from "@/lib/gsap-animations";

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useHorizontalProjects(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="04 · Featured"
        title="Quattro progetti, quattro storie diverse."
        description="Dalla dashboard SAPUI5 enterprise al dispatching real-time, passando per Lamborghini e aerospace."
      />

      <ul className="projects-track mt-14 flex flex-col gap-4">
        {caseStudies.map((p, idx) => (
          <li key={p.slug} className="project-card">
            <TerminalLink
              href={`/projects/${p.slug}`}
              className="group relative flex touch-manipulation flex-col gap-5 overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99] active:border-accent/40 sm:flex-row sm:gap-8 sm:p-8 p-6"
            >
              {/* Holographic shimmer sweep */}
              <div
                aria-hidden
                className="shimmer-overlay pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 accent-glow opacity-0 transition-opacity duration-500 group-hover:opacity-60"
              />

              <div className="flex shrink-0 sm:w-48 sm:flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="ml-auto font-mono text-xs text-muted sm:ml-0 sm:mt-2">
                  {p.period}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {p.title}
                  </h2>
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <p className="text-sm leading-relaxed text-muted sm:text-base">
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
          </li>
        ))}
      </ul>
    </section>
  );
}
