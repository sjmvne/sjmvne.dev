"use client";

import { ArrowUpRight, Camera } from "lucide-react";
import Link from "next/link";
import { TerminalLink } from "@/components/terminal/terminal-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { GravityWrapper } from "@/components/motion/gravity-wrapper";

const placeholders = Array.from({ length: 6 }, (_, i) => i);

export function PhotographySection() {
  return (
    <section
      id="photography"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="09 · Photo"
        title="Fotografia."
        description="Reportage di viaggio, architettura urbana, ritratti di due cani che non stanno fermi. Lightroom + Photoshop in post."
      />

      <div className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {placeholders.map((i) => (
          <GravityWrapper key={i} intensity={0.8 + Math.random() * 0.5}>
          <div
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-surface"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-hi/5" />
            <div className="absolute inset-0 bg-dotgrid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-8 w-8 text-muted/40" />
            </div>
            <span className="absolute bottom-2 left-2 font-mono text-[10px] text-muted/60">
              IMG_{String(i + 1).padStart(3, "0")}
            </span>
          </div>
          </GravityWrapper>
        ))}
      </div>

      <div className="mt-8">
        <TerminalLink
          href="/photo"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm text-foreground transition-all hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
        >
          <span>Apri la galleria completa</span>
          <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </TerminalLink>
      </div>
    </section>
  );
}
