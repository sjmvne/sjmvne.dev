"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  Briefcase,
  Camera,
  Download,
  FileText,
  Heart,
  Home,
  Mail,
  MapPin,
  Menu,
  PawPrint,
  Sparkles,
  Terminal,
  User,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon; id: string };

const nav: NavItem[] = [
  { id: "01", href: "/#about", label: "About", icon: User },
  { id: "02", href: "/#timeline", label: "Percorso", icon: Sparkles },
  { id: "03", href: "/#skills", label: "Skills", icon: Wrench },
  { id: "04", href: "/#projects", label: "Progetti", icon: Briefcase },
  { id: "05", href: "/#side-projects", label: "Lab", icon: Terminal },
  { id: "06", href: "/#certifications", label: "Certificazioni", icon: Award },
  { id: "07", href: "/#travels", label: "Viaggi", icon: MapPin },
  { id: "08", href: "/#dogs", label: "Whisky & Lady", icon: PawPrint },
  { id: "09", href: "/#photography", label: "Fotografia", icon: Camera },
  { id: "10", href: "/#interests", label: "Interessi", icon: Heart },
  { id: "11", href: "/#cv", label: "CV", icon: FileText },
  { id: "12", href: "/#contact", label: "Contatti", icon: Mail },
];

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  const menuContent = (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="mobile-menu-portal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{ zIndex: 20000 }}
          className="fixed inset-0 flex md:hidden pointer-events-auto"
        >
          {/* Backdrop */}
          <motion.div
            key="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Content */}
          <motion.div
            key="mobile-menu-drawer"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose();
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative mt-auto flex max-h-[92vh] w-full flex-col rounded-t-[2.5rem] border-t border-border bg-background shadow-2xl"
          >
            {/* Handle bar */}
            <div className="flex h-10 w-full shrink-0 items-center justify-center">
              <div className="h-1.5 w-12 rounded-full bg-border/60" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-8 py-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  Navigazione
                </span>
                <h2 className="text-2xl font-bold tracking-tight">Menu</h2>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/50 text-foreground transition-all active:scale-90"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8">
              <ul className="flex flex-col">
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
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(menuContent, document.body);
}
