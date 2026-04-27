"use client";

import { motion, AnimatePresence } from "motion/react";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { useEffect, useState } from "react";

export function GargantuaBackground() {
  const { isInterstellarMode } = useInterstellar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isInterstellarMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 z-[-10] overflow-hidden bg-black pointer-events-none"
        >
          {/* Starfield */}
          <div className="absolute inset-0 opacity-40">
            <div className="stars-container absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50" />
          </div>

          {/* Gargantua - The Black Hole */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1500px] scale-[0.4] md:scale-100">
            
            {/* Accretion Disk - Main Body (Perspective Warp) */}
            <div className="relative h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2" style={{ transform: "rotateX(75deg)" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, transparent 35%, #ff4400 38%, #ffaa00 42%, #ffffff 45%, #ffaa00 48%, #ff4400 52%, transparent 60%)",
                  filter: "blur(4px) brightness(0.8) contrast(150%)",
                  opacity: 0.6,
                }}
              />
              {/* Accretion Disk Outer Glow */}
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, transparent 40%, rgba(255,100,0,0.2) 50%, transparent 70%)", filter: "blur(60px)" }} />
            </div>

            {/* Gravitational Lensing - The Vertical Ring (Optical Illusion) */}
            <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2">
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-[30px] border-amber-500/10"
                    style={{ 
                        filter: "blur(25px) contrast(200%)",
                        background: "conic-gradient(from 0deg, transparent, rgba(255,200,100,0.2) 20%, transparent 40%, rgba(255,200,100,0.2) 60%, transparent 80%)"
                    }}
                />
            </div>

            {/* The Core - Event Horizon (Perfect Black) */}
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black z-10 shadow-[0_0_80px_rgba(255,255,255,0.05)]">
                {/* Internal Lensing shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent opacity-10" />
            </div>

            {/* Distortion Field around the core */}
            <div 
                className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-[6px] border border-white/5"
                style={{ maskImage: "radial-gradient(circle, transparent 30%, black 100%)", WebkitMaskImage: "radial-gradient(circle, transparent 30%, black 100%)" }}
            />
          </div>

          {/* Background Darkness / Nebulae */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(20,10,0,0.3),transparent_70%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
