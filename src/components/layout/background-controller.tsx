"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundController() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transform scroll progress to subtle color shifts and blobs movement
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.12, 0.08]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.03, 0.02]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#000000]">
      {/* Mixed Base Layer */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, #0A0D12 0%, #000000 100%)"
        }}
      />

      {/* Aurora Blob 1: Silver/White */}
      <motion.div
        style={{ 
          y: blob1Y, 
          opacity: blobOpacity,
          background: "radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 70%)"
        }}
        className="absolute -top-[20%] -right-[10%] w-[80%] h-[80%] blur-[120px] pointer-events-none"
      />

      {/* Aurora Blob 2: Deep Midnight Blue */}
      <motion.div
        style={{ 
          y: blob2Y, 
          opacity: blobOpacity,
          background: "radial-gradient(circle at 50% 50%, #1a2333 0%, transparent 70%)"
        }}
        className="absolute top-[40%] -left-[10%] w-[70%] h-[70%] blur-[120px] pointer-events-none"
      />

      {/* Dynamic Grid */}
      <motion.div 
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 pointer-events-none"
        active-grid="true"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px"
          }}
        />
      </motion.div>

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}
