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
    <section className="max-w-6xl mx-auto px-6 mb-28">
      <div className="flex flex-col items-center gap-3 mb-10">
        <h2 className="font-syne font-[300] text-[32px] text-white">How your money moves</h2>
      </div>

      <div
        className="relative flex h-[350px] md:h-[300px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.015] p-10"
        ref={containerRef}
      >
        <div className="flex size-full max-w-4xl flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          
          <div className="flex flex-row md:flex-col justify-between h-full w-full md:w-auto items-center">
            <div className="flex flex-col items-center gap-2">
              <Circle ref={div1Ref}>
                <Wallet className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[11px] text-white/40 uppercase tracking-widest hidden md:block">Wallet</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <Circle ref={div3Ref}>
                <ArrowRightLeft className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[11px] text-white/40 uppercase tracking-widest hidden md:block">App</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
             <Circle ref={div2Ref} className="size-20 bg-white/[0.03] border-white/20">
               <VelocityLogo className="w-10 h-10" />
             </Circle>
             <span className="text-[12px] text-white uppercase tracking-widest font-[500]">Velocity</span>
          </div>

          <div className="flex flex-row md:flex-col justify-between h-full w-full md:w-auto items-center">
            <div className="flex flex-col items-center gap-2">
              <Circle ref={div4Ref}>
                <Globe2 className="text-white/60 w-6 h-6" />
              </Circle>
              <span className="text-[11px] text-white/40 uppercase tracking-widest hidden md:block">Solana</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Circle ref={div5Ref}>
                <Phone className="text-emerald-500/80 w-6 h-6" />
              </Circle>
              <span className="text-[11px] text-emerald-500/80 uppercase tracking-widest hidden md:block">UPI Bank</span>
            </div>
          </div>

        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          curvature={-75}
          endYOffset={-10}
          duration={2}
          delay={0}
          pathColor="rgba(255,255,255,0.05)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div2Ref}
          curvature={75}
          endYOffset={10}
          duration={2}
          delay={0.3}
          pathColor="rgba(255,255,255,0.05)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          duration={2}
          delay={2.5}
          pathColor="rgba(255,255,255,0.05)"
          gradientStartColor="rgba(255,255,255,0)"
          gradientStopColor="#ffffff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div5Ref}
          curvature={75}
          endYOffset={10}
          duration={2}
          delay={2.8}
          pathColor="rgba(255,255,255,0.05)"
          gradientStartColor="rgba(16,185,129,0)"
          gradientStopColor="#10B981"
        />
      </div>
    </section>
  );
}
