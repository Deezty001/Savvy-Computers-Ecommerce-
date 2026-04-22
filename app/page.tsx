import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Showcase from "@/components/home/Showcase";
import TopSellers from "@/components/home/TopSellers";
import SavvyStandard from "@/components/home/SavvyStandard";
import NvidiaRow from "@/components/home/NvidiaRow";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Hero />
        <Categories />
        <Showcase />
        <TopSellers />
        <SavvyStandard />
        <NvidiaRow />
        <Testimonials />
        <Gallery />
      </div>
    </main>
  );
}
