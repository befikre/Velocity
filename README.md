# Velocity

> Send USDC from any crypto wallet to any Indian UPI ID.
> They receive INR. You pay 0.3%. Done in under 2 seconds.

**Live:** https://velocity01.vercel.app

---

## Why this exists

Every year, Indians abroad send over $125 billion back home.
Wise takes 4–6% of that. Western Union takes more.
On a ₹50,000 transfer, you're losing ₹2,000–3,000 just in fees.
That's not a service charge — that's a tax on people sending money to family.

Velocity cuts that to 0.3%. And instead of 1–3 days, it settles in 2 seconds.

---

## Who it's for

**NRIs** — Send birthday money, festival gifts, or monthly support home.
No bank transfer needed on your end. Just a wallet and a UPI ID.

**Freelancers** — Your client pays you in USDC from anywhere in the world.
You receive INR directly to your UPI account. No exchange desk. No waiting.

**Tourists** — Scan any Indian shop's UPI QR code and pay from your wallet.
The merchant gets rupees. They don't need to know anything about crypto.

---

## How it works

1. Connect your Phantom wallet
2. Enter the amount in USDC — see the exact INR conversion instantly
3. Type the recipient's UPI ID
4. Sign one transaction
5. Money arrives in their UPI account in under 2 seconds

The Solana transaction is real and verifiable on Solscan.
INR settlement runs through Dodo Payments.
In this demo, the off-ramp is simulated in sandbox mode.

---

## What's real vs simulated

| Feature | Status |
|---|---|
| Phantom wallet connect | ✅ Real — Solana devnet |
| Transaction signing | ✅ Real Solana signature |
| Solscan verification link | ✅ Real and verifiable |
| INR conversion rate | ✅ Live calculation at 0.3% fee |
| Dodo Payments off-ramp | 🟡 Sandbox mode |
| UPI validation | 🟡 Format check + simulated NPCI |
| Transfer history | ✅ Persisted locally |

---

## Tech

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Framer Motion + Syne / DM Sans
- Solana web3.js + wallet-adapter-react
- Dodo Payments API (sandbox)
- Deployed on Vercel

---

## Run locally

```bash
git clone https://github.com/befikre/Velocity.git
cd Velocity
npm install
npm run dev
```

Open `http://localhost:3000`

No environment variables needed for the demo flow.
To test real wallet signing, switch Phantom to Solana devnet and airdrop some SOL.

---

## The numbers

| | Wise | Western Union | Velocity |
|---|---|---|---|
| Fee | 4–6% | 5–8% | **0.3%** |
| Settlement | 1–3 days | 2–5 days | **~2 seconds** |
| Bank account needed | Yes | Yes | **No — UPI only** |
| On-chain proof | No | No | **Yes — Solscan** |

---

Built on Solana.
