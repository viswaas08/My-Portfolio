export interface ServiceItem {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  idealFor: string[];
  startingPrice: string;
  priceValue?: number;
  features: string[];
  ctaText: string;
  ctaAction?: string;
  iconName: string;
  recommendedDemoId?: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "business-website",
    title: "Business Website",
    badge: "Fast Launch",
    subtitle: "Clean, high-impact online storefront for local shops, clinics, and service providers.",
    idealFor: ["Retail Shops", "Local Services", "Clinics", "Tuition Centres", "Home Businesses"],
    startingPrice: "₹4,999",
    priceValue: 4999,
    features: [
      "100% Mobile responsive layout",
      "Home, About & Services showcase",
      "One-tap WhatsApp direct chat button",
      "Interactive Google Maps store location",
      "Click-to-call phone & email contact",
      "Social media profile integration",
      "Basic on-page local SEO setup",
      "High-speed Vercel cloud deployment"
    ],
    ctaText: "Get Starter Website",
    iconName: "Store",
    recommendedDemoId: "shop"
  },
  {
    id: "restaurant-cafe-website",
    title: "Restaurant & Cafe Website",
    badge: "High Conversion",
    subtitle: "Mouth-watering digital presence with interactive categorization, digital menu, and table booking.",
    idealFor: ["Restaurants", "Cafes", "Bakeries", "Food Trucks", "Cloud Kitchens"],
    startingPrice: "₹7,999",
    priceValue: 7999,
    features: [
      "Interactive Digital Menu with categories",
      "High-resolution dish cards with pricing",
      "Direct WhatsApp Food Order placement",
      "Table Reservation & Party enquiry form",
      "Live Opening Hours & Weekly timings",
      "Photo gallery for ambience & food",
      "Customer testimonials & review highlights",
      "Instant Google Maps directions link"
    ],
    ctaText: "Get Food & Cafe Website",
    iconName: "UtensilsCrossed",
    recommendedDemoId: "restaurant"
  },
  {
    id: "business-web-app",
    title: "Business Web Application",
    badge: "Advanced Functionality",
    subtitle: "Custom operational software, client portals, and administrative dashboard systems.",
    idealFor: ["Gyms with Memberships", "Tuition & Academies", "Appointment Clinics", "Multi-branch Ops"],
    startingPrice: "₹19,999",
    priceValue: 19999,
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
    iconName: "Database",
    recommendedDemoId: "gym"
  },
  {
    id: "custom-website",
    title: "Custom Tailored Website",
    badge: "Bespoke Architecture",
    subtitle: "Tailored from ground up with specialized animations, custom calculators, or external system hooks.",
    idealFor: ["Specialized Brands", "Franchises", "Unique Business Models", "Full Rebranding"],
    startingPrice: "Custom Quote",
    features: [
      "Bespoke UI/UX crafted to your brand guidelines",
      "Interactive custom calculators & quoting tools",
      "Multilingual language toggle support",
      "Third-party CRM / WhatsApp automation hooks",
      "Advanced page transition animations",
      "Comprehensive speed & Core Web Vitals optimization",
      "Staff onboarding training & walkthrough video",
      "Priority post-launch support"
    ],
    ctaText: "Request a Quote",
    iconName: "Sparkles",
    recommendedDemoId: "salon"
  }
];
