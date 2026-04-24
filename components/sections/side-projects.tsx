import { ArrowUpRight, CircleDashed, Clock, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { sideProjects, type ProjectStatus } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const statusMeta: Record<
  ProjectStatus,
  { icon: ComponentType<{ className?: string }>; label: string; color: string }
> = {
  live: {
    icon: Sparkles,
    label: "Live",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  "in-progress": {
    icon: Clock,
    label: "In progress",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  planning: {
    icon: CircleDashed,
    label: "Planning",
    color: "text-muted border-border bg-surface/40",
  },
  personal: {
    icon: Lock,
    label: "Uso personale",
    color: "text-muted border-border bg-surface/60",
  },
  archived: {
    icon: CircleDashed,
    label: "Legacy · rewrite",
    color: "text-muted border-border bg-surface/40",
  },
};

export function SideProjectsSection() {
  return (
    <section
      id="side-projects"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="05 · Side"
          title="Progetti miei, fuori orario."
          description="Digital agency, strumenti AI, piccole app. Cose nate da problemi miei, che poi qualcuna è finita anche utile ad altri."
        />
      </Reveal>

      <ul className="mt-14 grid gap-4 md:grid-cols-2">
        {sideProjects.map((p, idx) => {
          const meta = statusMeta[p.status ?? "in-progress"];
          const Icon = meta.icon;
          return (
            <Reveal as="li" key={p.slug} delay={idx * 0.07} y={20}>
              <Link
                href={`/projects/${p.slug}`}
                className="group relative flex h-full touch-manipulation flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all hover:border-accent/40 hover:bg-accent-soft/30 active:scale-[0.99] active:border-accent/40 active:bg-accent-soft/30"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 accent-glow opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {p.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        meta.color,
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      {meta.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                </div>

                <div className="relative flex min-w-0 flex-1 flex-col gap-2">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {p.teaser}
                  </p>
                </div>

                <div className="relative flex flex-wrap gap-1.5">
                  {p.stack.slice(0, 5).map((s) => (
                    <Badge key={s} tone="muted">
                      {s}
                    </Badge>
                  ))}
                  {p.stack.length > 5 && (
                    <Badge tone="muted">+{p.stack.length - 5}</Badge>
                  )}
                </div>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
