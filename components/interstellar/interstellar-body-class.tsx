"use client";

import { useInterstellar } from "@/components/providers/interstellar-provider";
import { useEffect } from "react";

export function InterstellarBodyClass() {
  const { isInterstellarMode } = useInterstellar();

  useEffect(() => {
    if (isInterstellarMode) {
      document.body.classList.add("interstellar-mode");
    } else {
      document.body.classList.remove("interstellar-mode");
    }
  }, [isInterstellarMode]);

  return null;
}
