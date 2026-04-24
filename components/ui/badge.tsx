import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type BadgeTone = "default" | "accent" | "muted";

const tones: Record<BadgeTone, string> = {
  default: "border-border bg-surface text-foreground/90",
  accent: "border-accent/30 bg-accent-soft text-accent",
  muted: "border-border bg-surface/60 text-muted",
};

export function Badge({
  tone = "default",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1",
        "font-mono text-xs tracking-tight",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
