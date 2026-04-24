import { Briefcase, GraduationCap, Rocket, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { timeline, type TimelineItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const tagMeta: Record<
  TimelineItem["tag"],
  { icon: ComponentType<{ className?: string }>; color: string }
> = {
  education: {
    icon: GraduationCap,
    color: "text-sky-400 border-sky-500/40 bg-sky-500/10",
  },
  work: {
    icon: Briefcase,
    color: "text-foreground/90 border-border bg-surface",
  },
  project: {
    icon: Rocket,
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  },
  milestone: {
    icon: Sparkles,
    color: "text-accent border-accent/50 bg-accent-soft",
  },
};

export function TimelineSection() {
  return (
    <section
      id="timeline"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="02 · Percorso"
          title="Dove sono passato."
          description="Dalla scuola al primo stage, dal primo ABAP alla lead maintainership su una codebase SAPUI5 da 900 commit."
        />
      </Reveal>

      <ol className="relative mt-16">
        {timeline.map((item, idx) => {
          const meta = tagMeta[item.tag];
          const Icon = meta.icon;
          const isLast = idx === timeline.length - 1;
          return (
            <Reveal
              key={`${item.year}-${idx}`}
              as="li"
              delay={idx * 0.06}
              y={20}
              className="relative flex gap-5 sm:gap-7"
            >
              <div className="relative flex flex-col items-center">
                  <span
                    className={cn(
                      "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border",
                      meta.color,
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="-mt-1 w-px flex-1 bg-gradient-to-b from-border via-border to-border/30"
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "flex min-w-0 flex-1 flex-col gap-1.5",
                    isLast ? "pb-0" : "pb-12",
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {item.org}
                  </p>
                  <p className="mt-1 max-w-2xl text-base leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
