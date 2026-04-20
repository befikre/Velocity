"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowDownUp, Check, ScanLine, Loader2, Gift, Briefcase, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { useRouter } from "next/navigation";
import { saveTransaction } from "@/lib/store";

type PurposeType = "gift" | "freelance" | "tourist";

interface DetailsStepProps {
  onNext: (data: { amountUsd: number; amountInr: number; recipientUpi: string; purpose: PurposeType; message?: string; invoiceRef?: string }) => void;
  onBack: () => void;
}

export function DetailsStep({ onNext, onBack }: DetailsStepProps) {
  const [purpose, setPurpose] = useState<PurposeType | null>(null);
  const [amountStr, setAmountStr] = useState("50");
  const [isFromUsd, setIsFromUsd] = useState(true);
  
  const [recipientUpi, setRecipientUpi] = useState("");
  const [upiStatus, setUpiStatus] = useState<"idle" | "checking" | "valid" | "invalid">("idle");
  
  const [message, setMessage] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const router = useRouter();

  const EXCHANGE_RATE = 83.5;
  const amountVal = parseFloat(amountStr) || 0;
  const amountUsd = isFromUsd ? amountVal : parseFloat((amountVal / EXCHANGE_RATE).toFixed(2));
  const amountInr = isFromUsd ? Math.floor(amountVal * EXCHANGE_RATE) : amountVal;

  // Validation Debounce
  useEffect(() => {
    if (recipientUpi.length < 5) {
      setUpiStatus("idle");
      return;
    }
    
    setUpiStatus("checking");
    const timer = setTimeout(() => {
      const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
      if (upiRegex.test(recipientUpi)) {
        setUpiStatus("valid");
      } else {
        setUpiStatus("invalid");
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [recipientUpi]);

  const handleNext = () => {
    // Unblocked for Demonstration Mode - allow instant bypass
    onNext({
      amountUsd: amountUsd > 0 ? amountUsd : 10, // Ensure nominal amount if skipped
      amountInr: amountInr > 0 ? amountInr : 835,
      recipientUpi: recipientUpi || "demo@upi",
      purpose: purpose || "gift",
      message,
    });
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const fakeSignature = `demo_tx_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`.padEnd(88, "x");
      
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          txHash: fakeSignature,
          amountUsdc: amountUsd > 0 ? amountUsd : 10,
          amountInr: amountInr > 0 ? amountInr : 835,
          upiId: recipientUpi || "demo@upi",
          purpose: purpose || "Demo Transfer"
        }),
      });

      if (!res.ok) throw new Error("Backend failed");

      // Sync frontend storage so the timeline renders custom amounts!
      saveTransaction({
        id: fakeSignature,
        txHash: fakeSignature,
        amountUsd: amountUsd > 0 ? amountUsd : 10,
        amountInr: amountInr > 0 ? amountInr : 835,
        recipientUpi: recipientUpi || "demo@upi",
        purpose: purpose as any || "gift",
        status: "Processing",
        date: new Date().toISOString()
      });

      setTimeout(() => {
        setIsSimulating(false);
        router.push(`/track/${fakeSignature}`);
      }, 500);
    } catch (e: any) {
      alert("Simulation failed: " + e.message);
      setIsSimulating(false);
    }
  };

  const purposes = [
    { id: "gift", label: "Gift / Family Support", icon: <Gift className="w-5 h-5 text-white/60" /> },
    { id: "freelance", label: "Freelance Payout", icon: <Briefcase className="w-5 h-5 text-white/60" /> },
    { id: "tourist", label: "Tourist Payment", icon: <Globe className="w-5 h-5 text-white/60" /> }
  ] as const;

  if (!purpose) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-syne font-[300] text-[28px] text-white tracking-tight">Select purpose</h2>
          <p className="text-white/40 text-[14px] font-[300] mt-1">What is the reason for this transfer?</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {purposes.slice(0, 2).map((p) => (
            <button
              key={p.id}
              onClick={() => setPurpose(p.id)}
              className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-white/20 rounded-2xl p-7 text-left transition-all hover:bg-white/[0.04]"
            >
              <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{p.icon}</div>
              <h3 className="font-syne font-[400] text-[15px] text-white mb-1">{p.label}</h3>
            </button>
          ))}
          <button
            onClick={() => setPurpose("tourist")}
            className="sm:col-span-2 group relative bg-white/[0.02] border border-white/[0.06] hover:border-white/20 rounded-2xl p-7 text-left transition-all hover:bg-white/[0.04] flex items-center gap-6"
          >
            <div className="opacity-60 group-hover:opacity-100 transition-opacity">{purposes[2].icon}</div>
            <div>
              <h3 className="font-syne font-[400] text-[15px] text-white">{purposes[2].label}</h3>
              <p className="text-[12px] text-white/40 font-[300] mt-0.5">Scan UPI QR codes at local Indian merchants</p>
            </div>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-lg mx-auto p-0 sm:p-0 bg-transparent">
        {/* Header */}
        <div className="relative mb-10 flex items-center justify-between">
          <button onClick={() => setPurpose(null)} className="p-2 -ml-2 text-white/30 hover:text-white transition-colors">
             <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h2 className="font-syne font-[300] text-[22px] text-white tracking-tight">Payment Details</h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <p className="text-white/40 text-[11px] uppercase tracking-widest font-[400]">{purpose} Mode</p>
            </div>
          </div>
          <div className="w-9" />
        </div>

        <div className="space-y-6 relative z-10">
          
          {/* Tourist QR Mock */}
          {purpose === "tourist" && (
            <div className="bg-white/[0.02] border border-dashed border-white/[0.1] rounded-2xl p-8 text-center">
              <div className="w-24 h-24 mx-auto bg-white/[0.03] border border-white/[0.06] rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                 <ScanLine className="w-8 h-8 text-white/20" />
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)] animate-[scan_2.5s_ease-in-out_infinite]" />
              </div>
              <p className="text-white/60 text-[13px] font-[400]">Scan Merchant QR</p>
              <p className="text-white/25 text-[11px] mt-1 font-[300]">Or enter ID manually below</p>
            </div>
          )}

          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 md:p-8 relative overflow-hidden group focus-within:border-white/30 transition-all">
            <div className="flex justify-between items-center mb-6">
               <Label className="text-[10px] font-[500] text-white/30 tracking-[0.2em] uppercase">Set Amount</Label>
               <div className="flex items-center gap-2 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                 <span className="text-[10px] text-white/60 font-mono">USDC / INR</span>
               </div>
            </div>
               
            <div className="flex items-center text-[48px] md:text-[56px] font-mono font-[400] text-white leading-none tracking-tighter">
              <span className="text-white/20 mr-4 select-none">$</span>
              <Input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 w-full shadow-none text-[48px] md:text-[56px] font-mono tabular-nums tracking-tighter placeholder:text-white/5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
                placeholder="0.00"
              />
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
               <div className="text-[11px] text-white/20 flex items-center gap-2">
                 <div className="size-1 rounded-full bg-emerald-500/50" />
                 Rate: 1 USDC = ₹83.50
               </div>
               <div className="font-mono text-[13px] text-white/50 tabular-nums">
                 ≈ ₹{amountInr.toLocaleString('en-IN')}
               </div>
            </div>
          </div>

          {/* Recipient Gets */}
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
               <Label className="text-[11px] font-[400] text-white/30 tracking-wider uppercase">Recipient Gets (UPI)</Label>
               <p className="text-[10px] text-white/40 font-[300] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.03]">1 USDC = ₹83.50</p>
            </div>
            
            <div className="flex items-center text-[42px] font-mono font-[400] tabular-nums text-white leading-none">
              <span className="text-white/20 mr-3">{!isFromUsd ? "$" : "₹"}</span>
              {!isFromUsd ? amountUsd.toFixed(2) : amountInr.toLocaleString('en-IN')}
            </div>
          </div>

          {/* UPI Field */}
          <div className="space-y-5 pt-6 border-t border-white/[0.06]">
            <div>
              <Label className="text-[11px] font-[400] text-white/30 tracking-wider uppercase block mb-3">Recipient UPI ID</Label>
              <div className="relative">
                <Input
                  placeholder="name@upi"
                  value={recipientUpi}
                  onChange={(e) => setRecipientUpi(e.target.value)}
                  className="bg-white/[0.02] border-white/[0.08] h-14 rounded-xl text-white placeholder:text-white/20 focus-visible:ring-white/20 text-[16px] font-[300] w-full pl-6"
                />
                <div className="absolute right-4 top-[14px]">
                  {upiStatus === "checking" && <Loader2 className="h-5 w-5 text-white/30 animate-spin" />}
                  {upiStatus === "valid" && <Check className="h-5 w-5 text-white/60" />}
                  {upiStatus === "invalid" && recipientUpi.length > 4 && <span className="text-white/30 text-[10px] font-[300]">Incomplete</span>}
                </div>
              </div>
            </div>
            
            <Input
              placeholder="Add a note (e.g. For family support)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white/[0.02] border-white/[0.08] h-12 rounded-xl text-white placeholder:text-white/20 focus-visible:ring-white/20 text-[14px] font-[300]"
            />
          </div>

          {/* Fee Breakdown Card */}
          <AnimatePresence>
            {amountUsd > 0 && upiStatus === "valid" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white/[0.01] border border-white/[0.03] rounded-2xl px-6 py-5 mt-4"
              >
                <div className="space-y-4 text-[13px] font-[300]">
                  <div className="flex justify-between text-white/40">
                    <span>Send Amount</span>
                    <span className="text-white/80">${amountUsd.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex justify-between text-white/40">
                    <span>Network fee (Solana)</span>
                    <span className="text-white/60">~$0.001</span>
                  </div>
                  <div className="flex justify-between text-white/40 pb-4 border-b border-white/[0.05]">
                    <span>Velocity fee (0.3%)</span>
                    <span className="text-white/80">${(amountUsd * 0.003).toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-white/30 font-[400] uppercase text-[11px] tracking-wider">Total Delivery</span>
                    <span className="text-white font-syne text-[16px]">₹{amountInr.toLocaleString('en-IN')} INR</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-10 pb-10">
          <button
            className="w-full h-14 rounded-2xl bg-white text-black font-[600] text-[15px] transition-all hover:bg-neutral-200 flex items-center justify-center gap-2"
            onClick={handleNext}
          >
            Review Payment <ArrowRight className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={handleSimulate}
            disabled={isSimulating}
            className="w-full mt-4 h-11 rounded-2xl text-[12px] font-[400] text-white/30 border border-white/[0.06] hover:text-white/60 hover:bg-white/[0.02] transition-colors"
          >
            {isSimulating ? "Simulating chain settlement..." : "Execute Synthetic Global Settlement"}
          </button>
        </div>
      </div>
    </motion.div>

  );
}
