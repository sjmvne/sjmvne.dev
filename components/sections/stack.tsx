"use client";

import {
  SiAnthropic,
  SiBlender,
  SiClaude,
  SiGit,
  SiGnubash,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiJquery,
  SiLinux,
  SiLodash,
  SiMqtt,
  SiMysql,
  SiNextdotjs,
  SiPerplexity,
  SiPostman,
  SiReact,
  SiSap,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
} from "@icons-pack/react-simple-icons";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  stackCategories,
  type StackIconKey,
} from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { useFloatingDrift } from "@/lib/gsap-animations";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

const iconMap: Record<Exclude<StackIconKey, null>, IconComp> = {
  sap: SiSap,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  wordpress: SiWordpress,
  mysql: SiMysql,
  anthropic: SiAnthropic,
  claude: SiClaude,
  perplexity: SiPerplexity,
  blender: SiBlender,
  git: SiGit,
  bash: SiGnubash,
  linux: SiLinux,
  postman: SiPostman,
  jquery: SiJquery,
  lodash: SiLodash,
  mqtt: SiMqtt,
};

function FloatingItem({
  item,
  idx,
}: {
  item: { name: string; icon?: StackIconKey | null };
  idx: number;
}) {
  const ref = useFloatingDrift(idx);
  const Icon = item.icon ? iconMap[item.icon] : null;

  return (
    <li
      ref={ref}
      className={cn(
        "group flex items-center gap-2.5 rounded-lg border border-transparent bg-transparent px-2.5 py-1.5 font-mono text-xs",
        "text-foreground/90 transition-colors",
        "hover:border-accent/30 hover:bg-accent-soft/50 hover:text-accent",
      )}
    >
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
      ) : (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-[9px] font-semibold uppercase text-muted transition-colors group-hover:border-accent/40 group-hover:bg-accent-soft group-hover:text-accent">
          {item.name.charAt(0)}
        </span>
      )}
      <span>{item.name}</span>
    </li>
  );
}

export function StackSection() {
  return (
    <section
      id="stack"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="07 · Stack"
          title="Strumenti del mestiere."
          description="Raggruppati per area. Solo quello che tocco davvero in produzione, nei progetti reali o nei miei tool personali."
        />
      </Reveal>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {stackCategories.map((cat, catIdx) => (
          <Reveal
            key={cat.id}
            delay={catIdx * 0.05}
            y={16}
            className="flex flex-col gap-4 bg-background p-6 transition-colors hover:bg-surface/40"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {cat.label}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {cat.items.map((item, itemIdx) => (
                <FloatingItem
                  key={item.name}
                  item={item}
                  idx={catIdx * 10 + itemIdx}
                />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
