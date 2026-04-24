"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    const current = theme ?? "dark";
    setTheme(current === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Cambia tema"
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border bg-surface/60 text-foreground/80",
        "backdrop-blur-sm touch-manipulation transition-colors duration-300",
        "hover:text-accent hover:border-accent/40 hover:bg-accent-soft",
        "active:scale-95",
        className,
      )}
    >
      <Sun
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          "dark:scale-0 dark:-rotate-90 dark:opacity-0",
        )}
      />
      <Moon
        className={cn(
          "absolute h-[18px] w-[18px] transition-all duration-300",
          "scale-0 rotate-90 opacity-0",
          "dark:scale-100 dark:rotate-0 dark:opacity-100",
        )}
      />
    </button>
  );
}
