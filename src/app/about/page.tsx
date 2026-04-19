export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">

      {/* Label */}
      <div className="flex items-center gap-3 mb-12">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">About</span>
        <div className="w-16 h-px bg-white/[0.05]" />
      </div>

      {/* Main heading */}
      <h1 className="font-syne font-[300] text-[42px] md:text-[58px] text-white tracking-tight leading-[1.05] mb-8 max-w-2xl">
        Built to fix<br />
        <span className="text-white/30">broken remittances.</span>
      </h1>

      {/* Body text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <p className="text-[15px] font-[300] text-white/50 leading-relaxed mb-5">
            Velocity is an advanced cross-border remittance protocol — bridging Solana to India's UPI network without any bank intermediary for instant global settlement.
          </p>
          <p className="text-[15px] font-[300] text-white/35 leading-relaxed">
            Every transaction is settled on-chain, verifiable on Solscan, and arrives at any UPI ID in under 2 seconds. The fee is 0.3% — roughly 18× cheaper than legacy corridors like Wise or Western Union.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {[
            { label: "Built with", value: "Solana · Next.js · Dodo Payments" },
            { label: "Infrastructure", value: "Velocity Protocol · Solana Core" },
            { label: "Status", value: "Developer Sandbox (Devnet)" },
            { label: "Network fee", value: "0.3% flat per transfer" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1 pb-4 border-b border-white/[0.05] last:border-0">
              <div className="text-[11px] text-white/25 uppercase tracking-widest font-[400]">{item.label}</div>
              <div className="text-[14px] font-[300] text-white/60">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
