# VISWAA WEB — Freelance Web Development Studio

> **Modern websites that help local businesses get discovered, build trust and get more customers.**

🔗 **Live Website**: [https://viswaas-portfolio.netlify.app](https://viswaas-portfolio.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/status?site=viswaas-portfolio)](https://viswaas-portfolio.netlify.app)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

A production-grade freelance agency website designed to convert local businesses (restaurants, cafes, bakeries, retail shops, salons, gyms, tuition centres, and clinics) into paying web development clients.

---

## 🚀 Key Highlights

- **8 Authentic Business Demos**:
  - 🍽️ `/demos/restaurant` — **Spice Route** (Categorized South Indian menu, table reservation, WhatsApp takeaway)
  - ☕ `/demos/cafe` — **Brew & Bean** (Specialty coffee roastery, tasting notes, cozy aesthetic)
  - 🥐 `/demos/bakery` — **Sweet Crumbs Bakery** (Pure butter artisan bakes, custom birthday cake builder)
  - 🛒 `/demos/shop` — **Urban Mart** (Local grocery & daily essentials, quick WhatsApp grocery list order)
  - 💇‍♀️ `/demos/salon` — **Glow Studio** (Luxury salon, service rate card, appointment booking modal)
  - 🏋️‍♂️ `/demos/gym` — **Forge Fitness** (High-voltage strength club, membership tiers, free 1-day pass)
  - 🎓 `/demos/tuition` — **BrightPath Academy** (Class 8–12 CBSE/State board batches, faculty & results board)
  - 🩺 `/demos/clinic` — **CarePoint Clinic** (Family health, specialist doctor roster, OPD slot booking)
- **High-Conversion Strategy**:
  - Floating "Want a website like this? -> Get This Website" conversion banner on every demo.
  - Direct WhatsApp links with automated pre-filled messages.
  - Lead capture consultation modal with package pre-selection.
- **Engineered for Speed, Accessibility & Localization**:
  - **Website-Wide Tamil Support (தமிழ்)**: 1-click toggle between English and Tamil across all sections, navigation, pricing, FAQs, lead modal, and floating conversion CTAs, persisted in `localStorage`.
  - **Full Light & Dark Theme Support**: Smooth transitions, customized color palettes, glassmorphism, and persistent theme states.
  - Built with React 19, Vite, Tailwind CSS, Lucide icons, and modern design principles.
  - Ultra-fast bundle with sub-second production builds.

---

## 🛠️ Tech Stack & Scripts

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Modern CSS Variables
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React + Custom Brand SVGs

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
