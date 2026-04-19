"use client";

import { motion } from "framer-motion";

export function ComparisonTable() {
  const rows = [
    { feature: "Transfer fee", wise: "4 – 6%", wu: "5 – 8%", velocity: "0.3%" },
    { feature: "Settlement time", wise: "1 – 3 days", wu: "2 – 5 days", velocity: "~2 seconds" },
    { feature: "Bank account needed", wise: "Yes", wu: "Yes", velocity: "No — UPI only" },
    { feature: "Available 24 / 7", wise: "Yes", wu: "No", velocity: "Always" },
    { feature: "On-chain proof", wise: "No", wu: "No", velocity: "Solscan link" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-28">

      <div className="flex items-center gap-3 mb-8">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">Comparison</span>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>

      <div className="mb-8">
        <h2 className="font-syne font-[300] text-[34px] md:text-[42px] text-white tracking-tight leading-tight">
          Why not Wise?
        </h2>
        <p className="text-[14px] font-[300] text-white/35 mt-2">
          18× cheaper. 100,000× faster.
        </p>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-white/[0.06]">
        <div className="min-w-[600px]">

          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr] border-b border-white/[0.06] text-[11px] text-white/30 tracking-[0.12em] uppercase h-12">
            <div className="px-6 flex items-center">Feature</div>
            <div className="px-6 flex items-center justify-center">Wise</div>
            <div className="px-6 flex items-center justify-center">Western Union</div>
            <div className="px-6 flex items-center justify-center bg-white/[0.02] border-l border-white/[0.06] text-white/50">
              Velocity
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`grid grid-cols-[1fr_1fr_1fr_1fr] text-[13px] ${i < rows.length - 1 ? "border-b border-white/[0.04]" : ""}`}
            >
              <div className="px-6 py-4 font-[300] text-white/60">{row.feature}</div>
              <div className="px-6 py-4 font-[300] text-white/25 text-center">{row.wise}</div>
              <div className="px-6 py-4 font-[300] text-white/25 text-center">{row.wu}</div>
              <div className="px-6 py-4 font-[400] text-white text-center bg-white/[0.02] border-l border-white/[0.04]">
                {row.velocity}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
