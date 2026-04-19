/**
 * Velocity Protocol: Solana Blockchain Layer
 * 
 * This module handles all on-chain interactions, including constructing
 * SPL Token transfer transactions for USDC and native SOL, management of 
 * transaction metadata via the Memo Program, and blockhash synchronization.
 * 
 * @module lib/solana
 */

import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, TransactionInstruction } from '@solana/web3.js';
import { getAssociatedTokenAddress, createTransferInstruction, getAccount } from '@solana/spl-token';

// Devnet USDC Mint address
// Note: In a real app, you'd use exactly the mint address for the network
export const USDC_MINT_DEVNET = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

// Memo program ID for adding metadata to transactions
export const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

export const MOCK_MERCHANT_WALLET = new PublicKey("HUXH2mF4JQUy5n1xRz6bN1iKXYG4nSCh6bA9b82UuT4S"); // Dummy wallet for hackathon demo

/**
 * Builds a transaction to transfer USDC or SOL and attaches a memo with metadata
 */
export async function buildTransferTransaction(
  connection: Connection,
  sender: PublicKey,
  amount: number, // in raw decimal amount (e.g., 5.0 for 5 USDC)
  recipientUpi: string,
  isUsdc: boolean = true
): Promise<Transaction> {
  const tx = new Transaction();

  // Add memo instruction for metadata
  const memoData = JSON.stringify({ action: "rupeepay_remit", to: recipientUpi });
  const memoInstruction = new TransactionInstruction({
    keys: [{ pubkey: sender, isSigner: true, isWritable: false }],
    data: Buffer.from(memoData, "utf-8"),
    programId: MEMO_PROGRAM_ID,
  });
  
  tx.add(memoInstruction);

  if (isUsdc) {
    // USDC Transfer via SPL Token
    const fromAta = await getAssociatedTokenAddress(USDC_MINT_DEVNET, sender);
    const toAta = await getAssociatedTokenAddress(USDC_MINT_DEVNET, MOCK_MERCHANT_WALLET);

    // Amount in minimum units (USDC has 6 decimals)
    const amountInSmallestUnits = Math.floor(amount * 1_000_000);

    const transferInstruction = createTransferInstruction(
      fromAta,
      toAta,
      sender,
      amountInSmallestUnits
    );
    
    tx.add(transferInstruction);
  } else {
    // Native SOL Transfer (Fallback for demo)
    const amountInLamports = Math.floor(amount * LAMPORTS_PER_SOL);
    
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: MOCK_MERCHANT_WALLET,
      lamports: amountInLamports,
    });

    tx.add(transferInstruction);
  }

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash('confirmed');
  tx.recentBlockhash = blockhash;
  tx.feePayer = sender;

  return tx;
}
