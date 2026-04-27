"use client";

import { motion, AnimatePresence } from "motion/react";
import { useInterstellar } from "@/components/providers/interstellar-provider";
import { useState } from "react";
import { X } from "lucide-react";

export function TarsOverlay() {
  const { isInterstellarMode, humorLevel, setHumorLevel, honestyLevel, setHonestyLevel } = useInterstellar();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      {isInterstellarMode && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ 
            y: isMinimized ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 250) : 0, 
            opacity: 1,
            rotateX: isMinimized ? 5 : 0
          }}
          exit={{ y: 200, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 150 }}
          className="fixed bottom-0 right-4 md:right-10 z-[60] flex flex-col items-center perspective-[1000px]"
        >
          {/* TARS Monolith Body */}
          <div 
            className={cn(
              "relative w-56 md:w-72 rounded-t-xl border-x border-t border-white/10 bg-zinc-950 p-4 md:p-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transition-all duration-700",
              isMinimized ? "h-16 md:h-20 cursor-pointer hover:bg-zinc-900" : "h-auto"
            )}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {/* Peeking label when minimized */}
            {isMinimized && (
              <div className="flex items-center justify-between h-full px-2">
                <span className="font-mono text-[10px] text-amber-500/60 tracking-widest animate-pulse">TARS-01 // ACTIVE</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }}
                  className="bg-white/5 hover:bg-white/10 p-1 rounded text-[8px] font-mono text-white/40"
                >
                  SHOW
                </button>
              </div>
            )}

            {!isMinimized && (
              <>
                <div className="flex justify-between items-start mb-4">
                   <div className="font-mono text-[10px] text-amber-500/60 tracking-widest">TARS-01</div>
                   <button 
                     onClick={() => setIsMinimized(true)}
                     className="bg-white/5 hover:bg-white/10 p-1.5 rounded text-white/40 hover:text-white/80 transition-colors"
                   >
                     <X className="h-3 w-3" />
                   </button>
                </div>

                {/* TARS Display Screen */}
                <div className="mb-6 rounded bg-black p-4 font-mono text-[10px] md:text-xs leading-relaxed text-amber-500/90 shadow-[inset_0_0_20px_rgba(0,0,0,1)] ring-1 ring-amber-500/20">
                  <div className="mb-3 flex justify-between border-b border-amber-500/10 pb-1">
                    <span className="opacity-50">SYSTEM STATUS</span>
                    <span className="animate-pulse text-green-500">● OK</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/30">HUMOR_PARAM:</span>
                      <span className={cn(humorLevel > 90 ? "text-red-400" : "text-amber-500")}>{humorLevel}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/30">HONESTY_PARAM:</span>
                      <span className={cn(honestyLevel < 30 ? "text-red-400" : "text-amber-500")}>{honestyLevel}%</span>
                    </div>
                    <div className="pt-2 text-[8px] md:text-[9px] text-white/20 italic">
                      "I have a cue light I can use to show you when I'm joking, if you like."
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                      <span>Humor</span>
                      <span className="text-amber-500/50">{humorLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={humorLevel} 
                      onChange={(e) => setHumorLevel(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest text-muted">
                      <span>Honesty</span>
                      <span className="text-amber-500/50">{honestyLevel}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={honestyLevel} 
                      onChange={(e) => setHonestyLevel(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>

                {/* TARS Slabs Visual */}
                <div className="mt-8 flex justify-center gap-1.5 opacity-30">
                    <div className="h-16 w-3 bg-zinc-800 rounded-sm border border-white/5" />
                    <div className="h-16 w-3 bg-zinc-800 rounded-sm border border-white/5" />
                    <div className="h-16 w-3 bg-zinc-800 rounded-sm border border-white/5" />
                    <div className="h-16 w-3 bg-zinc-800 rounded-sm border border-white/5" />
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { cn } from "@/lib/utils";
