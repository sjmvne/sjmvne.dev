"use client";

import { motion } from "motion/react";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { ReactNode, useEffect, useState } from "react";

interface GravityWrapperProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function GravityWrapper({ children, className, intensity = 1 }: GravityWrapperProps) {
  const { isInterstellarMode } = useInterstellar();
  const [randomOffset, setRandomOffset] = useState({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    if (isInterstellarMode) {
      // Seed some random initial drift
      setRandomOffset({
        x: (Math.random() - 0.5) * 20 * intensity,
        y: (Math.random() - 0.5) * 20 * intensity,
        rotate: (Math.random() - 0.5) * 5 * intensity,
      });
    } else {
      setRandomOffset({ x: 0, y: 0, rotate: 0 });
    }
  }, [isInterstellarMode, intensity]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveIntensity = isMobile ? intensity * 0.4 : intensity;

  return (
    <motion.div
      animate={
        isInterstellarMode
          ? {
              y: [0, -10 * effectiveIntensity, 5 * effectiveIntensity, -5 * effectiveIntensity, 0],
              x: [0, 5 * effectiveIntensity, -5 * effectiveIntensity, 2 * effectiveIntensity, 0],
              rotate: [0, 1 * effectiveIntensity, -1 * effectiveIntensity, 0.5 * effectiveIntensity, 0],
            }
          : { y: 0, x: 0, rotate: 0 }
      }
      transition={
        isInterstellarMode
          ? {
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0.5 }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
