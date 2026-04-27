"use client";

import { ArrowLeft } from "lucide-react";
import { useTerminalNav } from "@/components/terminal/terminal-transition";

export function BackButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const nav = useTerminalNav();

  return (
    <button
      type="button"
      onClick={() => nav(href)}
      className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  );
}
