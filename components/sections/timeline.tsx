"use client";

import { Briefcase, GraduationCap, Rocket, Sparkles } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ComponentType } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { timeline, type TimelineItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const tagMeta: Record<
  TimelineItem["tag"],
  { icon: ComponentType<{ className?: string }>; activeColor: string }
> = {
  education: {
    icon: GraduationCap,
    activeColor:
      "text-sky-400 border-sky-500/50 bg-sky-500/10 shadow-[0_0_15px_rgba(14,165,233,0.3)]",
  },
  work: {
    icon: Briefcase,
    activeColor:
      "text-foreground border-border bg-foreground/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
  },
  project: {
    icon: Rocket,
    activeColor:
      "text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
  },
  milestone: {
    icon: Sparkles,
    activeColor:
      "text-accent border-accent/50 bg-accent-soft shadow-[0_0_15px_rgba(var(--accent),0.3)]",
  },
};

function TimelineNode({
  item,
  isLast,
}: {
  item: TimelineItem;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const meta = tagMeta[item.tag];
  const Icon = meta.icon;

  // 1. Fade-in progress: happens as the item enters the lower part of the viewport (85% to 50%)
  const { scrollYProgress: fadeProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 50%"],
  });

  // 2. Line drawing progress: happens strictly while the item's body passes the center of the viewport
  const { scrollYProgress: lineProgress } = useScroll({
    target: ref,
    offset: ["start 50%", "end 50%"],
  });

  // Smooth out the line drawing
  const pathLength = useSpring(lineProgress, {
    stiffness: 400,
    damping: 50,
  });

  // Map fade progress to styles
  const opacity = useTransform(fadeProgress, [0, 1], [0.2, 1]);
  const y = useTransform(fadeProgress, [0, 1], [20, 0]);
  const scale = useTransform(fadeProgress, [0, 1], [0.8, 1]);

  return (
    <li ref={ref} className="relative flex gap-5 sm:gap-7">
      <div className="relative flex flex-col items-center">
        {/* Node Dot */}
        <motion.div
          style={{ opacity, scale }}
          className={cn(
            "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            meta.activeColor
          )}
        >
          <Icon className="h-4 w-4" />
        </motion.div>

        {/* Connecting Line */}
        {!isLast && (
          <div className="relative w-px flex-1 mt-2 mb-2 bg-border/30">
            {/* The active drawn line */}
            <motion.div
              style={{ scaleY: pathLength }}
              className="absolute top-0 left-0 w-full h-full bg-accent origin-top"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y }}
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-1.5",
          isLast ? "pb-0" : "pb-12"
        )}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {item.year}
        </span>
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl mt-1">
          {item.title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {item.org}
        </p>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
          {item.description}
        </p>
      </motion.div>
    </li>
  );
}

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
          const isLast = idx === timeline.length - 1;
          return (
            <TimelineNode
              key={`${item.year}-${idx}`}
              item={item}
              isLast={isLast}
            />
          );
        })}
      </ol>
    </section>
  );
}
