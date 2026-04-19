"use client";

// Simple local storage store for the hackathon demo
// In a production app, use Postgres + Prisma, indexed by wallet pubkey

export type TransactionStatus = "Sent" | "Processing" | "Delivered" | "Failed";

export interface Transaction {
  id: string;
  txHash: string;
  date: string;
  amountUsd: number;
  amountInr: number;
  recipientUpi: string;
  status: TransactionStatus;
  purpose?: 'gift' | 'freelance';
  message?: string;
}

const STORE_KEY = "rupeepay_history";

export function getTransactions(): Transaction[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORE_KEY);
  if (!stored) return getMockTransactions();
  try {
    return JSON.parse(stored);
  } catch {
    return getMockTransactions();
  }
}

export function saveTransaction(tx: Transaction) {
  if (typeof window === "undefined") return;
  const current = getTransactions();
  localStorage.setItem(STORE_KEY, JSON.stringify([tx, ...current]));
}

export function updateTransactionStatus(id: string, status: TransactionStatus) {
  if (typeof window === "undefined") return;
  const current = getTransactions();
  const updated = current.map(tx => tx.id === id ? { ...tx, status } : tx);
  localStorage.setItem(STORE_KEY, JSON.stringify(updated));
}

// Generate some mock history so the dashboard isn't empty
function getMockTransactions(): Transaction[] {
  return [
    { id: 'tx_1', purpose: 'gift', amountUsd: 50.06, amountInr: 4180, recipientUpi: 'mom@oksbi', status: 'Delivered', date: '2026-04-15', message: 'Happy Diwali!', txHash: '5XNfA8w9...' },
    { id: 'tx_2', purpose: 'freelance', amountUsd: 197.6, amountInr: 16500, recipientUpi: 'me@ybl', status: 'Delivered', date: '2026-04-12', txHash: '2jKbC1v8...' },
    { id: 'tx_3', purpose: 'gift', amountUsd: 98.2, amountInr: 8200, recipientUpi: 'dad@icici', status: 'Processing', date: '2026-04-17', txHash: '9hPzL3m5...' }
  ];
}
