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
  title: string;
  address: string;
  googleMapsUrl: string;
}

interface AsiaMapProps {
  locations: Location[];
}

export default function AsiaMap({ locations }: AsiaMapProps) {
  const { theme } = useTheme();

  const { mapPoints, projectedLocations, viewBox, bounds } = useMemo(() => {
    const config = {
      height: 100,
      grid: "diagonal" as const,
      region: {
        lat: { min: 0, max: 55 },
        lng: { min: 30, max: 135 }
      }
    };

    // Create map for Asia region
    const map = new DottedMap({ ...config });
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

    const padding = 10;
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
      className="relative w-full max-w-4xl mx-auto select-none"
    >
      <div className="w-full" style={{ aspectRatio: `${bounds.width} / ${bounds.height}` }}>
        <svg viewBox={viewBox} className="w-full h-full">
          {mapPoints.map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={0.25}
              className={`${
                theme === "dark" ? "fill-neutral-700" : "fill-neutral-700"
              } transition-all duration-700 ease-out hover:duration-0 hover:fill-[#009edb] hover:scale-[2.5]`}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}

          {projectedLocations.map((loc, i) => (
            <g 
              key={i} 
              transform={`translate(${loc.x}, ${loc.y})`}
              className="cursor-pointer group"
              onClick={() => window.open(loc.googleMapsUrl, '_blank')}
            >
              <motion.circle
                r={2.5}
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
                r={1.0}
                className="fill-[#009edb] stroke-white dark:stroke-slate-900 stroke-[0.2]"
              />

              {/* Tooltip */}
              <g 
                className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto md:pointer-events-none scale-[2] md:scale-100"
                style={{ transformOrigin: '0 0' }}
              >
                <rect
                  x={-(loc.title.length * 2 + 6) / 2}
                  y={-8}
                  width={loc.title.length * 2 + 6}
                  height={7}
                  rx={1.5}
                  className="fill-white dark:fill-slate-800 stroke-gray-200 dark:stroke-slate-700 stroke-[0.1] shadow-lg"
                />
                <text
                  x={0}
                  y={-4.5}
                  textAnchor="middle"
                  className="text-[3px] font-bold fill-gray-900 dark:fill-white"
                  dominantBaseline="middle"
                >
                  {loc.title}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}