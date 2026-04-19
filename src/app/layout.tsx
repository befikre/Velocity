import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppWalletProvider } from "@/components/providers/wallet-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackgroundController } from "@/components/layout/background-controller";

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  display: "swap"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Velocity | Crypto to UPI in 2 seconds",
  description: "Send USDC from your Solana wallet and it arrives as INR on any UPI ID in under 2 seconds. 0.3% flat fee. No bank account needed.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${syne.variable} ${mono.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppWalletProvider>
            <BackgroundController />
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
          </AppWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
