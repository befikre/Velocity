"use client";

import { DottedMap } from "@/components/ui/magicui/dotted-map";
import { useState, useEffect } from "react";

const baseMarkers = [
  { lat: 19.0760, lng: 72.8777, name: "Mumbai" }, // India
  { lat: 28.6139, lng: 77.2090, name: "Delhi" }, // India
  { lat: 12.9716, lng: 77.5946, name: "Bangalore" }, // India
  { lat: 40.7128, lng: -74.0060, name: "New York" }, // US
  { lat: 1.3521, lng: 103.8198, name: "Singapore" }, // SG
  { lat: 51.5074, lng: -0.1278, name: "London" }, // UK
];

export function GlobalMap() {
  const [activeMarkers, setActiveMarkers] = useState(baseMarkers.map(m => ({ ...m, pulse: true })));

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time transaction activity
      const randomIdx = Math.floor(Math.random() * baseMarkers.length);
      const isIndia = randomIdx < 3;
      
      const newMarkers = baseMarkers.map((m, i) => ({
        ...m,
        // India centers pulse more frequently to show settlement activity
        pulse: i === randomIdx || (isIndia && i < 3) || Math.random() > 0.7,
        size: (i === randomIdx) ? 1.2 : 0.8
      }));
      
      setActiveMarkers(newMarkers);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 mb-28">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-[500] text-emerald-500 uppercase tracking-widest">
            Borderless Corridors · Live Activity
          </span>
        </div>
        <h2 className="font-syne font-[300] text-[36px] md:text-[48px] text-white tracking-tight mb-4 text-balance">
          Settling anywhere<br />
          <span className="text-white/25 italic">at the speed of light.</span>
        </h2>
        <p className="text-white/35 text-[15px] font-[300] max-w-lg leading-relaxed">
          Velocity connects the global USDC liquidity pool directly to the world&apos;s most advanced instant payment networks.
        </p>
      </div>

      <div className="relative border border-white/[0.06] rounded-[24px] md:rounded-[40px] bg-[#050505] p-2 md:p-8 overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_70%)]" />
        
        <div className="h-[250px] md:h-[500px] w-full relative">
          <DottedMap
            markers={activeMarkers}
            dotColor="rgba(255,255,255,0.07)"
            markerColor="#10b981"
            dotRadius={0.3}
            stagger={true}
            className="opacity-50 group-hover:opacity-100 transition-opacity duration-1000"
          />
          
          {/* Legend / Overlay */}
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 flex flex-col gap-4">
             <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md p-4 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                   <p className="text-white font-[500] text-[13px]">Mainnet-Simulation Active</p>
                   <p className="text-white/30 text-[11px]">SOL-UPI Real-time Settlement</p>
                </div>
             </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
             <div className="w-[300px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
