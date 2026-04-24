import { ArrowLeft, Camera } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Photography · Galleria",
  description:
    "Reportage di viaggio, architettura urbana, ritratti dei cani. Post-produzione in Lightroom e Photoshop.",
};

const collections = [
  { name: "Viaggi", count: 42 },
  { name: "Architettura", count: 18 },
  { name: "Cani", count: 24 },
  { name: "Street", count: 11 },
];

const tiles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  aspect: i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]",
}));

export default function PhotoPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-14">
        <article className="container-page py-16 sm:py-24">
          <Link
            href="/#photography"
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Torna alla home
          </Link>

          <header className="relative mb-14 flex flex-col gap-6">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-10 h-[400px] accent-glow opacity-50"
            />
            <span className="relative inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <Camera className="h-3.5 w-3.5" />
              Lightroom first, Instagram second
            </span>
            <h1 className="relative text-balance text-5xl font-semibold leading-[1.03] tracking-tight sm:text-7xl">
              Photography.
            </h1>
            <p className="relative max-w-2xl text-balance text-lg text-muted sm:text-xl">
              Reportage di viaggio, architettura urbana, ritratti dei cani.
              Post-produzione in Lightroom e Photoshop. Qui finisce lo scatto
              che regge anche a schermo grande.
            </p>
          </header>

          <div className="mb-10 flex flex-wrap gap-2 font-mono text-xs">
            {collections.map((c) => (
              <span
                key={c.name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-muted"
              >
                {c.name}
                <span className="text-accent">{c.count}</span>
              </span>
            ))}
          </div>

          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
            {tiles.map((t) => (
              <div
                key={t.id}
                className={`${t.aspect} relative overflow-hidden rounded-xl border border-border bg-surface break-inside-avoid`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-accent-hi/10" />
                <div className="absolute inset-0 bg-dotgrid opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-8 w-8 text-muted/40" />
                </div>
                <span className="absolute bottom-2 left-2 font-mono text-[10px] text-muted/60">
                  IMG_{String(t.id + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-dashed border-border bg-surface/30 p-6 font-mono text-xs text-muted">
            Selezione foto in corso dall&apos;archivio Lightroom. Qui
            atterreranno 20-30 scatti curati con tag Viaggi / Architettura /
            Cani / Street.
          </div>
        </article>
      </main>
    </>
  );
}
