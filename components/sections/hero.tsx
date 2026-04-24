"use client";

import { ArrowDown, MapPin } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/lib/site-data";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [now, setNow] = useState("");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.35);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 });
  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${glowX} ${glowY}, var(--accent-glow), transparent 65%)`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const setter = () => setCanHover(mq.matches);
    setter();
    mq.addEventListener("change", setter);

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
      mq.removeEventListener("change", setter);
      clearInterval(t);
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion || !canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-14"
    >
      {canHover ? (
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { background: glowBackground }}
          className="pointer-events-none absolute inset-0"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(500px circle at 50% 30%, var(--accent-glow), transparent 65%)",
          }}
        />
      )}
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
          <span suppressHydrationWarning>{now || "— —"} Milano</span>
        </div>

        <div className="flex flex-col gap-2">
          <p
            className="hero-reveal text-2xl font-light tracking-tight text-muted sm:text-3xl"
            style={{ animationDelay: "100ms" }}
          >
            {hero.greeting}
          </p>

          <h1
            className="hero-reveal text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.5rem]"
            style={{ animationDelay: "200ms" }}
          >
            <span className="bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
              {hero.name}
            </span>
            <span className="text-accent">.</span>
          </h1>
        </div>

        <p
          className="hero-reveal max-w-2xl text-balance text-base text-muted sm:text-lg md:text-xl"
          style={{ animationDelay: "400ms" }}
        >
          {hero.tagline}
        </p>

        <div
          className="hero-reveal flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 font-mono text-[11px] text-muted sm:text-xs"
          style={{ animationDelay: "600ms" }}
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
          className="hero-reveal flex items-center gap-2 pt-4 font-mono text-xs text-muted"
          style={{ animationDelay: "800ms" }}
        >
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          <span>Scorri per conoscermi meglio</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-gradient-to-r from-accent via-accent-hi to-transparent"
      />
    </section>
  );
}
