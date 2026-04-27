"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { TerminalLink } from "@/components/terminal/terminal-link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Percorso" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Progetti" },
  { href: "#contact", label: "Contatti" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.documentElement.classList.remove("mobile-menu-open");
    }
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[100] flex justify-center p-4 pointer-events-none sm:p-6">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className={cn(
            "pointer-events-auto flex items-center gap-4 rounded-full border border-border/40 px-4 py-2 transition-all duration-500",
            "glass shadow-2xl",
            scrolled ? "bg-background/80 backdrop-blur-xl py-2.5" : "bg-background/40 py-2",
          )}
        >
          {/* Logo */}
          <TerminalLink
            href="/"
            className="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-foreground transition-all hover:text-accent"
          >
            <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] transition-all group-hover:scale-125" />
            sjmvne<span className="text-accent opacity-80">.dev</span>
          </TerminalLink>

          {/* Divider */}
          <div className="hidden h-4 w-[1px] bg-border/40 md:block" />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:text-foreground active:scale-95"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <div className="hidden h-4 w-[1px] bg-border/40 md:mx-1 md:block" />
            <ThemeToggle />
            
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Apri menu"
              aria-expanded={open}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden",
                "border border-border bg-surface/40 text-foreground/80",
                "transition-all active:scale-90",
                "hover:text-accent hover:border-accent/40",
              )}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </motion.header>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
