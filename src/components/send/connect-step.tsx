"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet, ShieldCheck, Zap } from "lucide-react";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
);

interface ConnectStepProps {
  onNext: () => void;
}

export function ConnectStep({ onNext }: ConnectStepProps) {
  const { connected } = useWallet();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-lg mx-auto bg-white/[0.02] border border-white/[0.06] rounded-[32px] p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10">
            <Wallet className="h-7 w-7 text-white/60" />
          </div>
          <h2 className="font-syne font-[300] text-[28px] text-white tracking-tight">Connect Wallet</h2>
          <p className="text-white/40 text-[14px] font-[300] mt-2 italic">
            Securely link your Solana wallet to begin
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="w-full flex justify-center scale-105">
            <WalletMultiButton style={{ 
              width: "100%", 
              justifyContent: "center", 
              borderRadius: "16px", 
              height: "3.5rem", 
              fontSize: "15px", 
              fontWeight: "600",
              backgroundColor: "white",
              color: "black",
              fontFamily: "var(--font-inter)"
            }} />
          </div>

          {connected && (
             <motion.button
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="w-full bg-white text-black font-[600] h-14 rounded-2xl flex items-center justify-center gap-2 transition-all hover:bg-neutral-200"
               onClick={onNext}
             >
               Wallet Linked — Continue <Zap className="h-4 w-4" />
             </motion.button>
          )}

          <div className="w-full mt-6">
            <div className="flex items-center gap-4 text-[12px] text-white/30 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] font-[300]">
              <ShieldCheck className="h-5 w-5 text-white/20 shrink-0" />
              <p className="leading-relaxed">Non-custodial infrastructure. Your private keys never leave your browser.</p>
            </div>
          </div>
          
          <button
            onClick={onNext}
            className="w-full mt-4 h-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all font-[500]"
          >
            Continue in Protocol Simulation Mode
          </button>
        </div>
      </div>
    </motion.div>
  );
}
