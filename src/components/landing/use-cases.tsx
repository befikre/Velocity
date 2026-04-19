export function UseCases() {
  const cases = [
    {
      number: "01",
      title: "Send gifts home",
      body: "Birthday, Diwali, wedding money. Arrives in your family's bank before you finish typing.",
      tag: "NRI · Family",
    },
    {
      number: "02",
      title: "Get paid globally",
      body: "Your client sends USDC. You receive ₹ INR in your UPI account. No exchange desk. No wait.",
      tag: "Freelancers · Remote",
    },
    {
      number: "03",
      title: "Pay anywhere in India",
      body: "Scan any UPI QR. You pay in crypto — they receive rupees. They never even know.",
      tag: "Tourists · Travelers",
    },
  ];

  return (
    <section id="use-cases" className="max-w-6xl mx-auto px-6 mb-28 scroll-mt-24">

      <div className="flex items-center gap-3 mb-12">
        <span className="text-[11px] font-[400] text-white/30 tracking-[0.18em] uppercase">Use cases</span>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cases.map((card, i) => (
          <div
            key={i}
            className="group flex flex-col h-full border border-white/[0.06] rounded-2xl p-7 bg-white/[0.015] hover:bg-white/[0.03] hover:border-white/[0.12] transition-all duration-300 cursor-default"
          >
            <div className="font-syne font-[300] text-[13px] text-white/20 mb-6">{card.number}</div>
            <h3 className="font-syne font-[400] text-[18px] text-white mb-3 tracking-tight leading-snug">
              {card.title}
            </h3>
            <p className="text-[13px] font-[300] text-white/40 leading-relaxed flex-grow">
              {card.body}
            </p>
            <div className="mt-8 pt-5 border-t border-white/[0.05]">
              <span className="text-[10px] font-[400] text-white/30 tracking-[0.15em] uppercase">
                {card.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
