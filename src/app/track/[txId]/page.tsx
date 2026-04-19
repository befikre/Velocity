"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, RefreshCw, Download, Share2 } from "lucide-react";
import { StatusTimeline } from "@/components/track/status-timeline";
import { getTransactions, Transaction, updateTransactionStatus } from "@/lib/store";
import { HoverCard } from "@/components/ui/hover/hover-card";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackPage() {
  const params = useParams();
  const txId = params.txId as string;

  const [txRecord, setTxRecord] = useState<Transaction | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [txId]);

  const fetchData = () => {
    const records = getTransactions();
    const record = records.find(r => r.txHash === txId);
    if (record) {
      setTxRecord(record);
        // Auto-simulate delivery for the demonstration
      if (record.status === "Processing") {
        setTimeout(() => {
          updateTransactionStatus(record.id, "Delivered");
          fetchData();
        }, 3000);
      }
    } else {
      setTxRecord({
        id: "mock_id",
        txHash: txId,
        date: new Date().toISOString(),
        amountUsd: 50.00,
        amountInr: 4150.00,
        recipientUpi: "velocity@upi",
        status: "Delivered",
        purpose: "freelance"
      });
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      fetchData();
      setIsRefreshing(false);
    }, 800);
  };

  if (!mounted || !txRecord) return null;

  const isDelivered = txRecord.status === "Delivered";

  return (
    <div className="flex-1 w-full py-8 md:py-20 pt-28 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 relative">
        <Link href="/dashboard" className="inline-flex items-center text-[12px] uppercase tracking-widest font-[400] text-white/30 hover:text-white mb-10 transition-colors">
          <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Dashboard
        </Link>

        {showReceipt ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
            <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-[32px] p-8 md:p-12 max-w-sm mx-auto shadow-2xl shadow-black text-white relative overflow-hidden" id="receipt">
               <div className="flex justify-between items-start mb-12">
                 <div>
                   <h2 className="font-syne font-[400] text-[24px] tracking-tight mb-1">Receipt</h2>
                   <p className="text-[11px] text-white/20 uppercase tracking-[0.2em]">Velocity Settlement</p>
                 </div>
                 <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="font-syne text-[14px]">₹</span>
                 </div>
               </div>
               
               <div className="text-center mb-12 border-b border-white/[0.05] pb-10">
                 <p className="text-white/30 text-[11px] uppercase tracking-widest mb-4">Amount Delivered</p>
                 <h2 className="font-syne font-[300] text-[52px] text-white leading-none mb-4">₹{txRecord.amountInr.toLocaleString('en-IN')}</h2>
                 <p className="text-white/40 font-[300] text-[13px] italic underline decoration-white/10 underline-offset-4">
                   to {txRecord.recipientUpi}
                 </p>
               </div>

               <div className="space-y-6 text-[13px] font-[300]">
                 <div className="flex justify-between">
                   <span className="text-white/20">Date</span>
                   <span className="text-white/60 text-right">{new Date(txRecord.date).toLocaleDateString()}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-white/20">Source Amnt</span>
                   <span className="text-white/60 text-right">${txRecord.amountUsd.toFixed(2)} USDC</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-white/20">Protocol</span>
                   <span className="text-white/40 flex items-center gap-2">Solana Devnet <div className="w-1 h-1 rounded-full bg-white/20" /></span>
                 </div>
                 <div className="flex justify-between items-center pt-2">
                   <span className="text-white/20">Status</span>
                   <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-white/40 uppercase tracking-widest font-[400]">Verified</span>
                 </div>
               </div>

               <div className="mt-12 pt-6 border-t border-white/[0.05] text-center">
                  <p className="text-[9px] text-white/10 font-mono break-all leading-tight">
                    SIG: {txRecord.txHash.substring(0, 44)}...
                  </p>
               </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-12">
               <button className="text-[13px] font-[500] text-white/40 hover:text-white transition-colors underline underline-offset-8 decoration-white/10" onClick={() => setShowReceipt(false)}>
                 Back to Tracking
               </button>
               <button className="bg-white text-black px-10 py-4 rounded-2xl font-[600] text-[14px] hover:bg-neutral-200 transition-colors flex items-center gap-3">
                 <Download className="w-4 h-4" /> Download PDF
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
              <div>
                <h1 className="font-syne font-[300] text-[32px] md:text-[42px] tracking-tight text-white mb-2">Settlement sync</h1>
                <p className="text-white/30 flex items-center gap-2 text-[14px] font-[300]">
                  Tracing hash <span className="text-[12px] font-mono bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.03]">{txId.substring(0, 12)}...</span>
                </p>
              </div>

              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] px-5 py-2.5 rounded-xl text-[12px] font-[500] text-white transition-all"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh State
              </button>
            </div>

            <div className="bg-white/[0.015] border border-white/[0.05] rounded-[32px] p-8 md:p-12 mb-8">
               <StatusTimeline status={txRecord.status} />
            </div>

            {/* Readout Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="bg-white/[0.015] border border-white/[0.05] rounded-[24px] p-6 group hover:border-white/20 transition-colors">
                 <p className="text-[10px] text-white/20 font-[400] uppercase tracking-widest mb-4">On-chain Proof</p>
                 <div className="flex items-center justify-between">
                    <p className="font-mono text-white/40 text-[12px] truncate pr-4">{txId.substring(0, 16)}...</p>
                    <HoverCard>
                      <a href={`https://explorer.solana.com/tx/${txId}?cluster=devnet`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[11px] text-white/60 bg-white/[0.04] px-4 py-2 rounded-lg border border-white/10 font-[500] hover:bg-white/10 transition-colors">
                        Solscan <ExternalLink className="w-3 h-3" />
                      </a>
                    </HoverCard>
                 </div>
               </div>

               <div className="bg-white/[0.015] border border-white/[0.05] rounded-[24px] p-6 group hover:border-white/20 transition-colors">
                 <p className="text-[10px] text-white/20 font-[400] uppercase tracking-widest mb-4">Settlement Value</p>
                 <div className="flex flex-col">
                    <p className="font-syne font-[300] text-white text-[24px]">₹{txRecord.amountInr.toLocaleString('en-IN')}</p>
                    <p className="text-[11px] text-white/30 mt-1 truncate italic">Dispatched to {txRecord.recipientUpi}</p>
                 </div>
               </div>
            </div>

             <AnimatePresence>
               {isDelivered && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                   className="mt-12 flex justify-center"
                 >
                   <button 
                     onClick={() => setShowReceipt(true)}
                     className="w-full md:w-auto px-10 py-4 bg-white text-black font-[600] rounded-2xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 text-[14px]"
                   >
                     <Share2 className="w-4 h-4" /> Final Settlement Receipt
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>

  );
}
