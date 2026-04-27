"use client";

import { motion, useScroll, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  index: number;
  isLast?: boolean;
}

export function ScrollSection({ children, index, isLast = false }: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const isEven = index % 2 === 0;

  return (
    <div ref={sectionRef} className="relative">
      {children}
      {!isLast && (
        <motion.div
          aria-hidden
          style={reduceMotion ? undefined : { scaleX: scrollYProgress }}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-px z-20",
            isEven ? "origin-left bg-gradient-to-r" : "origin-right bg-gradient-to-l",
            "from-accent via-accent-hi to-transparent"
          )}
        />
      )}
    </div>
  );
}
