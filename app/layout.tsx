import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Scroll } from "lucide-react";
import ScrollProvider from "./providers/ScrollProvider";
import { TranslationProvider } from "@/components/TranslationProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Asija & Associates LLP - Chartered Accountants",
  description: "Professional audit, tax, and advisory services across multiple industries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-[#2a2a2a]`}
      >
        <TranslationProvider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}