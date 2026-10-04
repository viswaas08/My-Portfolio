export interface DemoItem {
  id: string;
  businessName: string;
  industry: string;
  categoryTag: string;
  route: string;
  tagline: string;
  description: string;
  features: string[];
  recommendedPackage: "Starter" | "Business" | "Pro Web App";
  packagePrice: string;
  previewImage: string;
  accentColor: string;
  gradientBg: string;
  themeStyle: string;
}

export const demosData: DemoItem[] = [
  {
    id: "restaurant",
    businessName: "Spice Route",
    industry: "Restaurant / Dining",
    categoryTag: "Food & Dining",
    route: "/demos/restaurant",
    tagline: "Authentic South Indian Flavours, Served Fresh.",
    description: "A rich culinary storefront featuring categorized digital menus, mouth-watering dish photos, table reservation enquiry, and WhatsApp instant food orders.",
    features: [
      "Categorized Digital Food Menu (Starters, Biryani, Dosa, etc.)",
      "Table Booking & Party Enquiry Form",
      "One-click WhatsApp Takeaway Ordering",
      "Live Opening Hours & Google Maps Directions",
      "Customer reviews & Chef special highlights"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#f59e0b",
    gradientBg: "from-amber-500/20 to-orange-500/10",
    themeStyle: "Culinary Amber & Charcoal"
  },
  {
    id: "cafe",
    businessName: "Brew & Bean",
    industry: "Cafe & Roastery",
    categoryTag: "Beverages & Bites",
    route: "/demos/cafe",
    tagline: "Good Coffee. Good Conversations.",
    description: "Warm, contemporary specialty coffee showcase highlighting artisan brews, cold sips, cafe treats, ambient gallery, and cozy hangout vibe.",
    features: [
      "Specialty Coffee Bar & Tasting Notes",
      "Categorized Beverage & Snack Cards",
      "Ambience photo gallery with zoom",
      "Live cafe hours & weekend acoustic night notices",
      "Direct WhatsApp table & event booking"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#d97706",
    gradientBg: "from-amber-600/20 to-stone-700/10",
    themeStyle: "Warm Roasted Mocha & Cream"
  },
  {
    id: "bakery",
    businessName: "Sweet Crumbs Bakery",
    industry: "Artisan Bakery & Patisserie",
    categoryTag: "Sweets & Treats",
    route: "/demos/bakery",
    tagline: "Freshly Baked Every Morning with 100% Pure Butter.",
    description: "Elegant dessert-forward layout dedicated to custom birthday cakes, handcrafted sourdough, sweet pastries, and hassle-free WhatsApp order bookings.",
    features: [
      "Custom Birthday & Celebration Cake Order Builder",
      "Daily fresh sourdough & croissant inventory board",
      "Filterable pastry, cake, and dessert gallery",
      "WhatsApp custom message generator with flavor choices",
      "Customer celebration testimonials"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#ec4899",
    gradientBg: "from-pink-500/20 to-rose-500/10",
    themeStyle: "Artisan Rose Gold & Soft Vanilla"
  },
  {
    id: "shop",
    businessName: "Urban Mart",
    industry: "Supermarket & Local Retail",
    categoryTag: "Retail & Groceries",
    route: "/demos/shop",
    tagline: "Your Friendly Neighbourhood Grocery & Essentials Mart.",
    description: "Clean, high-trust retail catalog showcasing daily deals, category aisles, seasonal bundles, store hours, and convenient WhatsApp quick grocery delivery list submission.",
    features: [
      "Aisle & Category browsing (Groceries, Home, Personal Care)",
      "Daily discounts & bulk bundle highlights",
      "Fast WhatsApp 'Send Grocery List' order flow",
      "Store timings, delivery radius & parking availability",
      "Store location map with landmark guides"
    ],
    recommendedPackage: "Starter",
    packagePrice: "₹4,999",
    previewImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#10b981",
    gradientBg: "from-emerald-500/20 to-teal-500/10",
    themeStyle: "Fresh Emerald Commercial"
  },
  {
    id: "salon",
    businessName: "Glow Studio",
    industry: "Hair, Skin & Luxury Salon",
    categoryTag: "Beauty & Wellness",
    route: "/demos/salon",
    tagline: "Reveal Your True Radiance with Premium Styling & Care.",
    description: "Sophisticated luxury aesthetics with comprehensive service price lists for hair, skin, bridal packages, stylist profiles, and interactive appointment slot bookings.",
    features: [
      "Transparent Service & Bridal pricing rate card",
      "Interactive 'Book Appointment' calendar slot selector",
      "Before & After transformations gallery",
      "Senior stylists and beauticians introduction",
      "One-click WhatsApp beauty consultation"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#f43f5e",
    gradientBg: "from-rose-500/20 to-purple-500/10",
    themeStyle: "Luxury Champagne & Blush"
  },
  {
    id: "gym",
    businessName: "Forge Fitness",
    industry: "Fitness & Strength Club",
    categoryTag: "Health & Fitness",
    route: "/demos/gym",
    tagline: "Transform Your Body. Elevate Your Mind.",
    description: "High-voltage energetic fitness club design with transparent membership plans, training programs, certified coach bios, facilities showcase, and free 1-day pass claim.",
    features: [
      "Tiered Membership Plans (Monthly, Quarterly, Annual)",
      "Programs breakdown (Strength, HIIT, CrossFit, Personal Training)",
      "Certified trainers credentials & specializations",
      "Instant 'Claim Free 1-Day Trial Pass' form",
      "Gym operating hours and peak time indicators"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#84cc16",
    gradientBg: "from-lime-500/20 to-emerald-500/10",
    themeStyle: "Hyper Volt & Carbon Athletic"
  },
  {
    id: "tuition",
    businessName: "BrightPath Academy",
    industry: "Tuition Centre & Coaching",
    categoryTag: "Education & Coaching",
    route: "/demos/tuition",
    tagline: "Nurturing Academic Excellence from Class 8 to 12.",
    description: "Credible, structured educational portal featuring class curriculums, faculty credentials, top rankers board, student testimonials, and a free trial class booking form.",
    features: [
      "Comprehensive Course & Subject breakdown (CBSE/State)",
      "Board exam & competitive foundation modules",
      "Faculty profiles & qualifications list",
      "Top rankers and score improvement highlights",
      "Free 2-day demo class enquiry submission"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#3b82f6",
    gradientBg: "from-blue-500/20 to-indigo-500/10",
    themeStyle: "Academic Navy & Intellectual Indigo"
  },
  {
    id: "clinic",
    businessName: "CarePoint Clinic",
    industry: "Family & Multispeciality Clinic",
    categoryTag: "Healthcare & Wellness",
    route: "/demos/clinic",
    tagline: "Caring for Your Family’s Health with Compassion.",
    description: "A calming, trust-inspiring healthcare layout presenting specialized doctors, OPD consultation timings, departments, clinic amenities, and appointment scheduling.",
    features: [
      "Specialist doctors directory with qualifications & timings",
      "Departments (General Medicine, Pediatrics, Dental, Ortho)",
      "Simple appointment request form with date & department",
      "Emergency contact & clinic helpline banners",
      "Location map & parking info (strictly non-prescriptive)"
    ],
    recommendedPackage: "Business",
    packagePrice: "₹9,999",
    previewImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    accentColor: "#06b6d4",
    gradientBg: "from-cyan-500/20 to-teal-500/10",
    themeStyle: "Trust Teal & Medical Slate"
  }
];
