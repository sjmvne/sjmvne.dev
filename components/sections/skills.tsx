"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups, type SkillLevel, type Skill } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSkillsReveal } from "@/lib/gsap-animations";
import * as LucideIcons from "lucide-react";
import {
  SiSap,
  SiDassaultsystemes,
  SiJavascript,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
  SiWordpress,
  SiJson,
  SiMqtt,
  SiBlender,
  SiAnthropic,
  SiPerplexity
} from "@icons-pack/react-simple-icons";

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
            i <= filled ? "bg-accent shadow-[0_0_8px_rgba(139,92,246,0.6)]" : "bg-muted opacity-30",
          )}
          style={{ height: `${5 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

const skillToSimpleIcon: Record<string, any> = {
  "SAPUI5": SiSap,
  "SAP MII": SiSap,
  "SAP PCo": SiSap,
  "SAP HANA": SiSap,
  "ABAP": SiSap,
  "DELMIA Apriso": SiDassaultsystemes,
  "JavaScript ES6": SiJavascript,
  "HTML / CSS": SiHtml5,
  "React / Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "WordPress": SiWordpress,
  "REST / JSON APIs": SiJson,
  "MQTT": SiMqtt,
  "Blender": SiBlender,
  "Anthropic API": SiAnthropic,
  "Perplexity API": SiPerplexity,
};

function SkillChip({ skill }: { skill: Skill }) {
  // Use SimpleIcon if mapped, otherwise fallback to Lucide from site-data
  const IconComponent = skillToSimpleIcon[skill.name] || (LucideIcons as any)[skill.icon] || LucideIcons.Code;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-3 rounded-[5px]",
        "border border-border/80 bg-surface/90 backdrop-blur-md transition-all duration-300",
        "hover:border-accent/60 hover:bg-surface hover:shadow-[0_4px_16px_rgba(139,92,246,0.15)] hover:-translate-y-0.5",
      )}
    >
      {/* Top section: Icon and SignalBars */}
      <div className="flex items-start justify-between w-full mb-3">
        <div className="p-1.5 rounded bg-background/50 border border-border/50 text-muted group-hover:text-accent group-hover:border-accent/30 transition-colors">
          <IconComponent className="h-4 w-4" />
        </div>
        <SignalBars level={skill.level} />
      </div>

      {/* Bottom section: Text */}
      <div className="mt-auto">
        <h4 className="font-mono text-xs sm:text-[13px] font-semibold text-foreground/90 tracking-tight line-clamp-1">
          {skill.name.toUpperCase()}
        </h4>
        {skill.note && (
          <p className="font-mono text-[9px] text-muted/60 mt-0.5 truncate">
            {skill.note.toUpperCase()}
          </p>
        )}
      </div>

      {/* Chip Pins (Visual detail) */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <div className="w-1 h-1.5 bg-border rounded-r-sm" />
        <div className="w-1 h-1.5 bg-border rounded-r-sm" />
        <div className="w-1 h-1.5 bg-border rounded-r-sm" />
      </div>
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <div className="w-1 h-1.5 bg-border rounded-l-sm" />
        <div className="w-1 h-1.5 bg-border rounded-l-sm" />
        <div className="w-1 h-1.5 bg-border rounded-l-sm" />
      </div>
    </div>
  );
}

export function SkillsSection() {
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
        title="Logic Board."
        description="Il mio intero ecosistema tecnologico mappato su un'unica motherboard. Dai componenti core in fabbrica (MES) ai co-processori cloud e AI."
      />

      {/* Legend */}
      <div className="mt-10 flex flex-wrap gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs">
        {levels.map((lvl) => (
          <div key={lvl} className="flex items-center gap-2">
            <SignalBars level={lvl} />
            <span className="text-muted/80 uppercase tracking-widest">{lvl}</span>
          </div>
        ))}
      </div>

      {/* Unified Motherboard Container */}
      <div className="relative mt-12 overflow-hidden rounded-3xl border-2 border-border/60 bg-[#0a0a0c] p-4 sm:p-8 md:p-12 shadow-2xl">
        {/* Background circuit grid */}
        <div className="circuit-grid absolute inset-0 opacity-100" />
        
        {/* Animated pulses */}
        <div className="absolute left-[20%] top-0 w-[2px] h-32 bg-gradient-to-b from-transparent via-accent to-transparent data-pulse-y opacity-0 z-0" />
        <div className="absolute left-[60%] top-0 w-[2px] h-64 bg-gradient-to-b from-transparent via-accent to-transparent data-pulse-y opacity-0 z-0" style={{ animationDelay: '1.5s' }} />
        <div className="absolute left-0 top-[40%] h-[2px] w-64 bg-gradient-to-r from-transparent via-accent to-transparent data-pulse-x opacity-0 z-0" style={{ animationDelay: '0.5s' }} />
        <div className="absolute left-0 top-[70%] h-[2px] w-96 bg-gradient-to-r from-transparent via-accent to-transparent data-pulse-x opacity-0 z-0" style={{ animationDelay: '2.5s' }} />

        <div className="relative z-10 flex flex-col gap-8 sm:gap-12">
          {skillGroups.map((group) => (
            <div key={group.id} className="relative">
              <div className="p-2 sm:p-4">
                {/* Zone Label */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-[2px] w-8 bg-accent/40" />
                  <h3 className="font-mono text-sm sm:text-base text-accent tracking-widest uppercase">
                    [ ZONE: {group.id} ]
                  </h3>
                  <div className="h-[2px] flex-grow bg-accent/10" />
                </div>

                {/* Chips Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {group.skills.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
