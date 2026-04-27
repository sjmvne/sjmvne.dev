"use client";

import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { levelTone, skillGroups, type SkillLevel } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSkillsReveal } from "@/lib/gsap-animations";

const levels: SkillLevel[] = ["Senior", "Working", "Familiar", "Exposure"];

// Bar widths per level for the "signal strength" indicator
const levelBar: Record<SkillLevel, number> = {
  Senior: 3,
  Working: 2,
  Familiar: 1,
  Exposure: 0,
};

function SignalBars({ level }: { level: SkillLevel }) {
  const filled = levelBar[level];
  return (
    <span className="flex items-end gap-[3px]" aria-label={level}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-[1px] transition-colors duration-300",
            i <= filled ? "bg-current" : "bg-current opacity-20",
          )}
          style={{ height: `${5 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];
  const sectionRef = useRef<HTMLElement>(null);
  useSkillsReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="container-page relative scroll-mt-24 overflow-hidden py-28 sm:py-40"
    >
      <SectionHeading
        eyebrow="03 · Skills"
        title="Mappa tecnica, livelli onesti."
        description="Niente superlativi. Ogni voce ha un grado reale basato su anni di progetti in produzione, non su corsi guardati a metà."
      />

      {/* Legend */}
      <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs">
        {levels.map((lvl) => (
          <span
            key={lvl}
            className={cn(
              "inline-flex items-center gap-2 rounded-md border px-3 py-1.5",
              levelTone[lvl],
            )}
          >
            <SignalBars level={lvl} />
            {lvl}
          </span>
        ))}
      </div>

      {/* Category tabs */}
      <nav className="mt-10 flex flex-wrap gap-2" aria-label="Categorie skill">
        {skillGroups.map((g) => {
          const active = g.id === activeId;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActiveId(g.id)}
              aria-pressed={active}
              className={cn(
                "relative touch-manipulation rounded-full border px-4 py-2 text-sm font-medium",
                "transition-all duration-200 active:scale-[0.97]",
                active
                  ? "border-accent/40 bg-accent-soft text-accent shadow-sm"
                  : "border-border bg-surface/40 text-muted hover:border-accent/30 hover:bg-accent-soft/40 hover:text-foreground",
              )}
            >
              {g.label}
              <span
                className={cn(
                  "ml-2 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors tabular-nums",
                  active
                    ? "bg-accent/20 text-accent"
                    : "bg-border/60 text-muted",
                )}
              >
                {g.skills.length}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bento grid — "control panel" feel */}
      <div className="mt-10">
        <div className="mb-6 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold tracking-tighter">
            {group.label}
          </h3>
          <p className="text-sm text-muted text-pretty">{group.description}</p>
        </div>

        <ul
          key={group.id}
          className="grid gap-px rounded-2xl overflow-hidden border border-border/60 bg-border/40 sm:grid-cols-2 lg:grid-cols-3"
        >
          {group.skills.map((skill) => (
            <li
              key={skill.name}
              className={cn(
                "skill-item group relative flex items-center justify-between gap-4 p-4",
                "bg-surface/80 backdrop-blur-sm transition-all duration-200",
                "hover:bg-accent-soft/30",
              )}
            >
              {/* Subtle left accent bar */}
              <span
                className={cn(
                  "absolute left-0 top-3 bottom-3 w-[2px] rounded-r-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  "bg-accent",
                )}
              />
              <div className="flex min-w-0 flex-col gap-0.5 pl-3">
                <span className="font-medium text-sm tracking-tight">{skill.name}</span>
                {skill.note && (
                  <span className="text-xs leading-snug text-muted">
                    {skill.note}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider",
                  levelTone[skill.level],
                )}
              >
                <SignalBars level={skill.level} />
                {skill.level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
