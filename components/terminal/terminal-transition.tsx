"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

// ────────────────────────────────────────────────────────
// Context
// ────────────────────────────────────────────────────────

type TransitionFn = (href: string) => void;

const Ctx = createContext<TransitionFn>(() => {});

export function useTerminalNav(): TransitionFn {
  return useContext(Ctx);
}

// ────────────────────────────────────────────────────────
// Derive a unix-like command from current path → next path
// ────────────────────────────────────────────────────────

function deriveCommand(from: string, to: string): string {
  const cleanTo = to.split("#")[0];
  const fromParts = from.split("/").filter(Boolean);
  const toParts = cleanTo.split("/").filter(Boolean);

  // Going to homepage from homepage
  if (toParts.length === 0 && fromParts.length === 0) {
    return "cd ~";
  }

  // Going "back" (deeper → shallower)
  if (toParts.length < fromParts.length) {
    const levels = fromParts.length - toParts.length;
    let back = "";
    for (let i = 0; i < levels; i++) {
      back += "../";
    }
    // remove trailing slash if we just want "cd .."
    back = back.slice(0, -1);
    return `cd ${back || ".."}`;
  }

  // Going deeper (e.g. / → /projects/slug)
  const target = toParts[toParts.length - 1];
  if (fromParts.length === 0) {
    return `cd ${toParts.join("/")}`;
  }

  // Same depth navigation
  if (toParts.length === fromParts.length) {
    if (toParts.length === 0) return "cd ~";
    return `cd ../${target}`;
  }

  return `cd ${target}`;
}

// ────────────────────────────────────────────────────────
// Typewriter effect
// ────────────────────────────────────────────────────────

function Typewriter({
  text,
  speed = 50,
  onComplete,
}: {
  text: string;
  speed?: number;
  onComplete?: () => void;
}) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);

  return (
    <>
      {displayed}
      <span className="inline-block h-6 w-3 sm:h-8 sm:w-4 translate-y-1 animate-pulse bg-violet-400" />
    </>
  );
}

// ────────────────────────────────────────────────────────
// Provider — wraps the app in layout.tsx
// ────────────────────────────────────────────────────────

export function TerminalTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, setTransition] = useState<{
    command: string;
    href: string;
  } | null>(null);
  const [phase, setPhase] = useState<"idle" | "typing" | "hold" | "fadeout">(
    "idle"
  );

  const navigate: TransitionFn = useCallback(
    (href: string) => {
      if (href === pathname) return;
      const command = deriveCommand(pathname, href);
      setTransition({ command, href });
      setPhase("typing");
    },
    [pathname]
  );

  const onTypeComplete = useCallback(() => {
    setPhase("hold");
    // Hold for a beat, then navigate
    setTimeout(() => {
      if (transition) {
        router.push(transition.href);
      }
      setPhase("fadeout");
    }, 600);
    // Remove overlay after fade
    setTimeout(() => {
      setPhase("idle");
      setTransition(null);
    }, 1200);
  }, [transition, router]);

  return (
    <Ctx.Provider value={navigate}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && transition && (
          <motion.div
            key="terminal-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
          >
            {/* Scanlines */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
              }}
            />

            <div className="relative w-[90vw] md:max-w-2xl px-4 font-mono text-lg sm:text-3xl text-violet-400 whitespace-pre-wrap break-words">
              <span className="text-violet-300/70">sjmvne@dev</span>
              <span className="text-white/40">:</span>
              <span className="text-violet-500/70">~</span>
              <span className="text-white/40">$ </span>
              {phase === "typing" && (
                <Typewriter
                  text={transition.command}
                  speed={45}
                  onComplete={onTypeComplete}
                />
              )}
              {(phase === "hold" || phase === "fadeout") && (
                <>
                  <span>{transition.command}</span>
                  <span className="inline-block h-6 w-3 sm:h-8 sm:w-4 translate-y-1 bg-violet-400" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
