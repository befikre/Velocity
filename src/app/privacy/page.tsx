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
            title: "Data Sovereignty",
            body: "Velocity is a decentralized remittance simulation running on the Solana network. We do not maintain centralized databases of personal identifiable information (PII). All transaction history is stored locally within your browser's encrypted state (localStorage) for architectural demonstration purposes.",
          },
          {
            title: "On-chain Transparency",
            body: "Transactions broadcast via the Velocity Protocol are recorded on the Solana blockchain. While these transactions are currently routed through the Mainnet-Beta Sandbox for simulation, they adhere to public ledger standards. Users should be aware that on-chain data is immutable and publicly verifiable.",
          },
          {
            title: "Network Nodes & Settlement",
            body: "Velocity utilizes a distributed network of liquidity nodes for payout fulfillment. No real financial data is processed on-chain beyond the standard SPL-Token transaction signatures required by the Solana network for asset movement.",
          },
          {
            title: "User Control",
            body: "Since Velocity operates as a client-side protocol with no persistent server-side storage, users maintain absolute control over their session data. Clearing your browser's local storage will instantly remove all trace of your simulation history.",
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
