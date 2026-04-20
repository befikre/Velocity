"use client";

import { useState, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { Zap, Activity, Server } from "lucide-react";

export function NetworkStats() {
  const { connection } = useConnection();
  const [stats, setStats] = useState({
    slot: 0,
    epoch: 0,
    tps: 0,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchStats = async () => {
      try {
        const slot = await connection.getSlot();
        const epochInfo = await connection.getEpochInfo();
        const samples = await connection.getRecentPerformanceSamples(1);

        let tps = 0;
        if (samples.length > 0) {
          tps = Math.round(samples[0].numTransactions / samples[0].samplePeriodSecs);
        }

        setStats({
          slot,
          epoch: epochInfo.epoch,
          tps: tps > 0 ? tps : 3400,
        });
      } catch (e) {
        console.error("Failed to fetch Solana stats", e);
      }
    };

    fetchStats();
    interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, [connection]);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.04] flex items-center gap-2">
        <Server className="h-4 w-4 text-emerald-400" />
        <h3 className="font-bold text-white text-sm">Solana Devnet</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            <Zap className="h-3.5 w-3.5 text-amber-400 mx-auto mb-2" />
            <span className="text-xl font-semibold text-white block tabular-nums tracking-tight">
              {stats.tps.toLocaleString()}
            </span>
            <span className="text-[10px] text-white/20 uppercase tracking-wider mt-1 block">TPS</span>
          </div>

          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            <Activity className="h-3.5 w-3.5 text-teal-400 mx-auto mb-2" />
            <span className="text-xl font-semibold text-white block tabular-nums tracking-tight">
              {stats.epoch.toLocaleString()}
            </span>
            <span className="text-[10px] text-white/20 uppercase tracking-wider mt-1 block">Epoch</span>
          </div>

          <div className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.04]">
            <Server className="h-3.5 w-3.5 text-emerald-400 mx-auto mb-2" />
            <span className="text-xl font-semibold text-white block tabular-nums tracking-tight">
              {(stats.slot / 1000000).toFixed(1)}M
            </span>
            <span className="text-[10px] text-white/20 uppercase tracking-wider mt-1 block">Slot</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between text-xs text-white/15 border-t border-white/[0.04] pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            Operational
          </div>
          <span>Solana RPC</span>
        </div>
      </div>
    </div>
  );
}
