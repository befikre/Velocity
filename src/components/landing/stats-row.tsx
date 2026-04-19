"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function useCountUp(end: number, isFloat = false) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    let start: number;
    const duration = 1800;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(ease * end);
      if (p < 1) requestAnimationFrame(tick);
      else setVal(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);

  return { ref, value: isFloat ? val.toFixed(1) : Math.floor(val) };
}

export function StatsRow() {
  const s1 = useCountUp(125);
  const s2 = useCountUp(5.4, true);
  const s3 = useCountUp(0.3, true);
  const s4 = useCountUp(1.8, true);

  const stats = [
    { r: s1.ref, v: s1.value, suffix: "B+", label: "India remittance market", prefix: "$" },
    { r: s2.ref, v: s2.value, suffix: "%", label: "Avg fee on Wise / Remitly", prefix: "" },
    { r: s3.ref, v: s3.value, suffix: "%", label: "Velocity flat fee", prefix: "" },
    { r: s4.ref, v: s4.value, suffix: "s", label: "Average settlement time", prefix: "" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 mb-32 relative">
      {/* Security Trust Badge */}
      <div className="absolute -top-12 right-6 flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
        <svg viewBox="0 0 24 24" className="w-3 h-3 text-emerald-500 fill-current">
          <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
        </svg>
        <span className="text-[9px] font-mono uppercase tracking-[0.1em] text-emerald-500">Security: Tier 1 Audited</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/[0.06] rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <div
            key={i}
            ref={s.r}
            className={`flex flex-col p-6 md:p-8 ${i < stats.length - 1 ? "border-r border-white/[0.06]" : ""} ${i >= 2 ? "border-t border-white/[0.06] md:border-t-0" : ""}`}
          >
            <div className="font-mono text-[32px] md:text-[38px] text-white tracking-tight leading-none mb-2 tabular-nums">
              {s.prefix}{s.v}{s.suffix}
            </div>
            <div className="text-[12px] text-white/30 font-[300] leading-snug">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
