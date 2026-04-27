"use client";

import { ArrowDown, MapPin } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/lib/site-data";
import { Hero3DBackground } from "../motion/hero-3d";
import { HeroParticles } from "../motion/hero-particles";
import { useHeroTextReveal } from "@/lib/gsap-animations";
import { useInterstellar } from "@/components/providers/interstellar-provider";

export function HeroSection() {
  const { isInterstellarMode, humorLevel, honestyLevel } = useInterstellar();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [now, setNow] = useState("");

  useHeroTextReveal(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () =>
      setNow(
        new Intl.DateTimeFormat("it-IT", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Rome",
        }).format(new Date()),
      );
    update();
    const t = setInterval(update, 30_000);

    return () => {
      clearInterval(t);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-14"
    >
      <Hero3DBackground />
      <HeroParticles />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.3] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />

      <motion.div
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
        className="container-page relative z-10 flex flex-col gap-8 py-20 sm:gap-10 sm:py-24"
      >
        <div className="hero-reveal flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="uppercase tracking-[0.2em]">
            {hero.statusLine.label}:{" "}
            <span className="text-accent">{hero.statusLine.value}</span>
          </span>
          <span className="text-muted/60">·</span>
          <span suppressHydrationWarning className="tabular-nums">{now || "— —"} Milano</span>
        </div>

        <div className="flex flex-col gap-2">
          <p
            className="hero-reveal text-2xl font-light tracking-tight text-muted sm:text-3xl"
          >
            {hero.greeting}
          </p>

          <h1
            className="hero-reveal text-balance text-5xl font-semibold leading-[0.98] tracking-tighter sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            <span className="bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
              {hero.name}
            </span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <p
          className="hero-reveal max-w-2xl text-balance text-base text-muted sm:text-lg md:text-xl"
        >
          {isInterstellarMode && humorLevel > 80 ? (
            "Spostando bit e spostando macchinari. Fondamentalmente un mago del MES, ma senza il cappello e con molta più caffeina. E sì, TARS mi sta guardando."
          ) : isInterstellarMode && honestyLevel < 50 ? (
            "Probabilmente il miglior developer che tu possa trovare in questo specifico file. Forse. Non chiedermi troppe conferme."
          ) : (
            hero.tagline
          )}
        </p>

        <div
          className="hero-reveal flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-[11px] text-muted sm:text-xs"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {site.location}
          </span>
          <span className="text-muted/50">·</span>
          <span>{hero.meta}</span>
          <span className="hidden text-muted/50 sm:inline">·</span>
          <a
            href={`mailto:${site.email}`}
            className="break-all text-accent transition-colors hover:text-accent-hi"
          >
            {site.email}
          </a>
        </div>

        <div
          className="hero-reveal flex items-center gap-2 pt-4 font-mono text-[10px] text-muted/60 uppercase tracking-widest"
        >
          <span>C'è un messaggio tra le stelle. Trova gli indizi cinematici e usa il terminale.</span>
        </div>

        <div
          className="hero-reveal flex items-center gap-2 pt-4 font-mono text-xs text-muted"
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span>Scorri per conoscermi meglio</span>
        </div>
      </motion.div>

    </section>
  );
}
