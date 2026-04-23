'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import NewTopSellers from '@/components/home/NewTopSellers';
import Categories from '@/components/home/Categories';
import Showcase from '@/components/home/Showcase';
import SavvyStandard from '@/components/home/SavvyStandard';
import Process from '@/components/home/Process';
import Gallery from '@/components/home/Gallery';
import Benchmark from '@/components/home/Benchmark';
import Testimonials from '@/components/home/Testimonials';
import ArchiveAndSocial from '@/components/home/ArchiveAndSocial';

export default function HomePage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Hero />
      <Ticker text="PRECISION ENGINEERING // HIGH PERFORMANCE COMPUTING // HANDCRAFTED IN SYDNEY // 72H STRESS VALIDATION" />
      <NewTopSellers />
      <Categories />
      <Showcase />
      <SavvyStandard />
      <Benchmark />
      <Process />
      <Gallery />
      <Testimonials />
      <ArchiveAndSocial />
    </main>
  );
}
