import { FileText, Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { GravityWrapper } from "@/components/motion/gravity-wrapper";

export function CvSection() {
  return (
    <section
      id="cv"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <SectionHeading
        eyebrow="11 · CV"
        title="Scarica il CV."
        description="Versione PDF aggiornata, pronta per recruiter o colleghi che vogliono un formato sfogliabile."
      />

      <div className="mt-12">
        <GravityWrapper intensity={1.4}>
        <a
          href="/cv/CV_Simone_Pepe_2026.pdf"
          download
          className="group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 transition-all hover:border-accent/40 hover:bg-accent-soft/20 sm:max-w-md"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 accent-glow opacity-40"
          />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
            <FileText className="h-6 w-6" />
          </span>
          <div className="relative flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="font-mono text-xs text-muted">CV_Simone_Pepe_2026.pdf</span>
            <span className="text-lg font-semibold tracking-tight">
              CV completo · PDF
            </span>
            <span className="text-xs text-muted">Aggiornato · 2026</span>
          </div>
          <Download className="relative h-5 w-5 text-muted transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-accent" />
        </a>
        </GravityWrapper>
      </div>
    </section>
  );
}
