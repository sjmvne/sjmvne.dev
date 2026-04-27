import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: Props) {
  return (
    <header
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        /* Lowercase monospace label — more sophisticated than ALL-CAPS */
        <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-balance font-semibold leading-[1.0] tracking-tighter",
          "text-3xl sm:text-4xl md:text-[3.25rem]",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="text-pretty text-base text-muted sm:text-lg max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}
