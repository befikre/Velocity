# Velocity Protocol

**Velocity** is an institutional-grade liquidity and settlement protocol designed to bridge the gap between global digital assets and India's real-time payment network (UPI). Built on Solana for high-throughput, low-latency settlement.

![Velocity Visuals](public/logo.svg)

## The Problem
Cross-border remittances to India currently face:
- **High Fees**: 3-7% avg. cost on traditional platforms.
- **Latency**: 12-48 hours for final bank settlement.
- **Complexity**: Multiple intermediary banks and opaque fee structures.

## The Solution
Velocity leverages the Solana blockchain to move value across global corridors and settles directly into Indian bank accounts via the Dodo Payments infrastructure.
- **Fixed 0.3% Fee**: Transparent, institutional-grade pricing.
- **6-Second Settlement**: Real-time fund availability.
- **Mainnet-Beta Hub**: A high-fidelity visual interface for monitoring global liquidity flows.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Blockchain**: Solana Web3.js
- **Visuals**: Three.js (React Three Fiber), Framer Motion, Magic UI
- **Typography**: JetBrains Mono (Numbers), Syne (Display)
- **Styling**: Tailwind CSS 4.0

## Getting Started

### Prerequisites
- Node.js 20+
- A Solana Wallet (Phantom / Backpack)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/befikre/Velocity.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Production Deployment
To run the production version (highly recommended for performance demos):
```bash
npm run build
npm run start
```

## Security & Audits
- **Smart Contract Architecture**: Built with Anchor for type-safe Solana programs.
- **Institutional Custody**: Deep integration with Tier-1 liquidity providers.
- **Security Audit**: Currently in simulation mode (Mainnet-Beta).

---

Built for the Global Solana Hackathon.
