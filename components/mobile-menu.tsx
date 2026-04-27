"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  Download,
  Home,
  Mail,
  MapPin,
  PawPrint,
  Sparkles,
  Terminal,
  User,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };

const nav: NavItem[] = [
  { href: "/#about", label: "About", icon: User },
  { href: "/#timeline", label: "Percorso", icon: Sparkles },
  { href: "/#skills", label: "Skills", icon: Wrench },
  { href: "/#projects", label: "Featured", icon: Briefcase },
  { href: "/#side-projects", label: "Side projects", icon: Terminal },
  { href: "/#stack", label: "Stack", icon: Wrench },
  { href: "/#travels", label: "Viaggi", icon: MapPin },
  { href: "/#dogs", label: "Whisky & Lady", icon: PawPrint },
  { href: "/#contact", label: "Contatti", icon: Mail },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(28px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] glass border-none md:hidden"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 340 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 500) onClose();
            }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden",
              "rounded-t-3xl border-t border-border bg-background",
              "shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]",
            )}
          >
            <div className="flex shrink-0 items-center justify-center pt-3 pb-2">
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            <div className="flex shrink-0 items-center justify-between px-6 pb-4">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">
                  Menu
                </span>
                <span className="font-mono text-[11px] text-muted">
                  Dove vuoi andare?
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Chiudi menu"
                  className="inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-border bg-surface/60 text-muted active:scale-95"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 pb-2">
              <ul className="flex flex-col gap-1">
                <li>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="group flex touch-manipulation items-center gap-4 rounded-xl px-4 py-3.5 text-foreground transition-colors active:bg-accent-soft"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted">
                      <Home className="h-4 w-4" />
                    </span>
                    <span className="flex-1 text-lg font-medium">Home</span>
                    <span className="font-mono text-xs text-muted">00</span>
                  </Link>
                </li>
                {nav.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex touch-manipulation items-center gap-4 rounded-xl px-4 py-3.5 text-foreground transition-colors active:bg-accent-soft"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors group-active:border-accent/40 group-active:bg-accent-soft group-active:text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-lg font-medium">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs text-muted">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-border bg-surface/40 px-4 py-4 pb-[env(safe-area-inset-bottom,1rem)]">
              <a
                href="/cv/CV_Simone_Pepe_2026.pdf"
                download
                onClick={onClose}
                className={cn(
                  "group flex touch-manipulation items-center gap-4 rounded-2xl p-4 active:scale-[0.98]",
                  "border border-accent/40 bg-accent-soft text-accent",
                  "transition-all",
                )}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/50 bg-background/60">
                  <Download className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-widest opacity-80">
                    Scarica CV
                  </span>
                  <span className="text-base font-semibold">
                    CV_Simone_Pepe_2026.pdf
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
