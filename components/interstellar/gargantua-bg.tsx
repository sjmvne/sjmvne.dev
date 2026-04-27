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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 perspective-[1200px] scale-[0.4] md:scale-100">
            {/* Accretion Disk - Main Body */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative h-[900px] w-[900px] rounded-full"
              style={{
                background: "radial-gradient(circle, transparent 38%, #ff8800 40%, #ffcc00 45%, #ffffff 47%, #ffcc00 49%, #ff8800 55%, transparent 65%)",
                filter: "blur(8px) contrast(180%) brightness(1.2)",
                opacity: 0.7,
                boxShadow: "0 0 100px rgba(255, 160, 0, 0.4)",
              }}
            />
            
            {/* Gravitational Lensing - Top Warp */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[500px] w-[1400px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] border-[2px] border-white/40"
              style={{
                background: "linear-gradient(to right, transparent, rgba(255,200,100,0.4) 50%, transparent)",
                filter: "blur(30px) brightness(1.5)",
                transform: "translate(-50%, -50%) rotateX(75deg) rotateY(10deg)",
                boxShadow: "0 0 120px rgba(255, 200, 50, 0.5)",
              }}
            />

            {/* Gravitational Lensing - Bottom Warp (The Mirror) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[450px] w-[1300px] -translate-x-1/2 -translate-y-1/2 rounded-[100%]"
              style={{
                background: "linear-gradient(to left, transparent, rgba(255,150,50,0.3) 50%, transparent)",
                filter: "blur(40px)",
                transform: "translate(-50%, -50%) rotateX(-75deg) rotateY(-5deg) translateY(40px)",
              }}
            />

            {/* Event Horizon - The Core */}
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black shadow-[inset_0_0_100px_rgba(0,0,0,1),0_0_40px_rgba(255,255,255,0.1)]">
                {/* Internal Lensing shimmer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent opacity-20" />
            </div>

            {/* Accretion Disk Inner Glow */}
            <div 
                className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-500/20"
                style={{ filter: "blur(20px)", boxShadow: "0 0 150px rgba(255, 100, 0, 0.6)" }}
            />
          </div>

          {/* Distant Nebula */}
          <div 
            className="absolute -left-1/4 -top-1/4 h-full w-full opacity-20"
            style={{
              background: "radial-gradient(circle, #4400aa 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div 
            className="absolute -right-1/4 -bottom-1/4 h-full w-full opacity-20"
            style={{
              background: "radial-gradient(circle, #aa4400 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />

          {/* Post-processing: Distortion */}
          <div className="absolute inset-0 backdrop-blur-[1px] opacity-30" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
