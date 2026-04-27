"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { MapRef } from "react-map-gl/mapbox";
import Map, {
  AttributionControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl/mapbox";
import { travels, type TravelCity } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const DARK_STYLE = "mapbox://styles/mapbox/dark-v11";
const LIGHT_STYLE = "mapbox://styles/mapbox/light-v11";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function TravelMapClient() {
  const mapRef = useRef<MapRef | null>(null);
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";
  const style = dark ? DARK_STYLE : LIGHT_STYLE;
  const [selected, setSelected] = useState<TravelCity | null>(null);

  useEffect(() => {
    // Force resize in case container grew after mount
    const t = setTimeout(() => mapRef.current?.resize(), 150);
    return () => clearTimeout(t);
  }, []);

  if (!MAPBOX_TOKEN) {
    return <TravelMapFallback />;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude: 4, latitude: 46, zoom: 3.2 }}
        minZoom={1.5}
        maxZoom={8}
        scrollZoom={false}
        mapStyle={style}
        attributionControl={false}
        style={{ height: 420, width: "100%" }}
        reuseMaps
      >
        <NavigationControl position="top-right" showCompass={false} />
        <AttributionControl compact position="bottom-left" />

        {travels.map((city) => (
          <Marker
            key={city.city}
            longitude={city.coords[1]}
            latitude={city.coords[0]}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelected(city);
            }}
          >
            <button
              type="button"
              aria-label={city.city}
              className="group relative flex h-4 w-4 touch-manipulation items-center justify-center"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-accent shadow-lg shadow-accent/40 transition-transform group-hover:scale-125" />
            </button>
          </Marker>
        ))}

        {selected && (
          <Popup
            longitude={selected.coords[1]}
            latitude={selected.coords[0]}
            anchor="bottom"
            onClose={() => setSelected(null)}
            closeButton={false}
            closeOnClick
            offset={18}
            className="[&_.mapboxgl-popup-content]:!rounded-xl [&_.mapboxgl-popup-content]:!border [&_.mapboxgl-popup-content]:!border-[var(--border)] [&_.mapboxgl-popup-content]:!bg-[var(--surface)] [&_.mapboxgl-popup-content]:!text-[var(--text)] [&_.mapboxgl-popup-content]:!p-3 [&_.mapboxgl-popup-content]:!shadow-lg [&_.mapboxgl-popup-tip]:!border-t-[var(--surface)]"
          >
            <div className="flex flex-col gap-0.5 font-mono text-xs">
              <span className="text-sm font-semibold text-foreground">
                {selected.city}
              </span>
              <span className="text-muted">{selected.country}</span>
              {selected.note && (
                <span className="mt-1 italic text-muted/80">
                  {selected.note}
                </span>
              )}
            </div>
          </Popup>
        )}
      </Map>

      <div
        className={cn(
          "pointer-events-none absolute bottom-3 right-3",
          "glass px-2.5 py-1 rounded-md",
          "font-mono text-[10px] text-muted",
        )}
      >
        {travels.length} città visitate
      </div>
    </div>
  );
}

function TravelMapFallback() {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-card p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        Mappa offline
      </p>
      <p className="mt-2 text-sm text-muted">
        Mapbox non configurato. Intanto ecco la lista città:
      </p>
      <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs">
        {travels.map((t) => (
          <li
            key={t.city}
            className="rounded-full border border-border bg-background px-3 py-1 text-foreground/80"
          >
            {t.city}{" "}
            <span className="text-muted/70">· {t.country}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
