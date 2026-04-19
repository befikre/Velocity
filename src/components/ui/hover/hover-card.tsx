"use client";

import { ReactNode } from "react";

export function HoverCard({ children, className = "", ...props }: { children: ReactNode; className?: string; [key: string]: any }) {
  return <div className={className} {...props}>{children}</div>;
}
