export function BusinessModel() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
      <div className="border border-white/[0.06] rounded-2xl p-8 md:p-14 bg-white/[0.015] relative overflow-hidden">

        {/* Subtle ambient glow */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mb-10">
          <div className="text-[11px] text-white/30 tracking-[0.18em] uppercase mb-4">Business model</div>
          <h2 className="font-syne font-[300] text-[34px] md:text-[42px] text-white tracking-tight leading-tight">
            Simple economics.
          </h2>
          <p className="text-[14px] font-[300] text-white/35 mt-2 max-w-md">
            One flat fee. A massive under-served market. Zero infrastructure overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 pt-8 border-t border-white/[0.05]">
          {[
            { value: "0.3%", label: "Per transfer — lower than every competitor" },
            { value: "$125B", label: "Total addressable market — India remittances" },
            { value: "32M", label: "NRIs who already own crypto and need this" },
          ].map((item, i) => (
            <div key={i}>
              <div className="font-syne font-[300] text-[40px] text-white tracking-tight leading-none mb-2">
                {item.value}
              </div>
              <div className="text-[13px] font-[300] text-white/35 leading-relaxed">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
