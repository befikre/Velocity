import { NextResponse } from 'next/server';

// Simple in-memory cache for demo purposes
let cachedRate = 83.50;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60000; // 1 minute

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const amountStr = searchParams.get('amount') || '0';
  const fromUsdStr = searchParams.get('fromUsd') || 'true';
  
  const amount = parseFloat(amountStr);
  const isFromUsd = fromUsdStr === 'true';
  
  if (isNaN(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  try {
    const now = Date.now();
    // Use cached rate to avoid rate limits on generic free tier
    if (now - lastFetchTime > CACHE_DURATION_MS) {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=inr');
        if (res.ok) {
          const data = await res.json();
          if (data['usd-coin'] && data['usd-coin'].inr) {
            cachedRate = data['usd-coin'].inr;
            lastFetchTime = now;
          }
        }
      } catch (e) {
        console.error("Failed to fetch live rate, falling back to cached/hardcoded", e);
      }
    }

    const exchangeRate = cachedRate;
    const serviceFeePercentage = 0.005; // 0.5%
    const networkFeeUsd = 0.001; // roughly 1/10 of a cent on Solana, mocked here

    let sourceAmount = 0;
    let targetAmount = 0;

    if (isFromUsd) {
      sourceAmount = amount;
      const amountAfterFees = amount * (1 - serviceFeePercentage) - networkFeeUsd;
      targetAmount = amountAfterFees > 0 ? amountAfterFees * exchangeRate : 0;
    } else {
      targetAmount = amount;
      // Reverse math: (target/rate + networkFee) / (1 - serviceFee)
      const usdNeeded = (amount / exchangeRate) + networkFeeUsd;
      sourceAmount = usdNeeded / (1 - serviceFeePercentage);
    }

    return NextResponse.json({
      sourceAmount,
      sourceCurrency: isFromUsd ? 'USDC' : 'INR',
      targetAmount,
      targetCurrency: isFromUsd ? 'INR' : 'USDC',
      exchangeRate,
      networkFeeUsd,
      serviceFeeUsd: isFromUsd ? amount * serviceFeePercentage : sourceAmount * serviceFeePercentage,
      totalUsd: sourceAmount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Quote error:", error);
    return NextResponse.json({ error: "Failed to generate quote" }, { status: 500 });
  }
}
