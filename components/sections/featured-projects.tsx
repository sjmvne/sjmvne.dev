import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { caseStudies } from "@/lib/site-data";

export function FeaturedProjectsSection() {
  return (
    <section
      id="projects"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="04 · Featured"
          title="Quattro progetti, quattro storie diverse."
          description="Dalla dashboard SAPUI5 enterprise al dispatching real-time, passando per Lamborghini e aerospace."
        />
      </Reveal>

      <ul className="mt-14 flex flex-col gap-4">
        {caseStudies.map((p, idx) => (
          <Reveal as="li" key={p.slug} delay={idx * 0.08} y={20}>
            <Link
              href={`/projects/${p.slug}`}
              className="group relative flex touch-manipulation flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all hover:border-accent/40 hover:bg-accent-soft/30 active:scale-[0.99] active:border-accent/40 active:bg-accent-soft/30 sm:flex-row sm:gap-8 sm:p-8"
            >
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

              <div className="relative flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {p.client}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {p.title}
                </h3>
                <p className="text-base text-muted">{p.teaser}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
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
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
