"use client";

import { motion, AnimatePresence } from "motion/react";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { Slider } from "@/components/ui/slider"; // Assuming a slider exists, or I'll build a simple one
import { useState } from "react";
import { X } from "lucide-react";

export function TarsOverlay() {
  const { isInterstellarMode, humorLevel, setHumorLevel, honestyLevel, setHonestyLevel } = useInterstellar();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      {isInterstellarMode && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ 
            x: isMinimized ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 220) : 0, 
            opacity: 1,
            rotateY: isMinimized ? -15 : 0
          }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[40] flex flex-col gap-4 perspective-[1000px]"
        >
          {/* Minimize/Maximize Trigger (The peek area) */}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="absolute -left-10 top-1/2 -translate-y-1/2 h-32 w-10 group focus:outline-none z-10"
          >
            <div className="h-full w-3 bg-white/10 group-hover:bg-amber-500/30 rounded-full transition-colors flex items-center justify-center">
              <div className="font-mono text-[8px] rotate-90 text-white/30 group-hover:text-amber-500/60 uppercase tracking-widest">
                {isMinimized ? "EXPAND" : "HIDE"}
              </div>
            </div>
          </button>

          {/* TARS Monolith Body */}
          <div 
            className={cn(
              "relative w-48 md:w-64 rounded-lg border border-white/10 bg-zinc-900 p-4 md:p-6 shadow-2xl backdrop-blur-xl transition-all duration-500",
              isMinimized ? "opacity-40 blur-sm pointer-events-none scale-95 origin-right" : "opacity-100 blur-0"
            )}
          >
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            {/* TARS Display Screen */}
            <div className="mb-4 md:mb-6 rounded bg-black/80 p-3 md:p-4 font-mono text-[9px] md:text-[10px] leading-tight text-amber-500/90 shadow-inner ring-1 ring-amber-500/20">
              <div className="mb-2 flex justify-between border-b border-amber-500/10 pb-1">
                <span>TARS-01</span>
                <span className="animate-pulse">● ACTIVE</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>HUMOR:</span>
                  <span>{humorLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span>HONESTY:</span>
                  <span>{honestyLevel}%</span>
                </div>
                <div className="mt-2 text-white/40 overflow-hidden text-ellipsis whitespace-nowrap">
                  &gt; STATUS: ANOMALY
                </div>
              </div>
            </div>

            {/* Controls */}
            {!isMinimized && (
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-muted">
                    <span>Humor</span>
                    <span>{humorLevel}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={humorLevel} 
                    onChange={(e) => setHumorLevel(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 md:h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[8px] md:text-[9px] uppercase tracking-widest text-muted">
                    <span>Honesty</span>
                    <span>{honestyLevel}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={honestyLevel} 
                    onChange={(e) => setHonestyLevel(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 md:h-2"
                  />
                </div>
              </div>
            )}

            {/* TARS Feet (Slabs) */}
            <div className="mt-4 md:mt-6 flex justify-center gap-1 opacity-20">
                <div className="h-8 md:h-12 w-1.5 md:w-2 bg-white" />
                <div className="h-8 md:h-12 w-1.5 md:w-2 bg-white" />
                <div className="h-8 md:h-12 w-1.5 md:w-2 bg-white" />
                <div className="h-8 md:h-12 w-1.5 md:w-2 bg-white" />
            </div>
          </div>
          
          {!isMinimized && (
            <div className="text-center font-mono text-[8px] md:text-[10px] text-muted/50 uppercase tracking-tighter">
              "Step back, Cooper."
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { cn } from "@/lib/utils";
