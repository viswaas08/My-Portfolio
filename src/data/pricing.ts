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

export const pricingPackages: PricingTier[] = [
  {
    id: "starter",
    name: "Business Website",
    badge: "Fast Launch",
    price: "₹4,999",
    numericPrice: 4999,
    tagline: "Clean, high-impact online storefront for local shops, clinics, and service providers.",
    bestFor: "Small shops, single-service providers, clinics, tuition centres, and home businesses.",
    idealFor: ["Retail Shops", "Local Services", "Clinics", "Tuition Centres", "Home Businesses"],
    delivery: "3–5 days",
    revisions: "2 rounds",
    features: [
      "100% Mobile responsive layout",
      "Home, About & Services showcase",
      "One-tap WhatsApp direct chat button",
      "Interactive Google Maps store location",
      "Click-to-call phone & email contact",
      "Social media profile integration",
      "Basic on-page local SEO setup",
      "High-speed cloud deployment"
    ],
    ctaText: "Choose Business Website",
    whatsappMessage: "Hi Viswaas, I want to get started with the Business Website plan (₹4,999) for my shop/business.",
    recommendedDemoId: "shop"
  },
  {
    id: "business",
    name: "Restaurant & Cafe Website",
    badge: "High Conversion",
    price: "₹7,999",
    numericPrice: 7999,
    popular: true,
    tagline: "Mouth-watering digital presence with interactive categorization, digital menu, and table booking.",
    bestFor: "Restaurants, cafes, bakeries, food trucks, cloud kitchens, salons, and gyms.",
    idealFor: ["Restaurants", "Cafes", "Bakeries", "Food Trucks", "Cloud Kitchens"],
    delivery: "5–7 days",
    revisions: "3 rounds",
    features: [
      "Interactive Digital Menu with categories",
      "High-resolution dish cards with pricing",
      "Direct WhatsApp Food Order placement",
      "Table Reservation & Party enquiry form",
      "Live Opening Hours & Weekly timings",
      "Photo gallery for ambience & food",
      "Customer testimonials & review highlights",
      "Instant Google Maps directions link",
      "Custom domain connection guidance"
    ],
    ctaText: "Choose Restaurant Website",
    whatsappMessage: "Hi Viswaas, I want to choose the Restaurant & Cafe Website plan (₹7,999 - Most Popular) for my food business.",
    recommendedDemoId: "restaurant"
  },
  {
    id: "pro-web-app",
    name: "Business Web Application",
    badge: "Advanced Functionality",
    price: "₹19,999",
    numericPrice: 19999,
    tagline: "Custom operational software, client portals, and administrative dashboard systems.",
    bestFor: "Gyms with memberships, tuition & academies, appointment clinics, and multi-branch operations.",
    idealFor: ["Gyms with Memberships", "Tuition & Academies", "Appointment Clinics", "Multi-branch Ops"],
    delivery: "10–14 days",
    revisions: "Dedicated milestone reviews",
    features: [
      "Secure Role-based User Authentication",
      "Custom Admin Dashboard with live metrics",
      "Full Database setup (PostgreSQL / MongoDB)",
      "Automated CRUD data management",
      "Client enquiry & member tracking",
      "Exportable reports (Excel / PDF / CSV)",
      "Custom business workflow automation",
      "API integrations & secure cloud deployment"
    ],
    ctaText: "Discuss Web Application",
    whatsappMessage: "Hi Viswaas, I have requirements for a custom Business Web Application (₹19,999+) and want to discuss.",
    recommendedDemoId: "gym"
  },
  {
    id: "custom",
    name: "Custom Tailored Website",
    badge: "Bespoke Architecture",
    price: "Custom Quote",
    numericPrice: 0,
    tagline: "Tailored from ground up with specialized animations, custom calculators, or external system hooks.",
    bestFor: "Specialized brands, franchises, unique business models, and full company rebranding.",
    idealFor: ["Specialized Brands", "Franchises", "Unique Business Models", "Full Rebranding"],
    delivery: "Custom Timeline",
    revisions: "Unlimited during milestone",
    features: [
      "Bespoke UI/UX crafted to your brand guidelines",
      "Interactive custom calculators & quoting tools",
      "Multilingual language toggle support",
      "Third-party CRM / WhatsApp automation hooks",
      "Advanced page transition animations",
      "Comprehensive speed & Core Web Vitals optimization",
      "Priority post-launch support"
    ],
    ctaText: "Request a Custom Quote",
    whatsappMessage: "Hi Viswaas, I want to discuss a Custom Tailored Website project for my brand.",
    recommendedDemoId: "clinic"
  }
];

export const pricingNotice = {
  headline: "Transparent, Honest Pricing",
  disclaimer: "Prices listed above are starting prices for standard scope. Final pricing depends on your unique design needs, custom features, specific content volume, and external integrations.",
  domainHostingNote: "Custom domain registration (e.g. .com, .in), cloud hosting renewal, third-party SMS/payment gateway accounts, and premium commercial assets are billed directly by respective providers."
};
