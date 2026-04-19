"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/lib/store";
import { ExternalLink } from "lucide-react";

export function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  const getBadgeColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Sent": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Processing": return "bg-teal-500/10 text-teal-400 border-teal-500/20";
      case "Delivered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Failed": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "";
    }
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/[0.04]">
        <h3 className="text-lg font-bold text-white">Recent Transfers</h3>
      </div>
      <div className="p-1">
        {transactions.length === 0 ? (
          <div className="text-center py-12 text-white/20">
            No transactions yet.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/[0.04] hover:bg-transparent">
                <TableHead className="text-white/30 text-xs font-medium">Date</TableHead>
                <TableHead className="text-white/30 text-xs font-medium">Recipient</TableHead>
                <TableHead className="text-white/30 text-xs font-medium">Sent</TableHead>
                <TableHead className="text-white/30 text-xs font-medium">Received</TableHead>
                <TableHead className="text-white/30 text-xs font-medium">Status</TableHead>
                <TableHead className="text-white/30 text-xs font-medium text-right">Txn</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                  <TableCell className="text-white/40 whitespace-nowrap text-sm">
                    {new Date(tx.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium text-teal-300 text-sm">
                    {tx.recipientUpi}
                  </TableCell>
                  <TableCell className="text-white/60 text-sm">
                    ${tx.amountUsd.toFixed(2)}
                  </TableCell>
                  <TableCell className="font-semibold text-emerald-400 text-sm">
                    ₹{tx.amountInr.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold border ${getBadgeColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <a
                      href={`https://explorer.solana.com/tx/${tx.txHash}?cluster=devnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs text-white/20 hover:text-emerald-400 transition-colors"
                    >
                      {tx.txHash.substring(0, 4)}...{tx.txHash.substring(tx.txHash.length - 4)}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
