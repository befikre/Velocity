export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Connect your wallet",
      body: "Open Phantom or any Solana wallet. Load it with USDC — the dollar-pegged stablecoin. No bank account needed. No verification forms. Just a wallet.",
    },
    {
      number: "02",
      title: "Enter amount and UPI ID",
      body: "Type how much you want to send in USD. Type the recipient's UPI ID — the same one they use for Google Pay or PhonePe. You see the exact INR amount they receive before you confirm.",
    },
    {
      number: "03",
      title: "Sign one transaction",
      body: "Approve the transfer in your wallet. This broadcasts a Solana transaction. It settles on-chain in about 400 milliseconds — with a permanent Solscan link as proof.",
    },
    {
      number: "04",
      title: "Dodo Payments converts",
      body: "The moment USDC hits the Velocity smart contract, our backend sends it to Dodo Payments — a licensed payment processor. Dodo converts USDC to INR at the live rate and initiates the UPI credit.",
    },
    {
      number: "05",
      title: "Recipient gets ₹ in seconds",
      body: "The receiver's bank sends them an SMS: 'Amount credited.' They never interact with crypto. They never know. They just receive money — faster than any wire transfer in history.",
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
