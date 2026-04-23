'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryLayout from "@/components/layout/CategoryLayout";

export default function WorkstationsClient({ slug, initialProducts }: { slug?: string, initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const prof = slug; 
  const form = slug;

  let title = "WORKSTATION SYSTEMS";
  let subtitle = "PRECISION ENGINEERING TOOLS";
  let description = "Specialized hardware configurations optimized for intensive creative, engineering, and scientific workloads. From 4K video editing to AI training, built for zero downtime.";

  if (prof === 'content') {
    title = "CONTENT CREATION SYSTEMS";
    subtitle = "STUDIO READY";
    description = "Optimized for the Adobe Creative Cloud, DaVinci Resolve, and high-bitrate video encoding. Maximum throughput for your creative vision.";
  } else if (prof === 'cad') {
    title = "CAD & ENGINEERING SYSTEMS";
    subtitle = "PRECISION MODELING";
    description = "Certified hardware performance for SolidWorks, AutoCAD, and Revit. High-frequency processing for complex assembly and simulation tasks.";
  } else if (prof === 'ai') {
    title = "AI & MACHINE LEARNING";
    subtitle = "GPU ACCELERATED";
    description = "Massive VRAM configurations designed for LLM training, data science, and local stable diffusion workloads. Built for extreme compute density.";
  } else if (form === 'tower') {
    title = "TOWER WORKSTATIONS";
    subtitle = "INFINITE EXPANDABILITY";
    description = "Our most versatile chassis. Full-size cooling and multi-GPU support for the most demanding technical configurations.";
  } else if (form === 'compact') {
    title = "COMPACT WORKSTATIONS";
    subtitle = "SFF WORKSPACE HERO";
    description = "Professional power in a minimal footprint. Desktop-class performance designed for space-conscious technical environments.";
  } else if (form === 'rack') {
    title = "RACKMOUNT SYSTEMS";
    subtitle = "SERVER-GRADE STABILITY";
    description = "Industrial-grade rack configurations for server room integration. Designed for 24/7 compute and render-farm deployments.";
  }

  const filterGroups = [
    {
      label: 'BY PROFESSION',
      options: [
        { label: 'ALL', value: '', param: 'prof', href: '/workstations' },
        { label: 'CONTENT CREATION', value: 'content', param: 'prof', href: '/workstations/content' },
        { label: 'CAD / ENGINEERING', value: 'cad', param: 'prof', href: '/workstations/cad' },
        { label: 'AI / ML', value: 'ai', param: 'prof', href: '/workstations/ai' },
      ]
    },
    {
      label: 'BY FORM FACTOR',
      options: [
        { label: 'ALL', value: '', param: 'form', href: '/workstations' },
        { label: 'TOWER', value: 'tower', param: 'form', href: '/workstations/tower' },
        { label: 'COMPACT', value: 'compact', param: 'form', href: '/workstations/compact' },
        { label: 'RACK', value: 'rack', param: 'form', href: '/workstations/rack' },
      ]
    }
  ];

  // Filter products based on the URL slug (profession or form factor)
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
      accentColor="#ad856a"
    />
  );
}
