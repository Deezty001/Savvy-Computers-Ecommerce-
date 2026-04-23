import * as React from "react";
import { Metadata } from "next";
import { products } from "@/lib/data/products";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Product Not Found — Savvy Computers",
    };
  }

  return {
    title: `${product.name} — Savvy Computers`,
    description: product.shortDesc || product.desc,
    openGraph: {
      title: `${product.name} | Precision-Engineered PC`,
      description: product.shortDesc,
      type: "website",
    },
  };
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>;
}
