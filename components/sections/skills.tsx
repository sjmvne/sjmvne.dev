"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups, type SkillLevel, type Skill } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useSkillsReveal } from "@/lib/gsap-animations";
import { GravityWrapper } from "@/components/motion/gravity-wrapper";
import * as LucideIcons from "lucide-react";
import {
  SiSap,
  SiDassaultsystemes,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiWordpress,
  SiJquery,
  SiLodash,
  SiJson,
  SiMqtt,
  SiBlender,
  SiAnthropic,
  SiPerplexity,
  SiGit,
  SiLinux,
  SiGnubash,
  SiPostman,
  SiMysql,
  SiVscodium,
  SiDatagrip,
  SiGooglegemini,
  SiOllama
} from "@icons-pack/react-simple-icons";

const levels: SkillLevel[] = ["Mastery", "Fluent", "Competent", "Exploring"];

// Bar widths per level for the "signal strength" indicator
const levelBar: Record<SkillLevel, number> = {
  Mastery: 3,
  Fluent: 2,
  Competent: 1,
  Exploring: 0,
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
  // MES / ERP
  "SAPUI5": SiSap,
  "SAP MII": SiSap,
  "SAP ME": SiSap,
  "SAP PCo": SiSap,
  "ABAP": SiSap,
  "HANA": SiSap,
  "Apriso": SiDassaultsystemes,
  
  // Frontend
  "JS ES6": SiJavascript,
  "TS": SiTypescript,
  "HTML/CSS": SiCss,
  "React/Next": SiNextdotjs,
  "Tailwind": SiTailwindcss,
  "WordPress": SiWordpress,
  "jQuery": SiJquery,
  "Lodash": SiLodash,

  // Backend / Data
  "SQL Server": SiDatagrip,
  "MySQL": SiMysql,
  "REST APIs": SiJson,
  "MQTT": SiMqtt,
  
  // AI / LLM
  "Gemini": SiGooglegemini,
  "Ollama": SiOllama,
  "Perplexity": SiPerplexity,
  "Claude Code": SiAnthropic,
  
  // Design
  "Blender": SiBlender,

  // Dev Tools
  "Git": SiGit,
  "Linux": SiLinux,
  "Bash": SiGnubash,
  "VS Code": SiVscodium,
  "Postman": SiPostman,
};

function SkillChip({ skill }: { skill: Skill }) {
  // Use SimpleIcon if mapped, otherwise fallback to Lucide from site-data
  const IconComponent = skillToSimpleIcon[skill.name] || (LucideIcons as any)[skill.icon] || LucideIcons.Code;

  return (
    <GravityWrapper>
      <div
        className={cn(
        "group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-[5px]",
        "border border-border/80 bg-surface p-2 text-center shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_4px_16px_rgba(139,92,246,0.15)]",
      )}
    >
      {/* Chip Pins */}
      <div className="absolute -left-[2px] top-1/2 flex -translate-y-1/2 flex-col gap-[3px]">
        <div className="h-1.5 w-[3px] rounded-r-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
        <div className="h-1.5 w-[3px] rounded-r-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
        <div className="h-1.5 w-[3px] rounded-r-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
      </div>
      <div className="absolute -right-[2px] top-1/2 flex -translate-y-1/2 flex-col gap-[3px]">
        <div className="h-1.5 w-[3px] rounded-l-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
        <div className="h-1.5 w-[3px] rounded-l-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
        <div className="h-1.5 w-[3px] rounded-l-sm bg-border/80 group-hover:bg-accent/40 transition-colors" />
      </div>

      <IconComponent className="h-5 w-5 text-muted transition-colors group-hover:text-accent sm:h-6 sm:w-6" />
      <span className="line-clamp-2 px-1 font-mono text-[10px] leading-tight text-foreground/80 sm:text-[11px]">
        {skill.name}
      </span>

      <div className="absolute right-1 top-1">
        <SignalBars level={skill.level} />
      </div>
    </div>
    </GravityWrapper>
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

      {/* Signal Legend - Moved to the top */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border border-accent/10 bg-surface/30 p-4 sm:p-6">
        <div className="flex w-full items-center justify-center gap-2 mb-2 sm:w-auto sm:mb-0">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Livello Affinità:
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3">
            <SignalBars level="Mastery" />
            <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground/70">
              Mastery
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SignalBars level="Fluent" />
            <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground/70">
              Fluent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SignalBars level="Competent" />
            <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground/70">
              Competent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <SignalBars level="Exploring" />
            <span className="font-mono text-[10px] uppercase tracking-tighter text-foreground/70">
              Exploring
            </span>
          </div>
        </div>
      </div>

      {/* Unified Motherboard Container */}
      <div className="relative mt-8 overflow-hidden rounded-3xl border-2 border-border/60 bg-[#0a0a0c] p-4 sm:p-8 md:p-12 shadow-2xl">
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
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-6 bg-accent/30" />
                  <h3 className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">
                    [ AREA: {group.label} ]
                  </h3>
                  <div className="h-[1px] flex-grow bg-accent/10" />
                </div>

                {/* Chips Grid */}
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {group.skills.map((skill) => (
                    <SkillChip key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Morse code hint: S T A Y */}
      <div className="mt-12 flex justify-center pointer-events-none">
        <span className="font-mono text-sm tracking-[0.6em] bg-gradient-to-r from-muted/20 via-accent/80 to-muted/20 bg-[length:200%_auto] bg-clip-text text-transparent animate-[shimmer_4s_linear_infinite] select-none">
          ... - .- -.--
        </span>
      </div>
    </section>
  );
}
