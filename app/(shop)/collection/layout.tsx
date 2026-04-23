import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection — Savvy Computers",
  description: "Browse our elite collection of handcrafted, high-performance custom PCs. From entry-level gaming to extreme workstations.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
