"use client";

import { useEffect, useState } from "react";
import { getTransactions, Transaction } from "@/lib/store";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

function AnimatedCounter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1200;
    const tick = (time: number) => {
      if (!startTime) startTime = time;
      const p = Math.min((time - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(to * ease);
      if (p < 1) requestAnimationFrame(tick);
      else setCount(to);
    };
    requestAnimationFrame(tick);
  }, [to]);

  return <>{count.toFixed(decimals)}</>;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTransactions(getTransactions());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalSent = transactions.reduce((acc, tx) => acc + tx.amountInr, 0);

  const stats = [
    { label: "Total sent", value: `₹${totalSent.toLocaleString("en-IN")}`, raw: totalSent },
    { label: "Transactions", value: transactions.length.toString(), raw: transactions.length },
    { label: "Avg fee", value: "0.3%", raw: 0.3 },
    { label: "Avg settlement", value: "1.8s", raw: 1.8 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">

      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">Dashboard</span>
        <div className="flex-1 h-px bg-white/[0.05]" />
        <Link href="/send" className="flex items-center gap-2 text-[12px] text-white/40 hover:text-white transition-colors border border-white/[0.07] hover:border-white/20 px-4 py-2 rounded-full">
          New transfer <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="mb-14">
        <h1 className="font-syne font-[300] text-[38px] md:text-[48px] text-white tracking-tight leading-tight mb-2">
          Transfer history
        </h1>
        <p className="text-[14px] font-[300] text-white/35">
          All your Solana → UPI transfers, tracked on-chain.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden mb-16">
        {stats.map((s, i) => (
          <div key={i} className={`flex flex-col p-6 md:p-8 ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""} ${i >= 2 ? "border-t border-white/[0.06] md:border-t-0" : ""}`}>
            <div className="font-syne font-[300] text-[28px] md:text-[34px] text-white tracking-tight leading-none mb-2">
              {s.value}
            </div>
            <div className="text-[11px] text-white/30 uppercase tracking-wider">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Transactions */}
      {transactions.length > 0 ? (
        <div className="flex flex-col gap-3">
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.txHash}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group border border-white/[0.06] rounded-2xl p-5 md:p-6 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">

                {/* Left: Avatar + details */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                    <span className="font-syne font-[300] text-[15px] text-white/70">
                      {tx.recipientUpi.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-[400] text-white">{tx.recipientUpi}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-white/25 font-mono">{tx.txHash.substring(0, 12)}…</span>
                      <a
                        href={`https://explorer.solana.com/tx/${tx.txHash}?cluster=devnet`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] text-white/35 hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Solscan
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right: Amount + status + date */}
                <div className="flex items-center gap-5 ml-auto">
                  <div className="text-right">
                    <div className="font-syne font-[300] text-[20px] text-white">
                      ₹{tx.amountInr.toLocaleString("en-IN")}
                    </div>
                    <div className="text-[11px] text-white/25 mt-0.5">
                      {new Date(tx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                  <span className={`text-[10px] font-[400] px-3 py-1 rounded-full border uppercase tracking-wider flex-shrink-0 ${
                    tx.status === "Delivered"
                      ? "border-white/15 text-white/60 bg-white/[0.04]"
                      : "border-white/10 text-white/30"
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-white/[0.06] rounded-2xl p-16 md:p-24 flex flex-col items-center text-center"
        >
          {/* Animated rupee */}
          <div className="relative w-20 h-20 mb-8">
            <div className="absolute inset-0 rounded-full border border-white/[0.06]" />
            <div className="absolute inset-[6px] rounded-full border border-white/[0.04]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="font-syne font-[300] text-[28px] text-white"
              >
                ₹
              </motion.span>
            </div>
          </div>

          <h3 className="font-syne font-[300] text-[24px] text-white mb-3">No transfers yet</h3>
          <p className="text-[13px] font-[300] text-white/35 mb-8 max-w-xs leading-relaxed">
            Send your first USDC → INR transfer and it will appear here with the Solscan proof.
          </p>
          <Link
            href="/send"
            className="flex items-center gap-2 bg-white text-black text-[13px] font-[500] px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
          >
            Send money <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
