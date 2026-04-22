'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryLayout from "@/components/layout/CategoryLayout";

export default function GamingClient({ slug, initialProducts }: { slug?: string, initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const res = slug; 
  const style = slug; 

  let title = "GAMING SYSTEMS";
  let subtitle = "ELITE COMPETITIVE PERFORMANCE";
  let description = "Precision-engineered for high-frame-rate competitive gaming and immersive 4K experiences. Stress-tested for 72 hours to ensure peak stability during elite gameplay.";

  if (res === '1080p') {
    title = "1080P GAMING SYSTEMS";
    subtitle = "ESPORT READY";
    description = "Tuned for maximum frame rates and zero latency. The perfect systems for competitive shooters where every millisecond counts.";
  } else if (res === '1440p') {
    title = "1440P GAMING SYSTEMS";
    subtitle = "THE SWEET SPOT";
    description = "The perfect balance of visual fidelity and high performance. Enjoy incredibly crisp textures without sacrificing your frame rate.";
  } else if (res === '4k') {
    title = "4K PERFORMANCE SYSTEMS";
    subtitle = "FUTURE PROOF";
    description = "Uncompromising power. Drive maximum settings at 4K resolution with ray tracing enabled for the ultimate immersive experience.";
  } else if (res === '8k') {
    title = "8K ULTIMATE SYSTEMS";
    subtitle = "ULTIMATE FIDELITY";
    description = "The bleeding edge of PC hardware. Extreme setups designed for those who demand the absolute best technology available today.";
  } else if (style === 'stealth') {
    title = "STEALTH GAMING SYSTEMS";
    subtitle = "ZERO RGB, ALL POWER";
    description = "Pure, understated, dark aesthetic. No distractions, just immense processing power wrapped in an elegant matte black chassis.";
  } else if (style === 'rgb') {
    title = "RGB ELITE SYSTEMS";
    subtitle = "INFINITE SPECTRUM";
    description = "Fully customizable addressable RGB lighting. Make your system a glowing centerpiece with perfectly synchronized lighting effects.";
  } else if (style === 'compact') {
    title = "COMPACT GAMING SYSTEMS";
    subtitle = "SMALL FORM FACTOR";
    description = "SFF masterpieces that deliver full desktop-class gaming performance in a fraction of the footprint.";
  }

  const filterGroups = [
    {
      label: 'BY RESOLUTION',
      options: [
        { label: 'ALL', value: '', param: 'res', href: '/gaming' },
        { label: '1080P', value: '1080p', param: 'res', href: '/gaming/1080p' },
        { label: '1440P', value: '1440p', param: 'res', href: '/gaming/1440p' },
        { label: '4K', value: '4k', param: 'res', href: '/gaming/4k' },
        { label: '8K', value: '8k', param: 'res', href: '/gaming/8k' },
      ]
    },
    {
      label: 'BY STYLE',
      options: [
        { label: 'ALL', value: '', param: 'style', href: '/gaming' },
        { label: 'STEALTH', value: 'stealth', param: 'style', href: '/gaming/stealth' },
        { label: 'RGB', value: 'rgb', param: 'style', href: '/gaming/rgb' },
        { label: 'COMPACT', value: 'compact', param: 'style', href: '/gaming/compact' },
      ]
    }
  ];

  // Filter products based on the URL slug (resolution or style)
  const filteredBySlug = React.useMemo(() => {
    if (!slug) return initialProducts;
    
    return initialProducts.filter(p => {
      const tags = (p.tags || []).map((t: string) => t.toLowerCase());
      const name = p.name.toLowerCase();
      const description = p.description?.toLowerCase() || '';
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
