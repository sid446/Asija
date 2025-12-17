import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Scroll } from "lucide-react";
import ScrollProvider from "./providers/ScrollProvider";
import { TranslationProvider } from "@/components/TranslationProvider";
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from "@/components/AuthProvider";
import DisclaimerModal from "@/components/DisclaimerModal";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Asija & Associates LLP - Chartered Accountants",
  description: "Professional audit, tax, and advisory services across multiple industries",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <ThemeProvider>
            <TranslationProvider>
              <ScrollProvider>
                <DisclaimerModal />
                {children}
              </ScrollProvider>
            </TranslationProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}