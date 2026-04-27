"use client";

import { useRef, useState, useEffect } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups, type Skill } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSkillsReveal } from "@/lib/gsap-animations";
import * as Icons from "lucide-react";

// For mobile scroll detection
function useInCenter(ref: React.RefObject<Element | null>) {
  const [inCenter, setInCenter] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInCenter(entry.isIntersecting);
      },
      {
        // trigger when the element is within the middle 20% of the viewport height
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return inCenter;
}

function SkillNode({ skill }: { skill: Skill }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inCenter = useInCenter(nodeRef);
  
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[skill.icon] || Icons.Code;

  // The skill's level defines the "pin" color
  const pinColor = 
    skill.level === "Senior" ? "bg-accent shadow-[0_0_8px_rgba(139,92,246,0.8)]" :
    skill.level === "Working" ? "bg-foreground/50" :
    "bg-muted/30";

  return (
    <div
      ref={nodeRef}
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-xl",
        "border border-border/60 bg-surface/80 backdrop-blur-sm transition-all duration-300",
        "hover:border-accent/40 hover:bg-accent-soft/30 hover:shadow-lg hover:-translate-y-1 hover:z-10",
        // Force hover state on mobile when in center
        inCenter && "max-md:border-accent/40 max-md:bg-accent-soft/30 max-md:shadow-lg max-md:-translate-y-1 max-md:z-10"
      )}
    >
      {/* Circuit Pins */}
      <div className={cn("absolute -left-1 top-2 h-1.5 w-1.5 rounded-full transition-colors", pinColor)} />
      <div className={cn("absolute -right-1 bottom-2 h-1.5 w-1.5 rounded-full transition-colors", pinColor)} />

      <IconComponent className={cn(
        "h-6 w-6 text-muted transition-colors duration-300",
        "group-hover:text-accent",
        inCenter && "max-md:text-accent"
      )} />

      {/* Label Tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-md border border-border/80 bg-background/95 px-2.5 py-1 text-center font-mono text-[10px] whitespace-nowrap shadow-xl backdrop-blur-md",
          "opacity-0 transition-all duration-300 translate-y-2 z-20",
          "group-hover:opacity-100 group-hover:translate-y-0",
          inCenter && "max-md:opacity-100 max-md:translate-y-0"
        )}
      >
        <span className="block font-medium text-foreground">{skill.name}</span>
        <span className="block text-[9px] text-muted">{skill.level}</span>
      </div>
    </div>
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
        title="Hardware logic, digital execution."
        description="Niente superlativi. Solo gli strumenti che compongono il mio circuito operativo quotidiano, dalla fabbrica al cloud."
      />

      {/* Category tabs - "Breadboard" style */}
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

      {/* Technical Schematic Area */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/50 bg-background/50 p-6 sm:p-12">
        {/* Background circuit grid */}
        <div className="circuit-grid absolute inset-0 opacity-40 mix-blend-screen" />
        
        {/* Animated pulses */}
        <div className="absolute left-[20%] top-0 w-px h-32 bg-gradient-to-b from-transparent via-accent to-transparent data-pulse-y opacity-0" />
        <div className="absolute left-[60%] top-0 w-px h-64 bg-gradient-to-b from-transparent via-accent to-transparent data-pulse-y opacity-0" style={{ animationDelay: '1.5s' }} />
        <div className="absolute left-0 top-[30%] h-px w-64 bg-gradient-to-r from-transparent via-accent to-transparent data-pulse-x opacity-0" style={{ animationDelay: '0.5s' }} />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold tracking-tighter text-foreground/90">
              {group.label} Cluster
            </h3>
            <p className="text-sm font-mono text-muted/70">
              [{group.skills.length} nodi attivi]
            </p>
          </div>

          <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {group.skills.map((skill) => (
              <SkillNode key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
