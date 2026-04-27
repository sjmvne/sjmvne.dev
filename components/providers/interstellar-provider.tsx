"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface InterstellarContextType {
  isInterstellarMode: boolean;
  toggleInterstellar: (value?: boolean) => void;
  humorLevel: number;
  setHumorLevel: (level: number) => void;
  honestyLevel: number;
  setHonestyLevel: (level: number) => void;
}

const InterstellarContext = createContext<InterstellarContextType | undefined>(undefined);

export function InterstellarProvider({ children }: { children: ReactNode }) {
  const [isInterstellarMode, setIsInterstellarMode] = useState(false);
  const [humorLevel, setHumorLevel] = useState(75);
  const [honestyLevel, setHonestyLevel] = useState(90);

  const toggleInterstellar = useCallback((value?: boolean) => {
    setIsInterstellarMode((prev) => (value !== undefined ? value : !prev));
  }, []);

  return (
    <InterstellarContext.Provider
      value={{
        isInterstellarMode,
        toggleInterstellar,
        humorLevel,
        setHumorLevel,
        honestyLevel,
        setHonestyLevel,
      }}
    >
      {children}
    </InterstellarContext.Provider>
  );
}

export function useInterstellar() {
  const context = useContext(InterstellarContext);
  if (context === undefined) {
    throw new Error("useInterstellar must be used within an InterstellarProvider");
  }
  return context;
}
