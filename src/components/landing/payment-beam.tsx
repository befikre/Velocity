"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/magicui/animated-beam";
import { Wallet, Globe2, Phone, Zap, ArrowRightLeft } from "lucide-react";
import { VelocityLogo } from "@/components/ui/velocity-logo";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-3 shadow-[0_0_20px_-12px_rgba(255,255,255,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function PaymentBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="max-w-6xl mx-auto px-6 mb-20 md:mb-28">
      <div className="flex flex-col items-center gap-3 mb-10 text-center">
        <h2 className="font-syne font-[300] text-[28px] md:text-[36px] text-white leading-tight">
          How your money <span className="text-white/40 italic">moves</span>
        </h2>
        <p className="text-[12px] md:text-[14px] text-white/20 font-[300] tracking-widest uppercase">The Hybrid Settlement Layer</p>
      </div>

      <div
        className="relative flex h-[500px] md:h-[400px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] p-6 md:p-10"
        ref={containerRef}
      >
        <div className="flex size-full max-w-4xl flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          
          <div className="flex flex-row md:flex-col justify-around md:justify-between h-auto md:h-full w-full md:w-auto items-center">
            <div className="flex flex-col items-center gap-3">
              <Circle ref={div1Ref}>
                <Wallet className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest font-[500]">Wallet</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <Circle ref={div3Ref}>
                <ArrowRightLeft className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest font-[500]">App</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 z-20">
             <Circle ref={div2Ref} className="size-20 bg-white/[0.03] border-white/20 scale-110 md:scale-125">
               <VelocityLogo className="w-10 h-10" />
             </Circle>
             <div className="px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-tighter">Settlement Hub</div>
          </div>

          <div className="flex flex-row md:flex-col justify-around md:justify-between h-auto md:h-full w-full md:w-auto items-center">
            <div className="flex flex-col items-center gap-3">
              <Circle ref={div4Ref}>
                <Globe2 className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[10px] md:text-[11px] text-white/40 uppercase tracking-widest font-[500]">Solana</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Circle ref={div5Ref} className="border-emerald-500/20 bg-emerald-500/[0.02]">
                <Phone className="text-emerald-500/80 w-6 h-6" />
              </Circle>
              <span className="text-[10px] md:text-[11px] text-emerald-500/80 uppercase tracking-widest font-[600]">UPI Bank</span>
            </div>
          </div>

        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          curvature={-75}
          endYOffset={-10}
          duration={2.5}
          delay={0}
          pathColor="rgba(255,255,255,0.08)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div2Ref}
          curvature={75}
          endYOffset={10}
          duration={2.5}
          delay={0.4}
          pathColor="rgba(255,255,255,0.08)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          duration={2.5}
          delay={2.6}
          pathColor="rgba(255,255,255,0.08)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div5Ref}
          curvature={75}
          endYOffset={10}
          duration={2.5}
          delay={3}
          pathColor="rgba(16,185,129,0.08)"
          gradientStartColor="rgba(16,185,129,0)"
          gradientStopColor="#10B981"
        />
      </div>
    </section>
  );
}
