"use client";

import { useState } from "react";
import { ConnectStep } from "@/components/send/connect-step";
import { DetailsStep } from "@/components/send/details-step";
import { ReviewStep } from "@/components/send/review-step";
import { SuccessStep } from "@/components/send/success-step";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnimatePresence } from "framer-motion";

export default function SendPage() {
  const { connected } = useWallet();
  const [step, setStep] = useState(1);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [txId, setTxId] = useState<string | null>(null);

  const handleConnectNext = () => setStep(2);

  const handleDetailsNext = (data: any) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleReviewNext = (signature: string) => {
    setTxId(signature);
    setStep(4);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="flex-1 w-full relative py-8 md:py-20 pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Step Indicator */}
        {step < 4 && (
          <div className="max-w-sm mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-[500] border transition-all duration-500 ${
                    step === i
                      ? "bg-white border-white text-black shadow-lg shadow-white/5 scale-110"
                      : step > i
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-transparent border-white/[0.06] text-white/20"
                  }`}>
                    {i}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-[400] ${step >= i ? "text-white/60" : "text-white/20"}`}>
                    {i === 1 ? "Auth" : i === 2 ? "Detail" : "Verify"}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-6 h-[1px] bg-white/[0.04] rounded-full overflow-hidden">
              <div
                className="h-full bg-white/40 rounded-full transition-all duration-1000 ease-out"
                style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {step === 1 && <ConnectStep key="step1" onNext={handleConnectNext} />}
            {step === 2 && <DetailsStep key="step2" onNext={handleDetailsNext} onBack={handleBack} />}
            {step === 3 && paymentData && <ReviewStep key="step3" data={paymentData} onNext={handleReviewNext} onBack={handleBack} />}
            {step === 4 && txId && <SuccessStep key="step4" txId={txId} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
