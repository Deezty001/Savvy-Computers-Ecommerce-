export interface Product {
  id: string;
  name: string;
  slug: string;
  series: string;
  desc: string;
  price: number;
  salePrice?: number;
  tag: string;
  category: 'gaming' | 'workstation' | 'sim' | 'custom';
  shortDesc: string;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard?: string;
    psu?: string;
    cooler?: string;
    case?: string;
  };
  images: string[];
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: 'apex-core',
    name: 'APEX CORE',
    slug: 'apex-core',
    series: '* The Entry Standard',
    desc: 'AMD Ryzen 7 / RTX 4060 Ti. Tuned for 1440p gaming and everyday creative work, without compromise.',
    shortDesc: 'A perfect balance of price and performance, handcrafted in Sydney for the uncompromising minimalist.',
    price: 2499,
    tag: 'Core Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'AMD Ryzen 7 7700X',
      gpu: 'NVIDIA RTX 4060 Ti 8GB',
      ram: '32GB DDR5 6000MHz',
      storage: '1TB Gen4 NVMe SSD',
      motherboard: 'B650 ITX / Micro-ATX',
      psu: '750W 80+ Gold SFX'
    },
    images: [],
    stock: 12
  },
  {
    id: 'apex-pro',
    name: 'APEX PRO',
    slug: 'apex-pro',
    series: '* The Performance Standard',
    desc: 'Intel i9 / RTX 4080 Super. Dominant 4K gaming, stream-ready, sim-optimised.',
    shortDesc: 'Our most popular build, delivering elite 4K performance in a signature stealth-black aesthetic.',
    price: 4299,
    tag: 'Performance Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'Intel Core i9-14900K',
      gpu: 'NVIDIA RTX 4080 Super 16GB',
      ram: '64GB DDR5 6400MHz',
      storage: '2TB Gen4 NVMe SSD',
      motherboard: 'Z790 ATX Stealth',
      psu: '1000W 80+ Gold'
    },
    images: [],
    stock: 5
  },
  {
    id: 'apex-ws',
    name: 'APEX WS',
    slug: 'apex-ws',
    series: '* The Workstation',
    desc: 'Threadripper / RTX 4090 / 128GB ECC RAM. For professionals who cannot afford to slow down.',
    shortDesc: 'Precision compute for 3D rendering, simulation, and high-frequency data workloads.',
    price: 7999,
    tag: 'Workstation Series',
    category: 'workstation',
    featured: true,
    specs: {
      cpu: 'AMD Threadripper 7960X',
      gpu: 'NVIDIA RTX 4090 24GB',
      ram: '128GB ECC DDR5',
      storage: '4TB Gen5 NVMe SSD',
      motherboard: 'TRX50 Workstation',
      psu: '1200W Platinum'
    },
    images: [],
    stock: 3
  },
  {
    id: 'apex-slim',
    name: 'APEX SLIM',
    slug: 'apex-slim',
    series: '* SFF Excellence',
    desc: 'Intel i7 / RTX 4070 / 32GB RAM. Maximum power in a minimal footprint.',
    shortDesc: 'A Small Form Factor (SFF) masterpiece, engineered for desk-space efficiency without thermal throttling.',
    price: 3199,
    tag: 'SFF Series',
    category: 'gaming',
    specs: {
      cpu: 'Intel Core i7-14700K',
      gpu: 'NVIDIA RTX 4070 12GB',
      ram: '32GB DDR5 5600MHz',
      storage: '2TB Gen4 NVMe SSD',
      motherboard: 'Z790-I Gaming Wifi',
      psu: '750W 80+ Platinum SFX'
    },
    images: [],
    stock: 8
  },
  {
    id: 'axis-pro',
    name: 'AXIS PRO',
    slug: 'axis-pro',
    series: '* Elite Series',
    desc: 'The ultimate frame-rate machine. Hand-selected components for the competitive edge.',
    shortDesc: 'A flagship high-performance build featuring the massive RTX 4090 for zero-compromise 4K gaming.',
    price: 3499,
    tag: 'Elite Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA RTX 4090 24GB',
      ram: '64GB DDR5 6000MHz',
      storage: '4TB Samsung 990 Pro'
    },
    images: [],
    stock: 2
  },
  {
    id: 'orion-elite',
    name: 'ORION ELITE',
    slug: 'orion-elite',
    series: '* Performance Series',
    desc: 'Intel i7 power meets RTX 4080 Super precision.',
    shortDesc: 'The sweet spot for high-refresh 1440p and 4K gaming in a signature stealth aesthetic.',
    price: 2899,
    tag: 'Performance Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'Intel Core i7-14700K',
      gpu: 'NVIDIA RTX 4080 SUPER 16GB',
      ram: '32GB DDR5 6000MHz',
      storage: '2TB Gen5 NVMe SSD'
    },
    images: [],
    stock: 5
  },
  {
    id: 'ares-mini',
    name: 'ARES MINI',
    slug: 'ares-mini',
    series: '* Compact Series',
    desc: 'Maximum density. Uncompromising small form factor power.',
    shortDesc: 'Artisan SFF engineering that fits full-size performance into a fraction of the space.',
    price: 2199,
    tag: 'Compact Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'Intel Core i5-14600K',
      gpu: 'NVIDIA RTX 4070 Ti 12GB',
      ram: '16GB DDR5 5600MHz',
      storage: '1TB NVMe SSD'
    },
    images: [],
    stock: 7
  },
  {
    id: 'kronos-core',
    name: 'KRONOS',
    slug: 'kronos',
    series: '* Core Series',
    desc: 'The entry to elite performance. Tuned for the competitive standard.',
    shortDesc: 'Exceptional 1440p performance without the premium price tag.',
    price: 1899,
    tag: 'Core Series',
    category: 'gaming',
    featured: true,
    specs: {
      cpu: 'AMD Ryzen 5 7600',
      gpu: 'NVIDIA RTX 4070 SUPER 12GB',
      ram: '32GB DDR5 5200MHz',
      storage: '1TB Gen4 NVMe SSD'
    },
    images: [],
    stock: 10
  },
  {
    id: 'sim-racer-o1',
    name: 'SIM-RACER ONE',
    slug: 'sim-racer-one',
    series: '* Sim-Optimised',
    desc: 'AMD Ryzen 7 7800X3D / RTX 4080. The ultimate frame-rate machine for sim racing.',
    shortDesc: 'Purpose-built for zero-latency, high-refresh racing. Optimized for triple 1440p or ultra-wide displays.',
    price: 5499,
    tag: 'Simulation Series',
    category: 'sim',
    specs: {
      cpu: 'AMD Ryzen 7 7800X3D',
      gpu: 'NVIDIA RTX 4080 Super 16GB',
      ram: '32GB DDR5 6000MHz CL30',
      storage: '1TB Gen5 NVMe SSD',
      motherboard: 'X670E Carbon Wifi',
      psu: '850W 80+ Gold'
    },
    images: [],
    stock: 4
  },
  {
    id: 'bespoke-01',
    name: 'SAVVY BESPOKE',
    slug: 'savvy-bespoke',
    series: '* Handcrafted Luxury',
    desc: 'Fully custom spec / Dual RTX 4090 / Custom Loop. The pinnacle of craftsmanship.',
    shortDesc: 'A completely unique commission. Custom liquid cooling, bespoke cable management, and exclusive chassis modifications.',
    price: 14999,
    tag: 'Signature Series',
    category: 'custom',
    specs: {
      cpu: 'Intel Core i9-14900KS',
      gpu: '2x NVIDIA RTX 4090 24GB',
      ram: '192GB DDR5 5200MHz',
      storage: '8TB Gen5 NVMe (RAID 0)',
      motherboard: 'ROG Maximus Z790 Extreme',
      psu: '1600W Titanium'
    },
    images: [],
    stock: 1
  }
];

export const categories = [
  { id: 'all', name: 'All Systems' },
  { id: 'gaming', name: 'Gaming Rigs' },
  { id: 'workstation', name: 'Workstations' },
  { id: 'sim', name: 'Sim Rigs' },
  { id: 'custom', name: 'Custom Builds' }
];
