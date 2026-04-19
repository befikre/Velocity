"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { VelocityLogo } from "@/components/ui/velocity-logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thin top banner */}
      <div className="w-full border-b border-white/[0.06] text-white/30 text-[10px] py-1.5 text-center tracking-[0.25em] uppercase font-[400]">
        Protocol Sandbox — Mainnet-Beta Simulation Environment
      </div>

      <nav className="relative z-50 w-full border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-syne font-[400] text-[20px] tracking-tight text-white">
            <VelocityLogo />
            Velocity
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/how-it-works" className="text-[13px] text-white/40 hover:text-white/80 transition-colors">
              How it works
            </Link>
            <Link href="/#use-cases" className="text-[13px] text-white/40 hover:text-white/80 transition-colors">
              Use cases
            </Link>
            <Link href="/about" className="text-[13px] text-white/40 hover:text-white/80 transition-colors">
              About
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/send" className="flex items-center gap-2 bg-white text-black text-[13px] font-[500] px-5 py-2 rounded-full hover:bg-white/90 transition-colors">
              Send money <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-white/50 hover:text-white transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#050505] border-b border-white/[0.06] px-6 py-6 flex flex-col gap-5">
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="text-[14px] text-white/60 hover:text-white transition-colors">How it works</Link>
            <Link href="/#use-cases" onClick={() => setOpen(false)} className="text-[14px] text-white/60 hover:text-white transition-colors">Use cases</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-[14px] text-white/60 hover:text-white transition-colors">About</Link>
            <Link href="/send" onClick={() => setOpen(false)} className="w-full text-center bg-white text-black text-[13px] font-[500] px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">
              Send money
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
