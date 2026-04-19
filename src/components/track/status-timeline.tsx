"use client";

import { motion } from "framer-motion";
import { Check, Rocket, Link2, RefreshCcw, Smartphone } from "lucide-react";

interface StatusTimelineProps {
  status: "Sent" | "Processing" | "Delivered" | "Failed";
}

export function StatusTimeline({ status }: StatusTimelineProps) {
  // Mapping the conceptual statuses to the requested 4 hardcoded steps
  const steps = [
    { id: "sent", title: "Signed", desc: "USDC left your wallet", icon: <Rocket className="w-4 h-4" /> },
    { id: "confirmed", title: "Confirmed", desc: "Recorded on Solana", icon: <Link2 className="w-4 h-4" /> },
    { id: "converting", title: "Settling", desc: "USDC to INR conversion", icon: <RefreshCcw className="w-4 h-4" /> },
    { id: "delivered", title: "Delivered", desc: "INR sent to UPI", icon: <Smartphone className="w-4 h-4" /> },
  ];

  let currentStepIndex = 0;
  if (status === "Sent") currentStepIndex = 1;
  if (status === "Processing") currentStepIndex = 2; 
  if (status === "Delivered") currentStepIndex = 3;

  return (
    <div className="py-6 px-2 w-full max-w-sm mx-auto">
      <div className="flex flex-col relative w-full h-[360px]">
        {/* Continuous background line */}
        <div className="absolute left-[24px] top-6 bottom-6 w-[1px] bg-white/[0.04]" />

        {/* Animated active line */}
        <motion.div 
           className="absolute left-[24px] top-6 w-[1px] bg-white/20"
           initial={{ height: "0%" }}
           animate={{ height: `${(currentStepIndex / 3) * 100}%` }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => {
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isCompleted ? 1 : 0.2, x: 0 }}
              transition={{ delay: index * 0.2 }}
              style={{ top: `${(index / 3) * 100}%` }}
              className="absolute left-0 w-full flex items-center gap-8 translate-y-[-50%]"
            >
              <div className="relative z-10">
                {isCurrent ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0A0A0A] border border-white/40 ring-4 ring-white/[0.02]">
                    <div className="text-white animate-pulse">{step.icon}</div>
                  </div>
                ) : isCompleted ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] border border-white/20">
                    <Check className="h-4 w-4 text-white/80" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-transparent border border-white/[0.05]">
                    <div className="opacity-20 grayscale scale-75">{step.icon}</div>
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className={`font-syne text-[16px] font-[400] ${
                  isCurrent ? "text-white" : "text-white/60"
                }`}>
                  {step.title}
                </h3>
                <p className="text-[12px] font-[300] text-white/30 leading-tight mt-1">{step.desc}</p>
                {isCurrent && index < 3 && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1 h-1 rounded-full bg-white/40 animate-ping" />
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Syncing...</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

