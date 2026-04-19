import React from "react";
import { cn } from "@/lib/utils";

export function VelocityLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("w-6 h-6", className)} 
      {...props}
    >
      {/* High-Velocity V Shape */}
      <path d="M6 14L14 14L20 30L34 6L26 6L17 21Z" fill="url(#velocity-glow)" />
      
      {/* Liquidity Node / Transaction Dot */}
      <circle cx="28" cy="26" r="4" fill="#34d399" />
      
      <defs>
         <linearGradient id="velocity-glow" x1="6" y1="6" x2="34" y2="30" gradientUnits="userSpaceOnUse">
           <stop stopColor="#34d399"/>
           <stop offset="1" stopColor="#059669"/>
         </linearGradient>
      </defs>
    </svg>
  );
}
