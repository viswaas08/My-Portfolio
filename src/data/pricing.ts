export interface PricingTier {
  id: string;
  name: string;
  price: string;
  numericPrice?: number;
  period?: string;
  popular?: boolean;
  tagline: string;
  bestFor: string;
  delivery: string;
  revisions: string;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export const pricingPackages: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹4,999",
    numericPrice: 4999,
    tagline: "The essential online launchpad for local shops and neighborhood services.",
    bestFor: "Small shops, single-service providers, and local businesses taking their first step online.",
    delivery: "5–7 days",
    revisions: "2 rounds",
    features: [
      "1–3 Modern responsive pages",
      "Mobile-first responsive design",
      "Business information & about section",
      "Services or products showcase",
      "One-click WhatsApp chat button",
      "Interactive Google Maps location",
      "Contact details & enquiry form",
      "Social media links integration",
      "Basic on-page SEO setup",
      "Fast deployment on cloud hosting"
    ],
    ctaText: "Choose Starter",
    whatsappMessage: "Hi Viswaas, I want to get started with the Starter Package (₹4,999) for my business."
  },
  {
    id: "business",
    name: "Business",
    price: "₹9,999",
    numericPrice: 9999,
    popular: true,
    tagline: "Our high-impact package with rich visual presentation and interactive features.",
    bestFor: "Restaurants, cafes, bakeries, salons, gyms, and growing local brands wanting standout quality.",
    delivery: "7–10 days",
    revisions: "3 rounds",
    features: [
      "5–7 Premium responsive pages / sections",
      "Custom aesthetic branding & tailored color scheme",
      "Interactive Digital Menu / Services catalog with filters",
      "High-res photo gallery (Ambience, dishes, facilities)",
      "Integrated WhatsApp ordering / booking links",
      "Google Maps integration with quick directions",
      "Detailed contact & enquiry form with validation",
      "Live opening hours & weekly schedule widget",
      "Customer reviews & trust badges showcase",
      "Local SEO optimization & Open Graph preview tags",
      "Social media feeds & integration",
      "Mobile speed & performance optimization",
      "Fast deployment + 14 days post-launch support"
    ],
    ctaText: "Choose Business",
    whatsappMessage: "Hi Viswaas, I want to choose the Business Package (₹9,999 - Most Popular) for my business website."
  },
  {
    id: "pro-web-app",
    name: "Pro Web App",
    price: "₹19,999+",
    numericPrice: 19999,
    tagline: "Custom web software with databases, member logins, and administrative control.",
    bestFor: "Businesses requiring dynamic data management, customer portals, or bespoke operational workflows.",
    delivery: "Discuss based on requirements",
    revisions: "Dedicated milestone reviews",
    features: [
      "Full React / modern web app frontend",
      "Secure Backend API & database architecture",
      "Role-based authentication (Admin / Staff / Client)",
      "Custom Admin Dashboard with live statistics",
      "Full CRUD functionality (add, edit, delete records)",
      "User management & customer directory",
      "Custom business workflow automation",
      "Automated PDF receipts / report generation",
      "Third-party API & payment gateway hooks",
      "Scalable cloud deployment with database backups",
      "Complete handover walkthrough & documentation"
    ],
    ctaText: "Discuss My Project",
    whatsappMessage: "Hi Viswaas, I have requirements for a custom Pro Web App (₹19,999+) and would like to discuss the scope."
  }
];

export const pricingNotice = {
  headline: "Transparent, Honest Pricing",
  disclaimer: "Prices listed above are starting prices for standard scope. Final pricing depends on your unique design needs, custom features, specific content volume, and external integrations.",
  domainHostingNote: "Custom domain registration (e.g. .com, .in), cloud hosting renewal, third-party SMS/payment gateway accounts, and premium commercial assets are billed directly by respective providers."
};
