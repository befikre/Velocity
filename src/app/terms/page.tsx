export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">

      <div className="flex items-center gap-3 mb-14">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">Legal</span>
        <div className="w-16 h-px bg-white/[0.05]" />
      </div>

      <h1 className="font-syne font-[300] text-[40px] md:text-[52px] text-white tracking-tight leading-[1.05] mb-5">
        Terms of Use
      </h1>
      <p className="text-[14px] font-[300] text-white/35 mb-16 leading-relaxed">
        Last updated: April 2026
      </p>

      <div className="space-y-12">
        {[
          {
            title: "Sandbox Protocol Environment",
            body: "Velocity is currently operating in a Mainnet-Beta Sandbox Environment for architectural validation and developer demonstration. Use of this protocol for live commercial remittance is strictly prohibited during the beta phase. All transactions are for simulation purposes only.",
          },
          {
            title: "Risk Acknowledgement",
            body: "Users acknowledge that decentralized protocols involve inherent risks. Velocity provides no guarantees regarding network uptime, liquidity node availability, or third-party bank rail stability during the simulation phase.",
          },
          {
            title: "Intellectual Property & Attribution",
            body: "The Velocity Protocol architecture, codebase, and branding are the intellectual property of the project developers. Solana and UPI are trademarks of their respective owners. This project is an independent demonstration and is not officially affiliated with NPCI or any Indian financial institution.",
          },
          {
            title: "Governing Law",
            body: "This protocol is governed by the standards of the decentralized web. All settlement data is managed by the underlying Solana blockchain ledger and is subject to the consensus rules of the Solana network.",
          },
        ].map((section, i) => (
          <div key={i} className="pb-10 border-b border-white/[0.05] last:border-0">
            <h2 className="font-syne font-[400] text-[18px] text-white mb-3">{section.title}</h2>
            <p className="text-[14px] font-[300] text-white/45 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
