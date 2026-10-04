// Site configuration for Viswaa Web freelance agency
// Centralized configuration makes it easy to update contact details, pricing, and services.

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    subheadline: string;
    developer: string;
    title: string;
    description: string;
    trustLine: string;
  };
  contact: {
    whatsappNumber: string;
    email: string;
    phoneDisplay: string;
    location: string;
    githubUrl: string;
    linkedinUrl: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "VISWAA WEB",
    tagline: "Modern websites that help local businesses get discovered, build trust and get more customers.",
    subheadline: "Professional websites for restaurants, cafes, shops and local businesses — designed for mobile and built to convert visitors into customers.",
    developer: "Viswaas",
    title: "Viswaa Web — Websites for Restaurants, Cafes & Local Businesses",
    description: "Modern responsive websites for restaurants, cafes, shops and local businesses. Fast loading, mobile first, and designed to convert local customers.",
    trustLine: "React • Modern UI • Mobile First • Fast Deployment",
  },
  contact: {
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "916382450849",
    email: import.meta.env.VITE_EMAIL || "viswaas08@gmail.com",
    phoneDisplay: "+91 63824 50849",
    location: "Coimbatore, Tamil Nadu, India",
    githubUrl: import.meta.env.VITE_GITHUB_URL || "https://github.com/viswaas08",
    linkedinUrl: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/viswaa-s-69a49a1ba",
  },
};

/**
 * Generates a pre-filled direct WhatsApp link
 * @param customMessage Optional custom message text
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  const defaultMsg = "Hi Viswaas, I saw your portfolio on Viswaa Web and would like to discuss a website for my business.";
  const encodedText = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Format currency in Indian Rupees
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
