import Link from "next/link";
import { VelocityLogo } from "@/components/ui/velocity-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2">
          <VelocityLogo className="w-4 h-4" />
          <span className="font-syne font-[300] text-[16px] text-white/60">Velocity</span>
          <span className="text-white/15 text-[12px]">·</span>
          <span className="text-[11px] text-white/25 font-[300]">Velocity Protocol © 2026</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/about" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-[300]">
            About
          </Link>
          <Link href="/how-it-works" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-[300]">
            How it works
          </Link>
          <Link href="/privacy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-[300]">
            Privacy
          </Link>
          <Link href="/terms" className="text-[12px] text-white/30 hover:text-white/60 transition-colors font-[300]">
            Terms
          </Link>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-white/20 font-[300]">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
          Built on Solana
        </div>

      </div>
    </footer>
  );
}
