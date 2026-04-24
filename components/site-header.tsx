"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-mono text-sm tracking-tight text-foreground transition-colors hover:text-accent"
          >
            sjmvne<span className="text-accent">.dev</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-accent-soft hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Apri menu"
              aria-expanded={open}
              className={cn(
                "inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-full md:hidden",
                "border border-border bg-surface/60 text-foreground/80",
                "backdrop-blur-sm transition-colors",
                "hover:text-accent hover:border-accent/40 hover:bg-accent-soft",
                "active:scale-95",
              )}
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
