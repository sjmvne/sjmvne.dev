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

type NavItem = { href: string; label: string; icon: LucideIcon; id: string };

const nav: NavItem[] = [
  { id: "01", href: "/#about", label: "About", icon: User },
  { id: "02", href: "/#timeline", label: "Percorso", icon: Sparkles },
  { id: "03", href: "/#skills", label: "Skills", icon: Wrench },
  { id: "04", href: "/#projects", label: "Progetti", icon: Briefcase },
  { id: "05", href: "/#side-projects", label: "Lab", icon: Terminal },
  { id: "06", href: "/#travels", label: "Viaggi", icon: MapPin },
  { id: "07", href: "/#dogs", label: "Whisky & Lady", icon: PawPrint },
  { id: "08", href: "/#contact", label: "Contatti", icon: Mail },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 400) onClose();
            }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "absolute inset-x-0 bottom-0 flex max-h-[92dvh] flex-col overflow-hidden",
              "rounded-t-[2.5rem] border-t border-border bg-background",
              "shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]",
            )}
          >
            {/* Handle bar */}
            <div className="flex shrink-0 items-center justify-center pt-4 pb-2">
              <div className="h-1.5 w-12 rounded-full bg-border/60" />
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-8 pb-6">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                  Navigation
                </span>
                <span className="font-mono text-xs text-muted">
                  Scegli una destinazione
                </span>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Chiudi"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground transition-all active:scale-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="flex-1 overflow-y-auto px-6 pb-4">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="group flex items-center gap-5 rounded-2xl p-4 transition-all active:bg-accent-soft"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted group-active:border-accent/30 group-active:text-accent">
                      <Home className="h-5 w-5" />
                    </div>
                    <span className="flex-1 text-xl font-medium tracking-tight">Home</span>
                    <span className="font-mono text-[10px] text-muted opacity-50">00</span>
                  </Link>
                </li>
                
                {nav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center gap-5 rounded-2xl p-4 transition-all active:bg-accent-soft"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted group-active:border-accent/30 group-active:text-accent">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="flex-1 text-xl font-medium tracking-tight">
                          {item.label}
                        </span>
                        <span className="font-mono text-[10px] text-muted opacity-50">
                          {item.id}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer / CV Action */}
            <div className="shrink-0 border-t border-border bg-surface/20 px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
              <a
                href="/cv/CV_Simone_Pepe_2026.pdf"
                download
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-4 rounded-3xl p-4 transition-all active:scale-[0.97]",
                  "border border-accent/30 bg-accent-soft text-accent",
                )}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-background/80 shadow-sm">
                  <Download className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-70">
                    Curriculum Vitae
                  </span>
                  <span className="text-lg font-bold leading-tight">
                    Download PDF
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
