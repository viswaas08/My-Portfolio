import { siteConfig, SiteConfig } from '../config/siteConfig';
import { servicesData, ServiceItem } from '../data/services';
import { faqDataEn, FAQItem } from '../data/faq';

export interface AnnouncementSettings {
  enabled: boolean;
  text: string;
  badge: string;
  linkText: string;
}

export interface HeroSettings {
  badge: string;
  headlinePart1: string;
  headlinePart2: string;
  supporting: string;
  trustPoints: string[];
}

export interface WebsiteDetails {
  brand: {
    name: string;
    tagline: string;
    subheadline: string;
    developer: string;
    title: string;
    description: string;
  };
  contact: {
    whatsappNumber: string;
    email: string;
    phoneDisplay: string;
    location: string;
    businessHours: string;
    githubUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
  };
  hero: HeroSettings;
  announcement: AnnouncementSettings;
  services: ServiceItem[];
  faqs: FAQItem[];
}

const SETTINGS_STORAGE_KEY = 'viswaa_site_settings_v1';

export const defaultWebsiteDetails: WebsiteDetails = {
  brand: {
    name: siteConfig.brand.name,
    tagline: siteConfig.brand.tagline,
    subheadline: siteConfig.brand.subheadline,
    developer: siteConfig.brand.developer,
    title: siteConfig.brand.title,
    description: siteConfig.brand.description,
  },
  contact: {
    whatsappNumber: siteConfig.contact.whatsappNumber,
    email: siteConfig.contact.email,
    phoneDisplay: siteConfig.contact.phoneDisplay,
    location: siteConfig.contact.location,
    businessHours: "Mon – Sat: 9:00 AM – 9:00 PM IST",
    githubUrl: siteConfig.contact.githubUrl,
    linkedinUrl: siteConfig.contact.linkedinUrl,
    instagramUrl: "https://instagram.com/viswaas_web",
  },
  hero: {
    badge: "Direct Developer • Zero Agency Bloat",
    headlinePart1: "High-Impact Websites for",
    headlinePart2: "Restaurants, Cafes & Local Businesses",
    supporting: "Custom modern websites with digital menus, WhatsApp food ordering, and appointment booking — designed to convert foot traffic into loyal paying customers.",
    trustPoints: [
      "100% Mobile Optimized",
      "Direct WhatsApp Ordering",
      "5–7 Day Turnaround",
      "Zero Monthly Retainers"
    ]
  },
  announcement: {
    enabled: true,
    badge: "Special Offer",
    text: "Launching a new local business? Get 15% off all website packages this month!",
    linkText: "Claim on WhatsApp"
  },
  services: servicesData,
  faqs: faqDataEn
};

export class SiteSettingsService {
  /**
   * Get all active website details (from localStorage or defaults)
   */
  static getSettings(): WebsiteDetails {
    try {
      const data = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          ...defaultWebsiteDetails,
          ...parsed,
          brand: { ...defaultWebsiteDetails.brand, ...(parsed.brand || {}) },
          contact: { ...defaultWebsiteDetails.contact, ...(parsed.contact || {}) },
          hero: { ...defaultWebsiteDetails.hero, ...(parsed.hero || {}) },
          announcement: { ...defaultWebsiteDetails.announcement, ...(parsed.announcement || {}) },
          services: parsed.services?.length ? parsed.services : defaultWebsiteDetails.services,
          faqs: parsed.faqs?.length ? parsed.faqs : defaultWebsiteDetails.faqs,
        };
      }
    } catch (e) {
      console.warn('Could not read site settings:', e);
    }
    return defaultWebsiteDetails;
  }

  /**
   * Save website details and notify the app
   */
  static saveSettings(settings: WebsiteDetails): WebsiteDetails {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      window.dispatchEvent(new CustomEvent('site_settings_updated', { detail: { settings } }));
    } catch (e) {
      console.error('Failed to save site settings:', e);
    }
    return settings;
  }

  /**
   * Partial update
   */
  static updateSettings(partial: Partial<WebsiteDetails>): WebsiteDetails {
    const current = this.getSettings();
    const updated: WebsiteDetails = {
      ...current,
      ...partial,
      brand: { ...current.brand, ...(partial.brand || {}) },
      contact: { ...current.contact, ...(partial.contact || {}) },
      hero: { ...current.hero, ...(partial.hero || {}) },
      announcement: { ...current.announcement, ...(partial.announcement || {}) },
    };
    return this.saveSettings(updated);
  }

  /**
   * Reset all details to factory defaults
   */
  static resetSettings(): WebsiteDetails {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('site_settings_updated', { detail: { settings: defaultWebsiteDetails } }));
    } catch (e) {
      console.error('Failed to reset site settings:', e);
    }
    return defaultWebsiteDetails;
  }

  /**
   * Get WhatsApp URL using current dynamic phone number
   */
  static getDynamicWhatsAppUrl(customMessage?: string): string {
    const settings = this.getSettings();
    const cleanNumber = (settings.contact.whatsappNumber || "916382450849").replace(/[^0-9]/g, "");
    const defaultMsg = `Hi ${settings.brand.developer || 'Viswaas'}, I saw your portfolio on ${settings.brand.name} and would like to discuss a website for my business.`;
    const encodedText = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  }
}
