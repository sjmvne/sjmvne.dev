import { TravelMap } from "@/components/map/travel-map";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { travels } from "@/lib/site-data";

export function TravelsSection() {
  return (
    <section
      id="travels"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="07 · Travels"
          title="Dove sono stato."
          description="Pochi viaggi, abbastanza curati. Ho caricato un po' di foto nella galleria."
        />
      </Reveal>

      <Reveal delay={0.15} className="mt-14">
        <TravelMap />
      </Reveal>

      <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
        {travels.map((t) => (
          <li
            key={t.city}
            className="rounded-full border border-border bg-surface/40 px-3 py-1 text-muted"
          >
            {t.city}
          </li>
        ))}
      </ul>
    </section>
  );
}
