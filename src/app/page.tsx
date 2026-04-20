import Link from "next/link";
import { StatsRow } from "@/components/landing/stats-row";
import { PaymentBeam } from "@/components/landing/payment-beam";
import { Highlighter } from "@/components/ui/magicui/highlighter";
import { Globe3DDemo } from "@/components/landing/globe-demo";
import { GlobalMap } from "@/components/landing/global-map";
import { NumberTicker } from "@/components/ui/magicui/number-ticker";
import { UseCases } from "@/components/landing/use-cases";
import { ComparisonTable } from "@/components/landing/comparison-table";
import { BusinessModel } from "@/components/landing/business-model";

function Hero() {
  return (
    <section className="w-full pt-12 pb-10 md:pt-16 md:pb-16 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 mb-6 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full">
                <div className="flex items-center justify-center size-4 rounded-full bg-emerald-500/20 border border-emerald-500/50">
                   <span className="text-[10px] font-bold text-emerald-400">⚡</span>
                </div>
                <span className="text-[10px] font-[500] text-emerald-500/80 tracking-[0.2em] uppercase">
                  Protocol Sandbox — Mainnet-Beta Simulation Environment
                </span>
              </div>

            <h1 className="font-syne font-[300] text-[48px] md:text-[60px] leading-[1.06] tracking-[-1.5px] text-white mb-5 z-10">
              Move money<br />
              to India.<br />
              <Highlighter action="highlight" color="rgba(16, 185, 129, 0.4)" strokeWidth={2}>
                <span className="text-white/80 font-[400] px-2">In seconds.</span>
              </Highlighter>
            </h1>

            <p className="text-[15px] font-[300] text-white/40 leading-[1.75] max-w-[360px] mb-9">
              Send USDC from your wallet. Arrives as ₹ INR on any UPI ID. No bank, no delay, no paperwork.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
              <Link href="/send" className="bg-white text-black text-[14px] font-[600] px-8 py-4 rounded-2xl hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
                Transfer now →
              </Link>
              <Link href="/how-it-works" className="text-[14px] font-[500] text-white/50 px-8 py-4 rounded-2xl border border-white/[0.1] hover:bg-white/[0.05] hover:text-white transition-all">
                The Protocol
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center md:justify-start gap-8 md:gap-10 mt-12 pt-10 border-t border-white/[0.05] w-full mx-auto md:mx-0">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="font-syne font-[300] text-[32px] md:text-[28px] text-white leading-none flex items-baseline">
                  <NumberTicker value={1.8} decimalPlaces={1} className="text-white font-mono" />
                  <span className="font-mono ml-1">s</span>
                </div>
                <div className="text-[10px] text-white/20 tracking-widest mt-2 uppercase font-[500]">Settlement</div>
              </div>
              <div className="hidden md:block w-px bg-white/[0.08]" />
              <div className="w-full h-px md:hidden bg-white/[0.04] max-w-[100px]" />
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="font-syne font-[300] text-[32px] md:text-[28px] text-white leading-none flex items-baseline">
                  <NumberTicker value={0.3} decimalPlaces={1} className="text-white font-mono" />
                  <span className="font-mono ml-1">%</span>
                </div>
                <div className="text-[10px] text-white/20 tracking-widest mt-2 uppercase font-[500]">Fixed Fee</div>
              </div>
              <div className="hidden md:block w-px bg-white/[0.08]" />
              <div className="w-full h-px md:hidden bg-white/[0.04] max-w-[100px]" />

              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="font-syne font-[300] text-[32px] md:text-[28px] text-white leading-none flex items-baseline">
                  <span className="font-mono mr-1">$</span>
                  <NumberTicker value={125} className="text-white font-mono" />
                  <span className="font-mono ml-1">B</span>
                </div>
                <div className="text-[10px] text-white/20 tracking-widest mt-2 uppercase font-[500]">Market</div>
              </div>
            </div>
          </div>

          {}
          <div className="relative flex items-center justify-center min-h-[350px] md:min-h-[450px]">
            <div className="absolute inset-0 flex items-center justify-center z-0">
               <Globe3DDemo />
            </div>

            {}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return <div className="w-full max-w-6xl mx-auto px-6"><div className="h-px bg-white/[0.04]" /></div>;
}

function SectionWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}

function CtaSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-8 mt-4">
      <div className="border border-white/[0.06] rounded-2xl px-8 md:px-14 py-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h2 className="font-syne font-[300] text-[32px] md:text-[42px] text-white tracking-tight leading-tight mb-2">
            Ready to send?
          </h2>
          <p className="text-[14px] font-[300] text-white/35">
            It takes 30 seconds. No account. No ID. Just a wallet.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <Link href="/send" className="bg-white text-black text-[13px] font-[500] px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap">
            Open sandbox →
          </Link>
          <Link href="/how-it-works" className="text-[13px] font-[400] text-white/35 hover:text-white/60 transition-colors px-4 py-3.5 whitespace-nowrap">
            Learn how it works
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <SectionWrap>
        <div className="pt-16 pb-4">
          <PaymentBeam />
        </div>
      </SectionWrap>
      <Divider />
      <div className="pt-16">
        <StatsRow />
      </div>
      <Divider />
      <SectionWrap>
        <div className="pt-16 pb-4">
          <UseCases />
        </div>
      </SectionWrap>
      <Divider />
      <div className="pt-16">
        <ComparisonTable />
      </div>
      <Divider />
      <SectionWrap>
        <div className="pt-16 pb-4">
          <BusinessModel />
        </div>
      </SectionWrap>
      <Divider />
      <div className="pt-16">
        <GlobalMap />
      </div>
      <Divider />
      <div className="pt-16 pb-8">
        <CtaSection />
      </div>
    </>
  );
}
