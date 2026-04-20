"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, Activity, Clock } from "lucide-react";
import { Transaction } from "@/lib/store";

interface StatsCardsProps {
  transactions: Transaction[];
}

export function StatsCards({ transactions }: StatsCardsProps) {
  const totalSentUsd = transactions
    .filter(t => t.status === "Delivered" || t.status === "Processing")
    .reduce((sum, t) => sum + t.amountUsd, 0);

  const totalSentInr = transactions
    .filter(t => t.status === "Delivered" || t.status === "Processing")
    .reduce((sum, t) => sum + t.amountInr, 0);

  const totalCount = transactions.length;

  const cards = [
    {
      title: "Total USD Sent",
      value: `$${totalSentUsd.toFixed(2)}`,
      change: "+20.1%",
      icon: DollarSign,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Total INR Delivered",
      value: `₹${totalSentInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      change: "+20.1%",
      icon: Activity,
      iconColor: "text-teal-400",
      iconBg: "bg-teal-500/10 border-teal-500/20",
    },
    {
      title: "Transactions",
      value: `+${totalCount}`,
      subtitle: "Lifetime transfers",
      icon: ArrowUpRight,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-500/10 border-violet-500/20",
    },
    {
      title: "Average Speed",
      value: "1.8s",
      subtitle: "Solana + Payout",
      icon: Clock,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div key={card.title} className="glass-card rounded-2xl p-5 hover:border-white/[0.12] transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white/30">{card.title}</p>
            <div className={`h-8 w-8 rounded-xl border flex items-center justify-center ${card.iconBg}`}>
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </div>
          <div className="text-[32px] font-sans font-medium text-white">{card.value}</div>
          {card.change && (
            <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-[400]">
              <ArrowUpRight className="h-3 w-3" /> {card.change} from last month
            </p>
          )}
          {card.subtitle && (
            <p className="text-xs text-white/20 mt-2">{card.subtitle}</p>
          )}
        </div>
      ))}
    </div>
  );
}
