// @ts-nocheck
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Ticker from "@/components/home/Ticker";
import Categories from "@/components/home/Categories";
import Benchmark from "@/components/home/Benchmark";
import Systems from "@/components/home/Systems";
import Process from "@/components/home/Process";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import Showcase from "@/components/home/Showcase";
import TopSellers from "@/components/home/TopSellers";

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
        <Hero />
        <Ticker text="PRECISION CRAFTED PERFORMANCE * CUSTOMIZE YOUR ELITE RIG * ENGINEERED FOR SUPREMACY" />
        <Categories />
        <Showcase />
        <TopSellers />
        <Process />
        <Gallery />
        <Testimonials />
      </div>
    </main>
  );
}
