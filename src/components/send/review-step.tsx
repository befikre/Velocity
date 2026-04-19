"use client";

import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, Wallet, Loader2 } from "lucide-react";
import { useSolanaTransfer } from "@/hooks/use-solana-transfer";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { MagneticButton } from "@/components/ui/hover/magnetic-button";
import { GlowBorder } from "@/components/ui/aceternity/glow-border";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
);

interface ReviewStepProps {
  data: {
    amountUsd: number;
    amountInr: number;
    recipientUpi: string;
    purpose: string;
    message?: string;
  };
  onNext: (txId: string) => void;
  onBack: () => void;
}

export function ReviewStep({ data, onNext, onBack }: ReviewStepProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const { connected, publicKey } = useWallet();
  const { transfer, loading, error } = useSolanaTransfer();

  const handleConfirm = async () => {
    const signature = await transfer(data.amountUsd, data.recipientUpi, true);

    if (signature) {
      try {
        const res = await fetch("/api/pay", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            txHash: signature,
            amountUsdc: data.amountUsd,
            amountInr: data.amountInr,
            recipientUpi: data.recipientUpi,
            purpose: data.purpose,
            message: data.message
          }),
        });
        
        // Mocking the auto-redirect for hackathon UX exactly as requested:
        setTimeout(() => {
          onNext(signature);
        }, 1500);

      } catch (err) {
        console.error("Payment API error", err);
        // Fallback to auto-redirect even if the local storage wrapper fails
        setTimeout(() => {
          onNext(signature);
        }, 1500);
      }
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      // Create a fake Solana signature for the hackathon demo
      const fakeSignature = `demo_tx_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
      
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: fakeSignature,
          amountUsdc: data.amountUsd,
          amountInr: data.amountInr,
          recipientUpi: data.recipientUpi,
          purpose: data.purpose || "Demo Transfer"
        }),
      });

      if (!res.ok) throw new Error("Backend failed");

      // Slide into the tracking page
      setTimeout(() => {
        setIsSimulating(false);
        onNext(fakeSignature);
      }, 800);
    } catch (e: any) {
      alert("Simulation failed: " + e.message);
      setIsSimulating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-lg mx-auto px-4 sm:px-0 relative z-10 pb-12"
    >
      <div className="w-full bg-transparent">
        <div className="relative mb-10 text-center flex items-center justify-between">
          <button
            onClick={!loading ? onBack : undefined}
            disabled={loading}
            className={`p-2 -ml-2 text-white/30 hover:text-white transition-colors ${loading ? "opacity-30 cursor-not-allowed" : ""}`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h2 className="font-syne font-[300] text-[22px] text-white tracking-tight">Review Transfer</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <p className="text-white/40 text-[11px] uppercase tracking-widest font-[400]">Verification step</p>
            </div>
          </div>
          <div className="w-9" />
        </div>

        <div className="space-y-6 relative z-10">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 relative overflow-hidden">
            {/* Wallet connection block */}
            {!connected ? (
              <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-8 text-center border border-white/[0.08] rounded-2xl">
                 <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-5">
                    <Wallet className="w-6 h-6 text-white/60" />
                 </div>
                 <h3 className="font-syne font-[400] text-[18px] text-white mb-2">Connect Wallet</h3>
                 <p className="text-white/40 text-[13px] font-[300] mb-6 max-w-[240px]">Sign with Phantom to broadcast your transfer onto the Solana network.</p>
                 <WalletMultiButton />
                 
                 <div className="mt-8 pt-6 border-t border-white/[0.05] w-full max-w-[250px]">
                    <p className="text-[10px] text-white/20 mb-4 font-[400] uppercase tracking-[0.2em]">Or test the flow</p>
                    <button
                      type="button"
                      onClick={handleSimulate}
                      disabled={loading || isSimulating}
                      className="w-full h-11 rounded-2xl text-[12px] font-[400] text-white/40 border border-white/[0.06] hover:text-white/80 hover:bg-white/[0.04] transition-colors"
                    >
                      {isSimulating ? "Simulating..." : "Execute in Sandbox Mode"}
                    </button>
                 </div>
              </div>
            ) : null}

            <div className="text-center mb-8 pb-8 border-b border-white/[0.05]">
              <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3">You are sending</p>
              <div className="font-syne font-[300] text-[48px] tracking-tighter text-white leading-none">
                ${data.amountUsd.toFixed(2)} <span className="text-[16px] text-white/20 font-[400] tracking-normal ml-1">USDC</span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex justify-between items-center text-[14px] font-[300]">
                <span className="text-white/40">Recipient Gets</span>
                <span className="font-syne text-[18px] text-white">₹{data.amountInr.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-[14px] font-[300]">
                <span className="text-white/40">UPI Destination</span>
                <span className="text-white/80 font-mono tracking-tight">{data.recipientUpi}</span>
              </div>
              <div className="flex justify-between items-center text-[14px] font-[300]">
                <span className="text-white/40">Purpose</span>
                <span className="text-white/80 capitalize">{data.purpose}</span>
              </div>
              
              {connected && (
                <div className="flex justify-between items-center pt-4 border-t border-white/[0.05] text-[13px] font-[300]">
                  <span className="text-white/30 flex items-center gap-2 italic uppercase text-[10px] tracking-widest font-[400]">Signer</span>
                  <span className="text-white/60 font-mono truncate max-w-[120px]">
                    {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-white/[0.02] border border-white/10 text-white/60 p-5 rounded-2xl flex items-start gap-4 text-[13px] font-[300] leading-relaxed">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 opacity-40" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="mt-10 space-y-4">
           {connected && (
              <div className="w-full">
                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="w-full h-15 rounded-2xl bg-white text-black font-[600] text-[16px] transition-all hover:bg-neutral-200 flex items-center justify-center gap-2 py-4"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                       <Loader2 className="w-5 h-5 animate-spin" /> Processing settlement
                    </span>
                  ) : (
                    "Confirm & Approve Transfer"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSimulate}
                  disabled={loading || isSimulating}
                  className="w-full mt-4 h-12 rounded-2xl text-[12px] font-[400] text-white/30 border border-white/[0.06] hover:text-white/60 transition-colors"
                >
                  {isSimulating ? "Simulating..." : "Bypass with Sandbox Settlement"}
                </button>
              </div>
           )}
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.15em] text-white/20 mt-6 font-[400]">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            Solana Devnet Architecture
          </div>
        </div>
      </div>
    </motion.div>

  );
}
