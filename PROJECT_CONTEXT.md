# Savvy Computers | Project Context

This document is the source of truth for the Savvy Computers e-commerce platform. It must be read at the start of every session to maintain architectural and design consistency.

## 🏢 Business Context
**Savvy Computers** is a premium, boutique custom PC builder based in Sydney. The brand positions itself as an "Artisan of Performance," focusing on high-end, handcrafted systems for elite gaming and professional simulators. 
- **Core Value:** Precision engineering meets luxury aesthetic.
- **Key Terminology:** 
  - "The Collection" (Shop)
  - "Registry" (Cart)
  - "Savvy ID" (User Account/Profile)
  - "The Forge" (System Configurator/Product Detail)

## 🛠 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (Strict mode)
- **Auth & Database:** Supabase (PostgreSQL, Auth, SSR helper)
- **Animations:** Framer Motion (Transitions/Micro-interactions), GSAP (Scroll-driven effects)
- **Icons:** Lucide React
- **Styling:** Vanilla CSS + Global Variables (No Tailwind by design)
- **State Management:** React Context (Auth, Cart)

## 🎨 Design System
The site uses a **"Dark Luxury"** aesthetic: minimal, high-contrast, and architectural.
- **Colors:**
  - Background: `#121212` (`--bg`), `#0a0a0a` (Drawers/Modals)
  - Text: `#ffffff` (`--white`), `#b0b0b0` (`--text-muted`)
  - Accent: `#ad856a` (`--accent-light`) - A sophisticated bronze/gold.
- **Typography:**
  - Headings: `Barlow Condensed` (Heavy weights, high tracking/letter-spacing)
  - Body: `Barlow`
- **Conventions:**
  - Use `text-outline` for editorial style secondary headings.
  - Buttons follow the `.btn` class patterns (Solid white vs Ghost).
  - All images use `grayscale(1)` by default, revealing color/detail on hover.

## 🔗 Permalink Architecture
- **Collection:** `/collection` (formerly /shop)
- **Product Detail:** `/systems/[slug]` (formerly /product/[slug])
- **Account:** `/account` (Dashboard)
- **Auth:** `/account/login`, `/account/register`

## 🏗 Database Schema Summary
- `products`: Core system data (name, price, slug, specs JSON, images array).
- `categories`: Gaming, Workstation, Simulator groupings.
- `product_upgrades`: Delta pricing and technical descriptions for system components.
- `orders`: Link between `users` and `products`, tracking deployment status.
- `profiles`: Extended user data (first_name, savvy_id_number).

## 📜 Standing Rules & Patterns
1. **Absolute Imports:** Always use `@/components`, `@/lib`, etc.
2. **Component Structure:** 
   - `components/common/`: Reusable primitives (Buttons, Inputs, ProductCards).
   - `components/layout/`: Global Shell (Header, Footer, MiniCart).
   - `components/home/`: Landing-page specific sections.
3. **No Placeholders:** Never use generic "Image here" blocks. Use `generate_image` or high-quality Unsplash URLs.
4. **Sign-Out Logic:** Must clear `supabase.auth` and force a hard `window.location.href = '/'` to reset all context providers.
5. **UI Density:** Maintain professional density (4-column grids on desktop, never 1-column unless mobile).

## 📍 Current Build State
- [x] Core Authentication (Supabase + AuthContext)
- [x] Permalink Reconfiguration (Systems, Collection, Account)
- [x] Dark Luxury Cart Design (Registry)
- [x] Protected Middleware (/account, /admin)
- [x] Product Detail Page with Upgrades
- [ ] Stripe Webhook Integration (Pending)
- [ ] Admin Dashboard UI (Pending)
- [ ] Order Success Flow (Pending)

## 🔄 Update Protocol
- Update the **Current Build State** after completing a task.
- Document any new **Global Variables** or **Design Tokens** added to `globals.css`.
- Add any **Major Architectural Decisions** (e.g., switching a library or changing a route structure).
