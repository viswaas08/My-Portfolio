export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  numericPrice?: number;
  period?: string;
  popular?: boolean;
  tagline: string;
  bestFor: string;
  idealFor?: string[];
  delivery: string;
  revisions: string;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
  recommendedDemoId?: string;
}

// 3 Main Plan Tiles + 1 Separate Custom Build Tile
export const pricingPackages: PricingTier[] = [
  {
    id: "static-landing",
    name: "Static Web Page / Landing Page",
    badge: "Fast Launch",
    price: "₹2,999",
    numericPrice: 2999,
    tagline: "High-impact, mobile-optimized single page designed to capture local leads and drive instant WhatsApp calls.",
    bestFor: "Single-service providers, local shops, product promotions, portfolio showcases, and quick launches.",
    idealFor: ["Local Retailers", "Clinics", "Freelancers", "Home Businesses", "Promotions"],
    delivery: "2–3 days",
    revisions: "2 rounds",
    features: [
      "100% Mobile-first responsive single-page design",
      "Compelling Hero section with direct Call-to-Action",
      "Services or product showcase with clean pricing",
      "One-tap instant WhatsApp direct chat button",
      "Click-to-call phone and email contact triggers",
      "Interactive Google Maps store location integration",
      "Social media links integration",
      "Basic on-page SEO meta tags setup",
      "Fast cloud hosting deployment (Netlify / Vercel)"
    ],
    ctaText: "Choose Landing Page",
    whatsappMessage: "Hi Viswaas, I want to get started with the Static Web Page / Landing Page plan (₹2,999) for my business.",
    recommendedDemoId: "shop"
  },
  {
    id: "business",
    name: "Business Plan (All Features)",
    badge: "High Conversion",
    price: "₹7,999",
    numericPrice: 7999,
    popular: true,
    tagline: "Comprehensive multi-page digital presence equipped with all interactive features, digital catalog, and local SEO.",
    bestFor: "Restaurants, cafes, bakeries, salons, gyms, dental clinics, and growing local brand storefronts.",
    idealFor: ["Restaurants", "Cafes", "Salons", "Bakeries", "Gyms & Studios"],
    delivery: "5–7 days",
    revisions: "3 rounds",
    features: [
      "5–7 Premium responsive pages / dedicated sections",
      "Custom branding, typography, and tailored aesthetic theme",
      "Interactive Digital Menu / catalog with categories & filters",
      "High-resolution photo gallery for ambience, dishes & products",
      "Integrated WhatsApp food ordering & table booking forms",
      "Interactive Google Maps integration with 1-tap directions",
      "Live opening hours widget & weekly timing indicator",
      "Customer reviews, ratings, and trust badge highlights",
      "Local SEO optimization, Sitemap.xml & Open Graph preview tags",
      "Speed & Core Web Vitals optimization for instant mobile loading",
      "Custom domain connection guidance (.com / .in)",
      "14 days dedicated post-launch support"
    ],
    ctaText: "Choose Business Plan",
    whatsappMessage: "Hi Viswaas, I want to choose the Business Plan with All Features (₹7,999 - Most Popular) for my business.",
    recommendedDemoId: "restaurant"
  },
  {
    id: "enterprise",
    name: "Enterprise Level Plan",
    badge: "Extreme Functionality",
    price: "₹19,999",
    numericPrice: 19999,
    tagline: "Custom web software, live administrative dashboards, secure customer portals, and end-to-end automated business workflows.",
    bestFor: "Gyms with memberships, multi-branch clinics, tuition academies, wholesale portals, and dynamic operations.",
    idealFor: ["Gyms & Memberships", "Tuition & Academies", "Appointment Clinics", "Multi-branch Ops"],
    delivery: "10–14 days",
    revisions: "Dedicated milestone reviews",
    features: [
      "Modern full-stack React web application architecture",
      "Secure role-based authentication (Admin, Staff, Client portals)",
      "Custom Admin Dashboard with live metrics and revenue tracking",
      "Full database architecture setup (PostgreSQL / MongoDB)",
      "Automated CRUD data management (Add, edit, delete records)",
      "Client enquiry, attendance, or member subscription tracking",
      "Exportable financial reports (Excel / PDF / CSV summaries)",
      "Custom business workflow & notification automation",
      "Third-party API & payment gateway webhooks integration",
      "Scalable cloud deployment with automated database backups",
      "Complete admin handover walkthrough & video documentation"
    ],
    ctaText: "Discuss Enterprise Plan",
    whatsappMessage: "Hi Viswaas, I have requirements for the Enterprise Level Plan (₹19,999) with full custom functionality.",
    recommendedDemoId: "gym"
  },
  {
    id: "custom-build",
    name: "Custom Build",
    badge: "Bespoke Architecture",
    price: "Custom Quote",
    numericPrice: 0,
    tagline: "Tailored completely from scratch for unique requirements, specialized interactive calculators, multi-location architectures, or complete corporate rebranding.",
    bestFor: "Specialized brands, multi-location franchises, SaaS platforms, and unique business models.",
    idealFor: ["Specialized Brands", "Franchises", "Unique Business Models", "Corporate Rebranding"],
    delivery: "Custom Timeline",
    revisions: "Unlimited during milestones",
    features: [
      "100% bespoke UI/UX crafted to strict brand guidelines",
      "Interactive custom calculators & dynamic quoting tools",
      "Multilingual language toggle (e.g. Tamil & English)",
      "Custom CRM, ERP, and WhatsApp notification webhook pipelines",
      "Advanced GSAP / Framer Motion micro-interactions",
      "Comprehensive performance & Core Web Vitals optimization",
      "Dedicated milestone roadmap with staging preview environments",
      "Priority VIP developer support via direct phone & WhatsApp"
    ],
    ctaText: "Request Custom Quote",
    whatsappMessage: "Hi Viswaas, I want to discuss a Custom Build project tailored specifically for my brand requirements.",
    recommendedDemoId: "clinic"
  }
];

export const pricingNotice = {
  headline: "Transparent, Honest Pricing",
  disclaimer: "Prices listed above are upfront starting prices. Final pricing depends on your unique feature needs, custom integrations, specific content volume, and external APIs.",
  domainHostingNote: "Custom domain registration (e.g. .com, .in), cloud hosting renewal, third-party SMS/payment gateway accounts, and premium commercial assets are billed directly by respective providers."
};
