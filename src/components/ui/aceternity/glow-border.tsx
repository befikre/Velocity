"use client";

import { ReactNode } from "react";

export function GlowBorder({ children, className = "", color = "#fff" }: { children: ReactNode; className?: string; color?: string }) {
  return <div className={className}>{children}</div>;
}
