"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { buildTransferTransaction } from "@/lib/solana";

export function useSolanaTransfer() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, sendTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transfer = async (amount: number, recipientUpi: string, isUsdc: boolean = true): Promise<string | null> => {
    if (!publicKey) {
      setError("Wallet not connected");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const tx = await buildTransferTransaction(
        connection,
        publicKey,
        amount,
        recipientUpi,
        isUsdc
      );

      // We use sendTransaction which automatically signs and sends
      // For SPL token transfers, ensure the user actually has the ATA AND tokens.
      // Since this is a demo, if the user sends SPL token without ATA, it will fail.
      // We will allow fallback to native SOL just for demo purposes if they encounter issues.
      
      const signature = await sendTransaction(tx, connection);
      
      // Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');

      return signature;
    } catch (err) {
      console.error("Transfer failed:", err);
      // In a real app we'd handle specific error messages like insufficient funds, user rejection, etc.
      setError(err instanceof Error ? err.message : "Transaction failed. Make sure you are on devnet.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading, error };
}
