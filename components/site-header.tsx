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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-x-0 top-4 z-[10000] mx-auto flex w-fit items-center gap-2 rounded-full border border-border/40 bg-background/60 p-1.5 backdrop-blur-md pointer-events-auto shadow-2xl sm:top-6"
    >
      {/* Logo */}
      <TerminalLink
        href="/"
        className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-accent pl-3 pr-2"
      >
        sjmvne<span className="text-accent">.dev</span>
      </TerminalLink>

      {/* Divider */}
      <div className="hidden h-4 w-[1px] bg-border/40 md:block" />

      {/* Desktop Nav */}
      <nav className="hidden items-center gap-0.5 md:flex">
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
      <div className="flex items-center gap-1">
        <div className="hidden h-4 w-[1px] bg-border/40 md:mx-1 md:block" />
        <ThemeToggle />
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label="Apri menu"
          aria-expanded={open}
          className={cn(
            "relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden",
            "border border-border bg-surface/40 text-foreground/80",
            "transition-all active:scale-95 touch-manipulation",
            "hover:text-accent hover:border-accent/40",
          )}
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
