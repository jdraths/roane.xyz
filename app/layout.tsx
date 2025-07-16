import { GoogleAnalytics } from "@next/third-parties/google";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";
import { blogConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: blogConfig.title,
  description: blogConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-50 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-KGJT77SJRH" />
    </html>
  );
}
