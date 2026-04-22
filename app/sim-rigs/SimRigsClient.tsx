'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryLayout from "@/components/layout/CategoryLayout";

export default function SimRigsClient({ slug, initialProducts }: { slug?: string, initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const type = slug; 

  let title = "SIMULATION SYSTEMS";
  let subtitle = "IMMERSE IN PRECISION";
  let description = "Ultra-low latency configurations designed specifically for high-frequency feedback loops in racing and flight simulation. Engineered for maximum immersion and zero frame-drops.";

  if (type === 'racing') {
    title = "RACING BUNDLES";
    subtitle = "PRO COCKPITS & CHASSIS";
    description = "Optimized for Assetto Corsa, iRacing, and F1. High-frequency processing for direct-drive wheel bases and motion platform synchronization.";
  } else if (type === 'flight') {
    title = "FLIGHT SYSTEMS";
    subtitle = "FULL AVIONIC CONTROL";
    description = "Built for MSFS 2020 and X-Plane. Optimized for massive texture streaming and multi-monitor instrument panels with extreme stability.";
  }

  const filterGroups = [
    {
      label: 'SIMULATORS',
      options: [
        { label: 'ALL', value: '', param: 'type', href: '/sim-rigs' },
        { label: 'RACING BUNDLES', value: 'racing', param: 'type', href: '/sim-rigs/racing' },
        { label: 'FLIGHT SYSTEMS', value: 'flight', param: 'type', href: '/sim-rigs/flight' },
      ]
    }
  ];

  // Filter products based on the URL slug (racing or flight)
  const filteredBySlug = React.useMemo(() => {
    if (!slug) return initialProducts;
    
    return initialProducts.filter(p => {
      const tags = (p.tags || []).map((t: string) => t.toLowerCase());
      const name = p.name.toLowerCase();
      const description = p.desc?.toLowerCase() || p.shortDesc?.toLowerCase() || '';
      const s = slug.toLowerCase();

      // Check if slug matches any tags, name, or description
      return tags.includes(s) || name.includes(s) || description.includes(s);
    });
  }, [slug, initialProducts]);

  return (
    <CategoryLayout 
      title={title}
      subtitle={subtitle}
      description={description}
      products={filteredBySlug}
      filterGroups={filterGroups}
    />
  );
}
