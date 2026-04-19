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
            title: "Simulated Environment",
            body: "Velocity is a beta-phase protocol for digital remittance simulation. Use of this application for real-world financial remittance is strictly prohibited in the current iteration. All transactions run on Solana Devnet and carry no real monetary value.",
          },
          {
            title: "No financial advice",
            body: "Nothing in this application constitutes financial or legal advice. All data provided is for simulation purposes only. The developers assume no responsibility for any misuse of the platform.",
          },
          {
            title: "Intellectual property",
            body: "The Velocity name, logo, and codebase are the property of the protocol developers. Solana, Dodo Payments, and UPI are trademarks of their respective owners. This project has no affiliation with NPCI, any Indian bank, or any financial institution.",
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
