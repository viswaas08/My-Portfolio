import { ClientRecord, LeadRecord, MaintenancePlan } from '../types/agency';

export const agencyPricing = {
  starter: {
    id: 'starter' as const,
    name: 'Static Web Page / Landing Page',
    price: '₹2,999',
    numericPrice: 2999,
    target: 'Single-service businesses, local shops, product promotions, portfolio showcases',
    pages: '1 Page',
    features: [
      '100% Mobile responsive layout',
      'Hero section with direct Call-to-Action',
      'Direct WhatsApp chat & call triggers',
      'Interactive Google Maps embed',
      'Basic on-page SEO setup',
      'Fast cloud deployment'
    ]
  },
  business: {
    id: 'business' as const,
    name: 'Business Plan (All Features)',
    price: '₹7,999',
    numericPrice: 7999,
    popular: true,
    badge: 'MOST POPULAR',
    target: 'Restaurants, cafes, bakeries, salons, gyms, and growing local businesses',
    pages: '5–7 Pages',
    features: [
      'Interactive Digital Menu / catalog with categories',
      'Custom branding & color palette',
      'High-resolution photo gallery',
      'Direct WhatsApp ordering / booking links',
      'Interactive Google Maps with directions',
      'Live opening hours widget',
      'Contact & enquiry form with validation',
      'Social media integration',
      'Local SEO setup, Sitemap.xml & Robots.txt',
      'Custom domain connection guidance'
    ]
  },
  enterprise: {
    id: 'enterprise' as const,
    name: 'Enterprise Level Plan',
    price: '₹19,999',
    numericPrice: 19999,
    target: 'Businesses requiring dynamic databases, admin dashboards, and custom workflows',
    pages: 'Custom Architecture',
    features: [
      'Modern React frontend application',
      'Secure Backend API & database architecture',
      'Role-based authentication & admin dashboard',
      'Full CRUD capability',
      'Custom client enquiry & order workflows',
      'User management & customer directory',
      'Automated receipt / summary generator',
      'Third-party API & service integration',
      'Scalable cloud deployment with database backups'
    ]
  },
  custom: {
    id: 'custom' as const,
    name: 'Custom Build',
    price: 'Custom Quote',
    numericPrice: 0,
    target: 'Complex multi-branch platforms or unique digital solutions',
    pages: 'Tailored Scope',
    features: [
      'Dedicated technical project roadmap',
      'Custom microservices or multi-tenant database',
      'Multi-location business management',
      'Milestone-based delivery & testing',
      'Direct priority WhatsApp & phone support'
    ]
  }
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'monthly-overview',
    name: 'Monthly Overview Care',
    price: '₹500/mo',
    numericMonthlyPrice: 500,
    badge: 'ESSENTIAL CARE',
    tagline: 'Routine monthly website review, continuous uptime monitoring, and essential hosting peace of mind.',
    features: [
      'Monthly overall website health & performance review',
      'Continuous 24/7 uptime & SSL security certificate monitoring',
      'Hosting & cloud deployment infrastructure management',
      'Minor content adjustments (banners, phone/address changes)',
      'Monthly backup verification and security check',
      'Standard WhatsApp support response'
    ],
    disclaimers: [
      'Includes basic content edits and infrastructure care',
      'Domain renewal fee is billed directly by client registrar'
    ]
  },
  {
    id: 'instant-everyday',
    name: 'Instant & Everyday Review (Lots of Updates)',
    price: '₹1,000/mo',
    numericMonthlyPrice: 1000,
    badge: 'ACTIVE BUSINESS CHOICE',
    tagline: 'Day-to-day website monitoring with instant same-day menu, dish, price, and gallery updates.',
    features: [
      'Everyday website review, monitoring, and proactive checks',
      'Instant same-day updates for menus, dishes, and price lists',
      'Frequent photo gallery additions and announcement banners',
      'Google Business Profile & local Google Search ranking tracking',
      'Core Web Vitals & mobile load speed optimizations',
      'Priority same-day WhatsApp and direct phone developer access',
      'Emergency rapid bug fix guarantee within hours'
    ],
    disclaimers: [
      'Ideal for restaurants, cafes, and active businesses updating frequently',
      'Infrastructure surges beyond standard allowances notified prior to billing'
    ]
  }
];

// Clean empty database (no dummy seeded clients or leads)
export const initialClients: ClientRecord[] = [];
export const initialLeads: LeadRecord[] = [];

export const adminCredentials = {
  username: import.meta.env.VITE_ADMIN_USER || 'admin',
  passwordHashDemo: 'admin2026',
  role: 'Agency Owner',
  agencyName: 'Viswaas Web Agency Systems'
};
