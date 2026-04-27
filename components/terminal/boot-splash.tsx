"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * BootSplash — Terminale old-school con loading bar
 * Si mostra SOLO alla prima visita (sessionStorage).
 * Durata totale: ~10 secondi.
 */

const BOOT_LINES = [
  { text: "BIOS v3.7.2 — sjmvne systems", delay: 0 },
  { text: "Checking memory... 32768 MB OK", delay: 400 },
  { text: "Initializing kernel modules...", delay: 800 },
  { text: "  [OK] net.ipv4.tcp_fastopen", delay: 1200 },
  { text: "  [OK] fs.inotify.max_user_watches", delay: 1500 },
  { text: "  [OK] gpu.driver.nvidia-550", delay: 1800 },
  { text: "Mounting /dev/portfolio... done", delay: 2400 },
  { text: "Loading stack: SAPUI5, React, Next.js, DELMIA Apriso", delay: 3000 },
  { text: "Connecting to Accenture VPN... authenticated", delay: 3800 },
  { text: "Loading AI modules...", delay: 4400 },
  { text: "  [OK] anthropic.claude-4-opus", delay: 4800 },
  { text: "  [OK] mcp-server.apriso-docs (60k chunks)", delay: 5200 },
  { text: "Compiling experience: 5+ years MES/ERP... done", delay: 5800 },
  { text: "Starting sjmvne.dev on port 443...", delay: 6600 },
  { text: "", delay: 7000 },
];

const TOTAL_DURATION = 9500; // ms — when loading bar hits 100%
const FADE_DURATION = 800; // ms — fade out after completion

// Characters for the loading bar
const BAR_WIDTH = 30;
const FILL_CHAR = "█";
const EMPTY_CHAR = "░";

function ProgressBar({ progress }: { progress: number }) {
  const filled = Math.floor((progress / 100) * BAR_WIDTH);
  const empty = BAR_WIDTH - filled;
  const bar = FILL_CHAR.repeat(filled) + EMPTY_CHAR.repeat(empty);
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
    }, 1200 + FADE_DURATION);

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
          transition={{ duration: FADE_DURATION / 1000 }}
          className="fixed inset-0 z-[100] flex flex-col justify-center bg-black"
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

          <div className="relative mx-auto w-full max-w-2xl px-6 font-mono text-xs sm:text-sm">
            {/* Boot log */}
            <div className="mb-6 flex flex-col gap-0.5">
              {visibleLines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${
                    line.startsWith("  [OK]")
                      ? "text-violet-400/80"
                      : "text-violet-400/90"
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="font-mono text-xs sm:text-sm">
              <span className="text-violet-400/70">loading </span>
              <ProgressBar progress={progress} />
            </div>

            {/* Blinking cursor */}
            {!complete && (
              <div className="mt-4">
                <span className="text-violet-400/90">sjmvne@dev:~$ </span>
                <span className="inline-block h-4 w-2 animate-pulse bg-violet-400/80" />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
