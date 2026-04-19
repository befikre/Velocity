export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">

      <div className="flex items-center gap-3 mb-14">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">Legal</span>
        <div className="w-16 h-px bg-white/[0.05]" />
      </div>

      <h1 className="font-syne font-[300] text-[40px] md:text-[52px] text-white tracking-tight leading-[1.05] mb-5">
        Privacy & Data
      </h1>
      <p className="text-[14px] font-[300] text-white/35 mb-16 leading-relaxed">
        Last updated: April 2026
      </p>

      <div className="space-y-12">
        {[
          {
            title: "What we collect",
            body: "Velocity is a hackathon demonstration running on Solana Devnet. We do not collect KYC documentation, store personal identifiable financial data, or process real financial transactions in production. The only data stored is in your browser's localStorage — simulated transaction hashes for the demo flow.",
          },
          {
            title: "On-chain data",
            body: "Any transaction submitted via the sandbox is broadcast to Solana Devnet — a public test network. Devnet data is publicly visible on Solscan. No real funds are involved. Devnet tokens carry no monetary value.",
          },
          {
            title: "Third-party APIs",
            body: "The Dodo Payments integration used in this prototype is sandboxed. No real bank accounts are credited. No financial data leaves the local simulation layer.",
          },
          {
            title: "Your rights",
            body: "Since we store nothing server-side, there is nothing to delete or export. Clear your browser's localStorage at any time to remove all local simulation data.",
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
