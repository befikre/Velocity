import { NextResponse } from 'next/server';

// Hackathon Mock In-Memory DB
// IMPORTANT: This rests in Node.js server memory and resets on server restart.
// In a real app, use PostgreSQL / Redis.
export const dynamic = 'force-dynamic';

interface DemoTx {
  id: string;
  txHash: string;
  upiId: string;
  amountUsdc: number;
  amountInr: number;
  purpose: string;
  message?: string;
  status: "processing" | "delivered";
  createdAt: number;
}

const db = new Map<string, DemoTx>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { txHash, upiId, amountUsdc, amountInr, purpose, message } = body;

    if (!txHash || !upiId || !amountUsdc || !amountInr || !purpose) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate Solana Signature structure (relaxed for hackathon demo)
    if (txHash.length < 20) { // Extremely relaxed for demo stability
      return NextResponse.json({ error: "Invalid transaction signature" }, { status: 400 });
    }

    // Relaxed UPI Regex for hackathon test cases
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
    if (upiId.length < 3) {
      return NextResponse.json({ error: "Invalid UPI ID" }, { status: 400 });
    }

    const id = txHash; // Using txHash as ID for simplicity in polling

    const record: DemoTx = {
      id,
      txHash,
      upiId,
      amountUsdc,
      amountInr,
      purpose,
      message,
      status: "processing",
      createdAt: Date.now()
    };

    db.set(id, record);

    // Simulate backend Dodo Payments off-ramp finalizing after 3 seconds
    setTimeout(() => {
      const existing = db.get(id);
      if (existing) {
         existing.status = "delivered";
         db.set(id, existing);
      }
    }, 3000);

    return NextResponse.json({
      success: true,
      data: {
        id,
        status: "processing",
        estimatedDelivery: "< 2s"
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
   return NextResponse.json({ error: "Method not allowed. Use GET /api/status/[id]" }, { status: 405 });
}
