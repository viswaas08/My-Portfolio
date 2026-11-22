import { ClientRecord, LeadRecord, MaintenancePlan } from '../types/agency';

export const agencyPricing = {
  starter: {
    id: 'starter' as const,
    name: 'Business Website',
    price: '₹4,999',
    numericPrice: 4999,
    target: 'Small shops, local services, clinics, tuition centres, and home businesses',
    pages: '1–3 Pages',
    features: [
      '100% Mobile responsive layout',
      'Business profile, services & about section',
      'Direct WhatsApp chat button',
      'Interactive Google Maps embed',
      'Contact section & social links',
      'Basic on-page SEO setup',
      'High-speed cloud deployment'
    ]
  },
  business: {
    id: 'business' as const,
    name: 'Restaurant & Cafe Website',
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
  proWebApp: {
    id: 'pro-web-app' as const,
    name: 'Business Web Application',
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
  'pro-web-app': {
    id: 'pro-web-app' as const,
    name: 'Business Web Application',
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
    name: 'Custom Tailored Website',
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
    id: 'website-care',
    name: 'Website Care',
    price: '₹1,499/mo',
    numericMonthlyPrice: 1499,
    tagline: 'Essential maintenance for hands-off peace of mind.',
    features: [
      'Hosting & cloud deployment management',
      'Continuous uptime & SSL status monitoring',
      'Minor content changes (menu items, prices, banners)',
      'Image uploads & gallery updates (up to 5 per month)',
      'Small UI bug fixes & browser compatibility checks',
      'Technical support via WhatsApp'
    ],
    disclaimers: [
      'Does not include major feature rebuilds or new page development',
      'Domain renewal fee is billed directly by client registrar'
    ]
  },
  {
    id: 'advanced-care',
    name: 'Advanced Website Care',
    price: '₹2,999/mo',
    numericMonthlyPrice: 2999,
    badge: 'RECOMMENDED FOR ACTIVE SITES',
    tagline: 'Comprehensive maintenance, local SEO care, and monthly health review.',
    features: [
      'Everything in Website Care included',
      'Google Business Profile maintenance assistance',
      'Google Search Console crawl error monitoring',
      'Basic local SEO tracking & keyword monitoring',
      'Monthly website health & performance review report',
      'More frequent content updates (up to 15 per month)',
      'Core Web Vitals & mobile load speed optimizations',
      'Priority same-day WhatsApp support'
    ],
    disclaimers: [
      'We do NOT guarantee #1 Google rankings or specific search position',
      'We do NOT promise guaranteed customer counts, calls, or revenue',
      'External infrastructure surges beyond standard usage billed after client notification'
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
