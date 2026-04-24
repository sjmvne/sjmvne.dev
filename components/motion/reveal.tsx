"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type AsTag = "div" | "li" | "section" | "article";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  as?: AsTag;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className,
  once = true,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const commonProps = {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once, margin: "-10% 0px -5% 0px" },
    transition: { duration, ease: [0.2, 0.65, 0.3, 1] as const, delay },
    className,
  };

  if (as === "li") return <motion.li {...commonProps}>{children}</motion.li>;
  if (as === "section") return <motion.section {...commonProps}>{children}</motion.section>;
  if (as === "article") return <motion.article {...commonProps}>{children}</motion.article>;
  return <motion.div {...commonProps}>{children}</motion.div>;
}
