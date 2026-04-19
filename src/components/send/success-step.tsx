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
        <div className="pt-4 pb-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.05] border border-white/10"
          >
            <Check className="h-10 w-10 text-white/80" />
          </motion.div>
          <h2 className="font-syne font-[300] text-[36px] text-white tracking-tight">Settlement Sent</h2>
          <p className="text-white/30 text-[14px] font-[300] mt-4 leading-relaxed max-w-[280px] mx-auto italic">
            Transaction broadcasted to Solana. Relayer is now processing the UPI off-ramp.
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
