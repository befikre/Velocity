"use client";

import { motion } from "framer-motion";
import { Check, Rocket, Link2, RefreshCcw, Smartphone, ShieldCheck } from "lucide-react";

interface StatusTimelineProps {
  status: "Sent" | "Processing" | "Delivered" | "Failed";
}

export function StatusTimeline({ status }: StatusTimelineProps) {
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

  const isAllDone = status === "Delivered";

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative w-full">
        <div className="absolute left-[23px] top-8 bottom-8 w-[2px] bg-white/[0.04] rounded-full" />

        <motion.div 
           className={`absolute left-[23px] top-8 w-[2px] rounded-full ${isAllDone ? 'bg-emerald-500/50' : 'bg-white/30'}`}
           initial={{ height: "0%" }}
           animate={{ height: `${(currentStepIndex / 3) * 100}%` }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="flex flex-col gap-10 relative">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex && !isAllDone;
            const isFinished = isAllDone && index <= currentStepIndex;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isCompleted ? 1 : 0.2, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-8 z-10 w-full"
              >
                <div className="relative shrink-0 z-20">
                  {isCurrent ? (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#0A0A0A] border border-white/40 ring-[6px] ring-white/[0.02] shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]">
                      <div className="text-white animate-pulse">{step.icon}</div>
                    </div>
                  ) : isFinished ? (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#0A0A0A] border border-emerald-500/30 overflow-hidden relative">
                      <div className="absolute inset-0 bg-emerald-500/10" />
                      <Check className="h-5 w-5 text-emerald-400 relative z-10" />
                    </div>
                  ) : isCompleted ? (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#0A0A0A] border border-white/20 overflow-hidden relative">
                      <div className="absolute inset-0 bg-white/[0.05]" />
                      <Check className="h-4 w-4 text-white/80 relative z-10" />
                    </div>
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-[#0A0A0A] border border-white/[0.05] shadow-inner relative">
                      <div className="opacity-20 grayscale scale-75">{step.icon}</div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col min-w-0 pt-2">
                  <h3 className={`font-syne text-[16px] font-[500] tracking-tight transition-colors ${
                    isFinished ? "text-emerald-400" : isCurrent ? "text-white" : "text-white/60"
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-[12px] font-[300] text-white/40 leading-tight mt-1">{step.desc}</p>
                  
                  {isCurrent && index < 3 && (
                    <div className="flex items-center gap-2 mt-3 bg-white/[0.03] border border-white/[0.05] px-3 py-1.5 rounded-full w-max">
                      <div className="size-1.5 rounded-full bg-white/40 animate-pulse" />
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-[600]">Processing</p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {isAllDone && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="mt-12 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0" />
          <div className="flex-shrink-0 size-10 rounded-xl bg-emerald-500/10 flex items-center justify-center relative z-10">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="relative z-10 w-full">
            <div className="flex items-center justify-between w-full">
               <h4 className="text-[13px] font-[600] text-emerald-400 uppercase tracking-wider">Secure Transfer</h4>
               <span className="text-[10px] font-mono text-emerald-500/60 font-bold tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">T+0</span>
            </div>
            <p className="text-[12px] text-emerald-400/60 font-[400] mt-0.5">Funds deposited to recipient UPI.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
