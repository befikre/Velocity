export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Protocol Entry & Wallet Connection",
      body: "Connect your Solana wallet to the Velocity Protocol. The system utilizes USDC (Standard SPL-Token) for all cross-border liquidity to ensure stability and zero volatility during the transit phase.",
    },
    {
      number: "02",
      title: "Real-time Quoting Engine",
      body: "Our dynamic quoting engine fetches mid-market forex rates for the USD/INR pair. We apply a fixed 0.3% protocol fee, providing you with a guaranteed delivery amount before execution.",
    },
    {
      number: "03",
      title: "Atomic On-chain Settlement",
      body: "Upon signing, your transaction is broadcast to the Solana Mainnet-Beta. It reaches finality in approximately 400ms, creating an immutable ledger proof of your transfer's initiation.",
    },
    {
      number: "04",
      title: "Liquidity Bridging & Off-ramp",
      body: "The Velocity bridge detects the on-chain event and instantly converts the USDC liquidity into fiat rails. This phase bypasses traditional SWIFT delays using a network of local liquidity nodes.",
    },
    {
      number: "05",
      title: "T+0 Payout Fulfillment",
      body: "The final INR amount is credited to the recipient's UPI bank account via the NPCI network. The recipient receives funds instantly as a standard bank credit, with no crypto interaction required.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">

      {/* Label */}
      <div className="flex items-center gap-3 mb-14">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">How it works</span>
        <div className="w-16 h-px bg-white/[0.05]" />
      </div>

      {/* Hero text */}
      <h1 className="font-syne font-[300] text-[40px] md:text-[56px] text-white tracking-tight leading-[1.05] mb-5 max-w-2xl">
        Five steps. Two seconds.
        <span className="text-white/30"> No bank involved.</span>
      </h1>
      <p className="text-[15px] font-[300] text-white/40 mb-20 max-w-md leading-relaxed">
        Here is exactly what happens from the moment you click Send to the moment your family gets the rupees.
      </p>

      {/* Steps */}
      <div className="flex flex-col gap-0">
        {steps.map((step, i) => (
          <div
            key={i}
            className="grid grid-cols-[64px_1fr] md:grid-cols-[100px_1fr] gap-6 md:gap-10 pb-12 border-b border-white/[0.05] last:border-0 group"
          >
            {/* Number */}
            <div className="pt-1">
              <span className="font-syne font-[300] text-[13px] text-white/20 group-hover:text-white/40 transition-colors">
                {step.number}
              </span>
            </div>

            {/* Content */}
            <div className="pb-0 pt-0.5">
              <h2 className="font-syne font-[400] text-[20px] md:text-[24px] text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                {step.title}
              </h2>
              <p className="text-[14px] font-[300] text-white/40 leading-relaxed max-w-xl">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 flex flex-col md:flex-row items-start md:items-center gap-5 pt-12 border-t border-white/[0.05]">
        <div>
          <p className="text-[14px] font-[300] text-white/40">Ready to try it yourself?</p>
        </div>
        <a href="/send" className="bg-white text-black text-[13px] font-[500] px-6 py-3 rounded-full hover:bg-white/90 transition-colors">
          Try the sandbox →
        </a>
      </div>

    </div>
  );
}
