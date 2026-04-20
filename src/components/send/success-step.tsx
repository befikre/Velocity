"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Check, ExternalLink, Activity } from "lucide-react";

interface SuccessStepProps {
  txId: string;
}

export function SuccessStep({ txId }: SuccessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="w-full max-w-lg mx-auto bg-white/[0.02] border border-white/[0.06] rounded-[32px] p-8 md:p-12 text-center">
        <div className="pt-4 pb-2 relative flex flex-col items-center">
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
            >
              <Check className="h-12 w-12 text-emerald-400 stroke-[3]" />
            </motion.div>
            
            {/* Animated Ring */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"
            />
          </div>

          <div className="inline-flex items-center gap-2 mb-4 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1 rounded-full">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-emerald-500/80 font-[600]">Verified Settlement</span>
          </div>

          <h2 className="font-syne font-[300] text-[36px] text-white tracking-tight leading-tight">
            Sent. <span className="text-white/40">Settled.</span>
          </h2>
          <p className="text-white/30 text-[14px] font-[300] mt-4 leading-relaxed max-w-[320px] mx-auto">
            Blockchain broadcast complete. Your funds are being deposited into the UPI recipient account.
          </p>
        </div>

        <div className="space-y-6 flex flex-col items-center pb-4 text-center px-2 mt-10">
          <div className="w-full bg-white/[0.03] border border-white/[0.05] rounded-2xl p-5 flex justify-between items-center font-[300]">
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-white/20" />
              <span className="text-[12px] uppercase tracking-widest text-white/30 font-[400]">Status</span>
            </div>
            <div className="flex items-center gap-3 text-[13px] text-white">
              <div className="relative flex h-2 w-2">
                <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/40 opacity-75"></div>
                <div className="relative inline-flex rounded-full h-2 w-2 bg-white/60"></div>
              </div>
              Syncing Ledger
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Link href={`/track/${txId}`} className="w-full h-15 rounded-2xl bg-white text-black font-[600] text-[15px] hover:bg-neutral-200 transition-all py-4 flex items-center justify-center">
            Track Delivery State
          </Link>
          <a href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`} target="_blank" rel="noreferrer" className="w-full h-12 rounded-2xl bg-transparent border border-white/[0.06] text-white/30 hover:text-white/60 font-[400] text-[11px] tracking-widest uppercase transition-all flex items-center justify-center gap-2">
            Solana Proof <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
