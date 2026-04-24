"use client";

import dynamic from "next/dynamic";

const TravelMapClient = dynamic(() => import("./travel-map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center rounded-2xl border border-border bg-surface/40">
      <span className="font-mono text-xs text-muted">Caricamento mappa…</span>
    </div>
  ),
});

export function TravelMap() {
  return <TravelMapClient />;
}
