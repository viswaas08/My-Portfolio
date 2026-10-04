# VISWAA WEB — Production Freelance Web Development Agency Platform

> **A complete, scalable commercial platform to sell, demonstrate, onboard, deploy, and maintain websites for local businesses.**

🔗 **Live Website**: [https://viswaas-portfolio.netlify.app](https://viswaas-portfolio.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/status?site=viswaas-portfolio)](https://viswaas-portfolio.netlify.app)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

An end-to-end commercial system that functions as:
1. **Professional Freelance Portfolio & Agency Showcase**
2. **Transparent Service & Pricing Website** (Starter ₹4,999, Business ₹9,999 [Most Popular], Pro Web App ₹19,999+, Website Care ₹1,499/mo, Advanced Care ₹2,999/mo)
3. **Interactive 8-Industry Demo Showroom** (`/demos/*`) with floating conversion triggers
4. **7-Step Client Onboarding System** (`/onboarding`) with Domain Ownership Charter & 50/50 payment calculation
5. **Full Executive Agency Dashboard** (`/admin`) tracking dynamic MRR, ARR, and Net Margin (MRR - Infrastructure Cost)
6. **Scalable Client Registry** (`/admin/clients`) managing 10 to 50+ clients with status timelines
7. **Hosting & Deployment Registry** (`/admin/websites`) tracking Vercel deployments, custom domains, and per-client cloud costs
8. **Lead Pipeline CRM** (`/admin/leads`) with funnel metrics and WhatsApp follow-up
9. **SEO & Health Auditor** (`/admin/seo`) with Google SERP preview and checklist
10. **Modular Node.js/Express Backend** (`backend/`) and Operations SOPs (`docs/`)

---

## 🚀 Key Highlights & Platform Architecture

### 1. Public Agency Showcase & Demos
- **8 Working Industry Demos**:
  - 🍽️ `/demos/restaurant` — **Spice Route** (Categorized South Indian menu, table reservation, WhatsApp takeaway)
  - ☕ `/demos/cafe` — **Brew & Bean** (Specialty coffee roastery, tasting notes, cozy aesthetic)
  - 🥐 `/demos/bakery` — **Sweet Crumbs Bakery** (Pure butter artisan bakes, custom birthday cake builder)
  - 🛒 `/demos/shop` — **Urban Mart** (Local grocery & daily essentials, quick WhatsApp grocery list order)
  - 💇‍♀️ `/demos/salon` — **Glow Studio** (Luxury salon, service rate card, appointment booking modal)
  - 🏋️‍♂️ `/demos/gym` — **Forge Fitness** (High-voltage strength club, membership tiers, free 1-day pass)
  - 🎓 `/demos/tuition` — **BrightPath Academy** (Class 8–12 CBSE/State board batches, faculty & results board)
  - 🩺 `/demos/clinic` — **CarePoint Clinic** (Family health, specialist doctor roster, OPD slot booking)
- **High-Conversion Triggers**:
  - Floating "Want a website like this? -> Get This Website" banner on every demo.
  - Direct WhatsApp links with automated pre-filled messages.
  - Lead capture consultation modal with package pre-selection.

### 2. Client Onboarding System (`/onboarding`)
A 7-step guided onboarding workflow:
1. **Client Contact Info**: Name, designation, verified WhatsApp and email.
2. **Business Profile**: Category, physical location, opening hours, story.
3. **Package & Care Plan Selection**: Auto-calculates 50% advance and monthly care amounts.
4. **Content Requirement Checklist**: Logo, menu, photos, social profiles.
5. **Asset Ownership Charter**: Strict legal clarity separating **Client-Owned Assets** (Domain, Google Business Profile, Email, Content) from **Freelancer-Managed Code & Hosting**.
6. **Payment Agreement**: 50% advance before development, 50% before final DNS handover.
7. **Automated Submission**: Immediately updates registry and generates a 1-click WhatsApp handoff receipt.

### 3. Executive Agency Admin Suite (`/admin`)
- **Passcode Protected**: Access via `/admin/login` (Default passcode: `admin2026`).
- **Dynamic Financial Metrics**:
  - Total Clients, Active Live Websites, Maintenance Subscriptions.
  - Gross MRR (Monthly Recurring Revenue) & ARR.
  - Per-client Variable Infrastructure Cost Recording.
  - **Net Recurring Margin** ($\text{MRR} - \text{Total Infrastructure Cost}$).
  - Pending 50% Balance Receivables.
  - Domain Expiry Alert Countdown (30, 14, 7, and 3-day notifications).
- **Client & Project Registry (`/admin/clients`)**:
  - Search, filter by business type, and filter by project pipeline status.
  - Visual status timeline: `Lead → Contacted → Discussion → Quoted → Advance Paid → Development → Client Review → Revision → Deployed → Maintenance → Completed`.
  - Add client, edit profile, and inspect complete client dossier.
- **Hosting & Deployment Management (`/admin/websites`)**:
  - Track Vercel project name, GitHub repo, deployment status, and SSL certificates.
  - Record per-client monthly infrastructure expenses.
- **Lead Pipeline CRM (`/admin/leads`)**:
  - Funnel metrics, conversion rate, and expected pipeline value.
  - Quick WhatsApp follow-up button and status updates.
- **SEO & Website Health Management (`/admin/seo`)**:
  - Edit title & meta descriptions with live Google Search snippet preview.
  - Interactive technical verification checklist (Mobile responsive, Sitemap, Robots.txt, Search Console, Google Business Profile, NAP consistency).

---

## 📚 Standard Operating Procedures (SOPs)

Detailed operations manuals are located in `docs/`:
- [`deployment.md`](./docs/deployment.md) — Local run, Vercel/Netlify deployment, custom domains, DNS, and preview vs production branches.
- [`client-onboarding.md`](./docs/client-onboarding.md) — 7-step workflow, domain ownership charter, and 50/50 payment model.
- [`pricing.md`](./docs/pricing.md) — Commercial tiers, inclusions, limits, and ethics policies (no false ranking promises).
- [`maintenance.md`](./docs/maintenance.md) — Website Care vs Advanced Care, infrastructure cost accounting, and surge protection.
- [`business-operations.md`](./docs/business-operations.md) — Scaling to 50+ clients, domain renewals, site migrations, and Google Search Console / GBP guides.

---

## 🛠️ Tech Stack & Scripts

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + React Router
- **Backend API**: Node.js + Express + MongoDB (Mongoose) + JWT Auth + Helmet + Rate Limiter
- **Storage**: Persistent LocalStorage with seed data + optional MongoDB REST API

### Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Create production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

```env
VITE_WHATSAPP_NUMBER=916382450849
VITE_EMAIL=viswaas08@gmail.com
VITE_GITHUB_URL=https://github.com/viswaas08
VITE_LINKEDIN_URL=https://www.linkedin.com/in/viswaa-s-69a49a1ba
```

---

## 📝 Configuration & Customization Guide

All prices, contact details, services, demos, and portfolio projects are decoupled from the UI into clean data files in `src/config/` and `src/data/`:

### 1. How to Change Prices & Packages
Edit [src/data/pricing.ts](file:///e:/2026/PORTFOLIO%20WEBSITE/src/data/pricing.ts):
- Update `price: "₹4,999"`, `delivery: "5–7 days"`, `revisions: "2 rounds"`, or modify feature bullet points.
- You can also update the service starting prices in [src/data/services.ts](file:///e:/2026/PORTFOLIO%20WEBSITE/src/data/services.ts).

### 2. How to Change Your WhatsApp Number or Email
Edit `.env` (or [src/config/siteConfig.ts](file:///e:/2026/PORTFOLIO%20WEBSITE/src/config/siteConfig.ts)):
- In `.env`:
  ```env
  VITE_WHATSAPP_NUMBER=919876543210
  VITE_EMAIL=yourname@example.com
  ```
- All WhatsApp buttons across the agency and demo pages will automatically generate direct links with the new number.

### 3. How to Add Another Business Demo
1. Add demo metadata in [src/data/demos.ts](file:///e:/2026/PORTFOLIO%20WEBSITE/src/data/demos.ts) (business name, route, description, preview image, recommended package).
2. Create your demo page component in `src/pages/demos/YourNewDemo.tsx` (include `<DemoFloatingCTA />` at the bottom).
3. Register the route in [src/App.tsx](file:///e:/2026/PORTFOLIO%20WEBSITE/src/App.tsx):
   ```tsx
   <Route path="/demos/your-new-demo" element={<YourNewDemo />} />
   ```

### 4. How to Update Technical Portfolio Projects
Edit [src/data/projects.ts](file:///e:/2026/PORTFOLIO%20WEBSITE/src/data/projects.ts):
- Modify title, problem, solution, technology stack, features list, live link, or GitHub repository URL.

---

## 🌐 Deployment Guides

### Option A: Deploy to Netlify (Recommended)

#### Method 1: Via GitHub (Continuous Deployment)
1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: setup Netlify deployment with SPA redirects"
   git push origin main
   ```
2. **Link with Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com) and click **"Add new site"** > **"Import an existing project"**.
   - Select **GitHub** and pick your repository.
   - Build settings will automatically detect [`netlify.toml`](file:///e:/2026/PORTFOLIO%20WEBSITE/netlify.toml):
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
3. **Set Environment Variables on Netlify**:
   - Go to **Site Configuration** > **Environment variables** > **Add a variable**:
     - `VITE_WHATSAPP_NUMBER`: `916382450849`
     - `VITE_EMAIL`: `viswaas08@gmail.com`
     - `VITE_GITHUB_URL`: `https://github.com/viswaas08`
     - `VITE_LINKEDIN_URL`: `https://www.linkedin.com/in/viswaa-s-69a49a1ba`
4. Click **Deploy Site**.

#### Method 2: Instant Deploy via Netlify CLI
Run this directly in your terminal:
```bash
# Login to your Netlify account (opens browser)
npx netlify login

# Deploy production bundle
npx netlify deploy --prod --dir=dist
```

#### Method 3: Netlify Drop (Manual Drag & Drop)
1. Run `npm run build` locally.
2. Drag and drop the generated `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

---

### Option B: Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```
2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new) and import the repository.
   - Select **Vite** as framework preset.
   - Set environment variables (`VITE_WHATSAPP_NUMBER`, `VITE_EMAIL`).
   - Click **Deploy**. (Handled by [`vercel.json`](file:///e:/2026/PORTFOLIO%20WEBSITE/vercel.json)).

---

## 📄 License
© 2026 Viswaa Web. All rights reserved.
