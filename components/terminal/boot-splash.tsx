"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * BootSplash — Terminale old-school con loading bar
 * Si mostra SOLO alla prima visita (sessionStorage).
 * Durata totale: ~10 secondi.
 */

const BOOT_LINES = [
  { text: "BIOS v4.0.1 — sjmvne systems", delay: 0 },
  { text: "Checking assets integrity... OK", delay: 400 },
  { text: "Initializing design system (tokens, glassmorphism)...", delay: 800 },
  { text: "  [OK] tailwind.config.js loaded", delay: 1200 },
  { text: "  [OK] lucide-react icons initialized", delay: 1500 },
  { text: "  [OK] framer-motion orchestration ready", delay: 1800 },
  { text: "Fetching portfolio data from local stack...", delay: 2400 },
  { text: "Loading sections: Home, Skills, Timeline, Travels, Contact", delay: 3000 },
  { text: "Compiling experience: 5+ years MES/ERP specialization... done", delay: 3800 },
  { text: "Applying premium aesthetics layer...", delay: 4400 },
  { text: "  [OK] dynamic-gradients.glsl", delay: 4800 },
  { text: "  [OK] micro-animations.js", delay: 5200 },
  { text: "Optimizing viewport for current device...", delay: 5800 },
  { text: "Starting sjmvne.dev production build...", delay: 6600 },
  { text: "", delay: 7000 },
];

const TOTAL_DURATION = 9500; // ms — when loading bar hits 100%
const BAR_WIDTH = 30;

function ProgressBar({ progress }: { progress: number }) {
  const filled = Math.floor((progress / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return (
    <span className="text-violet-400">
      [{bar}] {String(Math.floor(progress)).padStart(3, " ")}%
    </span>
  );
}

export function BootSplash() {
  const [show, setShow] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Check sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("sjmvne-boot");
    if (seen) {
      setShow(false);
      return;
    }
    setShow(true);
    // Prevent scrolling during splash
    document.body.style.overflow = "hidden";
  }, []);

  // Typewriter line reveals
  useEffect(() => {
    if (!show) return;

    const timers: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach(({ text, delay }) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, text]);
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [show]);

  // Progress bar animation
  useEffect(() => {
    if (!show) return;
    const start = performance.now();

    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);
      setProgress(pct);

      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setComplete(true);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [show]);

  // After complete, add final line and fade out
  useEffect(() => {
    if (!complete) return;

    const t1 = setTimeout(() => {
      setVisibleLines((prev) => [...prev, "", "sjmvne@dev:~$ ready."]);
    }, 300);

    const t2 = setTimeout(() => {
      setFadeOut(true);
    }, 1200);

    const t3 = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("sjmvne-boot", "1");
    }, 1200 + 800); // 800 is FADE_DURATION

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [complete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
        >
          {/* Scanlines effect */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />
          {/* CRT vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          <div className="relative w-full max-w-2xl px-6 font-mono text-[10px] sm:text-xs">
            {/* Progress bar (Fixed at top of container) */}
            <div className="mb-8 border-b border-violet-400/20 pb-4">
              <div className="flex items-center justify-between font-mono">
                <span className="text-violet-400/70">SYSTEM_INITIALIZATION</span>
                <ProgressBar progress={progress} />
              </div>
            </div>

            {/* Boot log (Scrolls below progress bar) */}
            <div className="h-[300px] overflow-hidden flex flex-col gap-1">
              <div className="flex flex-col gap-0.5 mt-auto">
                {visibleLines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.startsWith("  [OK]")
                        ? "text-violet-400/60"
                        : "text-violet-400/90"
                    }`}
                  >
                    {line}
                  </div>
                ))}
                {/* Blinking cursor */}
                {!complete && (
                  <div className="mt-1">
                    <span className="text-violet-400/90">sjmvne@dev:~$ </span>
                    <span className="inline-block h-3 w-1.5 animate-pulse bg-violet-400/80" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

