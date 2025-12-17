"use client";

import { useMemo } from "react";
import DottedMap from "dotted-map";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { LocationMap } from "./LocationMap";

interface Location {
  lat: number;
  lng: number;
  label: string;
  address: string;
  googleMapsUrl: string;
}

interface IndiaMapProps {
  locations: Location[];
}

export default function IndiaMap({ locations }: IndiaMapProps) {
  const { theme } = useTheme();

  const { mapPoints, projectedLocations, viewBox, bounds } = useMemo(() => {
    const config = {
      height: 120,
      grid: "diagonal" as const,
      region: {
        lat: { min: 6, max: 38 },
        lng: { min: 68, max: 98 }
      }
    };

    // Base map (India + Nepal)
    const map = new DottedMap({ ...config, countries: ["IND", "NPL"] });
    const pts = map.getPoints();
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    pts.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const locs = locations.map(loc => {
      const pin = map.getPin({ lat: loc.lat, lng: loc.lng });
      return { ...loc, x: pin.x, y: pin.y };
    });

    const padding = 2;
    const width = maxX - minX + padding * 2;
    const height = maxY - minY + padding * 2;

    return {
      mapPoints: pts,
      projectedLocations: locs,
      viewBox: `${minX - padding} ${minY - padding} ${width} ${height}`,
      bounds: { minX: minX - padding, minY: minY - padding, width, height }
    };
  }, [locations]);

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto select-none"
      style={{ aspectRatio: `${bounds.width} / ${bounds.height}` }}
    >
      <svg viewBox={viewBox} className="w-full h-full">
        {mapPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={0.25}
            className={`${
              theme === "dark" ? "fill-neutral-700" : "fill-neutral-300"
            } transition-all duration-700 ease-out hover:duration-0 hover:fill-[#009edb] hover:scale-[2.5]`}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {projectedLocations.map((loc, i) => (
          <g 
            key={i} 
            transform={`translate(${loc.x}, ${loc.y})`}
            className="cursor-pointer"
          >
            <motion.circle
              r={1.5}
              className="fill-[#009edb]/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            
            <circle
              r={0.6}
              className="fill-[#009edb]"
            />
          </g>
        ))}
      </svg>

      {/* Overlay Location Maps */}
      {projectedLocations.map((loc, i) => {
        const left = ((loc.x - bounds.minX) / bounds.width) * 100;
        const top = ((loc.y - bounds.minY) / bounds.height) * 100;
        
        return (
          <div
            key={i}
            className="absolute group"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 50
            }}
          >
            {/* Invisible trigger area around the pin */}
            <div className="absolute -inset-4 cursor-pointer" onClick={() => window.open(loc.googleMapsUrl, '_blank')} />
            
            {/* Mobile Label */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 block md:hidden whitespace-nowrap z-50 pointer-events-none">
               <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm text-[10px] font-medium px-2 py-0.5 rounded shadow-sm border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200">
                 {loc.label}
               </div>
            </div>

            {/* Desktop Hover Card */}
            <div className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto origin-bottom scale-75">
              <LocationMap 
                location={loc.label}
                coordinates={`${loc.lat.toFixed(4)}° N, ${loc.lng.toFixed(4)}° E`}
                onClick={() => window.open(loc.googleMapsUrl, '_blank')}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
