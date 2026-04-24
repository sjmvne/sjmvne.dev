import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { interests } from "@/lib/site-data";

export function InterestsSection() {
  return (
    <section
      id="interests"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="11 · Interests"
          title="Fuori dal codice."
          description="Poche cose, scelte bene. Quello che faccio quando il laptop è chiuso."
        />
      </Reveal>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {interests.map((i, idx) => (
          <Reveal
            as="li"
            key={i.title}
            delay={idx * 0.08}
            y={16}
            className="flex flex-col gap-2 bg-background p-6 transition-colors hover:bg-surface/40"
          >
            <span className="font-mono text-xs text-accent">
              /{String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-semibold tracking-tight">{i.title}</h3>
            <p className="text-sm leading-relaxed text-muted">
              {i.description}
            </p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
