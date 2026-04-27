import { Award, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="06 · Certs"
          title="Certificazioni"
          description="Badge Dassault Systèmes presi tra ottobre e novembre 2025 e percorso di Engineering Claude."
        />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {certifications.map((c, idx) => {
          const earned = c.status === "earned";
          const Icon = earned ? Award : Clock;
          return (
            <Reveal
              as="li"
              key={c.title}
              delay={idx * 0.08}
              y={16}
              className={cn(
                "group relative flex items-start gap-4 rounded-2xl p-5 transition-all",
                earned
                  ? "border border-border bg-surface/40 hover:border-accent/40 hover:bg-accent-soft/20"
                  : "border-2 border-dashed border-accent/50 bg-accent-soft/10",
              )}
            >
              {!earned && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 accent-glow opacity-30"
                />
              )}
              <span
                className={cn(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                  earned
                    ? "border-accent/30 bg-accent-soft text-accent"
                    : "border-accent/40 bg-accent-soft text-accent",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="relative flex min-w-0 flex-col gap-1">
                <h3 className="text-base font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="font-mono text-xs text-muted">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
