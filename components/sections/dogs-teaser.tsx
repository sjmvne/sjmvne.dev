import { ArrowUpRight, PawPrint } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { dogs } from "@/lib/site-data";

export function DogsTeaserSection() {
  return (
    <section
      id="dogs"
      className="container-page relative scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal>
        <SectionHeading
          eyebrow="09 · Dogs"
          title="Whisky & Lady."
          description="Un Border Collie e un Pastore Australiano. I motivi per cui cerco destinazioni pet-friendly e per cui la domenica inizia alle 7."
        />
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {dogs.map((d, idx) => (
          <Reveal
            key={d.name}
            delay={idx * 0.1}
            className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 accent-glow opacity-30 transition-opacity duration-500 group-hover:opacity-60"
            />
            <div className="relative flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent">
                <PawPrint className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {d.name}
                </h3>
                <p className="font-mono text-xs text-muted">
                  {d.breed} · {d.age}
                </p>
              </div>
            </div>
            <p className="relative mt-4 text-sm leading-relaxed text-muted">
              {d.description}
            </p>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/dogs"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm text-foreground transition-all hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
        >
          <span>Scopri Whisky & Lady</span>
          <ArrowUpRight className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
