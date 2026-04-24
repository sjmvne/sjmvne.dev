"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { levelTone, skillGroups, type SkillLevel } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const levels: SkillLevel[] = ["Senior", "Working", "Familiar"];

export function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const group = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0];

  return (
    <section
      id="skills"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="03 · Skills"
        title="Mappa tecnica, livelli onesti."
        description="Niente superlativi. Ogni voce ha un grado reale basato su anni di progetti in produzione, non su corsi guardati a metà."
      />

      <div className="mt-10 flex flex-wrap gap-2 font-mono text-xs">
        {levels.map((lvl) => (
          <span
            key={lvl}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
              levelTone[lvl],
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {lvl}
          </span>
        ))}
      </div>

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
                "transition-colors duration-200 active:scale-[0.97]",
                active
                  ? "border-accent/40 bg-accent-soft text-accent shadow-sm shadow-accent/10"
                  : "border-border bg-surface/40 text-muted hover:border-accent/30 hover:bg-accent-soft/40 hover:text-foreground",
              )}
            >
              {g.label}
              <span
                className={cn(
                  "ml-2 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[10px] transition-colors",
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

      <div className="mt-8">
        <div className="mb-6 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold tracking-tight">
            {group.label}
          </h3>
          <p className="text-sm text-muted">{group.description}</p>
        </div>

        <ul
          key={group.id}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {group.skills.map((skill) => (
            <li
              key={skill.name}
              className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-surface/40 p-4 transition-colors hover:border-accent/30 hover:bg-accent-soft/30"
            >
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-medium">{skill.name}</span>
                {skill.note && (
                  <span className="text-xs leading-snug text-muted">
                    {skill.note}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                  levelTone[skill.level],
                )}
              >
                {skill.level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
