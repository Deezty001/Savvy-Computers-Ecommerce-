import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import React from "react";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { CartProvider } from "@/lib/cart/CartContext";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-b",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-d",
});

export const metadata: Metadata = {
  title: "Savvy Computers — High-Performance Custom PCs & Workstations",
  description: "Handcrafted in Sydney. Precision-engineered gaming PCs, workstations, and sim rigs. Experience the ultimate in thermal efficiency and aesthetic perfection.",
  keywords: ["gaming pc", "workstation", "sim rig", "custom pc australia", "savvy computers", "sydney pc build"],
  openGraph: {
    title: "Savvy Computers — Precision Engineering",
    description: "The standard in high-performance computing. Sydney's premier custom PC boutique.",
    type: "website",
    locale: "en_AU",
    url: "https://savvycomputers.com.au",
    siteName: "Savvy Computers",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${barlow.variable} ${barlowCondensed.variable}`} style={{ 
        background: 'var(--bg)', 
        color: 'var(--text)', 
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        margin: 0,
        padding: 0,
        overflowX: 'hidden'
      }}>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
