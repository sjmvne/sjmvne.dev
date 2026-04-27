import { ArrowLeft, PawPrint } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { TerminalLink } from "@/components/terminal/terminal-link";
import { SiteHeader } from "@/components/site-header";
import { dogs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Whisky & Lady · Dogs",
  description:
    "Un Border Collie e un Pastore Australiano. I motivi per cui cerco destinazioni pet-friendly.",
};

export default function DogsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-14">
        <article className="container-page py-16 sm:py-24">
          <TerminalLink
            href="/#dogs"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Torna alla home
          </TerminalLink>

          <header className="relative mb-16 flex flex-col gap-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-10 h-[400px] accent-glow opacity-50"
            />
            <span className="relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <PawPrint className="h-3.5 w-3.5" />
              Due cani, molti chilometri
            </span>
            <h1 className="relative text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
              Whisky & Lady
            </h1>
            <p className="relative max-w-2xl text-balance text-lg text-muted sm:text-xl">
              Viaggiano con me quasi sempre. Sono il motivo per cui certe strutture
              le scelgo prima dei ristoranti, e per cui in macchina c&apos;è
              sempre più spazio per loro che per il bagaglio.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-2">
            {dogs.map((d) => (
              <section
                key={d.name}
                className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-border bg-surface/40 p-8"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 accent-glow opacity-30"
                />
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-border bg-background">
                  <PawPrint className="h-16 w-16 text-muted/30" />
                  <span className="absolute bottom-3 left-3 font-mono text-xs text-muted/60">
                    {d.name.toLowerCase()}.jpg
                  </span>
                </div>
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-3xl font-semibold tracking-tight">
                      {d.name}
                    </h2>
                    <span className="font-mono text-xs text-accent">
                      {d.age}
                    </span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    {d.breed}
                  </p>
                  <p className="text-base leading-relaxed text-foreground/90">
                    {d.description}
                  </p>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-dashed border-border bg-surface/30 p-6 font-mono text-xs text-muted">
            Galleria foto Whisky &amp; Lady in arrivo. Vai su Instagram
            <a
              href="https://instagram.com/sjmvne"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-accent hover:underline"
            >
              @sjmvne
            </a>{" "}
            per gli ultimi scatti.
          </div>
        </article>
      </main>
    </>
  );
}
