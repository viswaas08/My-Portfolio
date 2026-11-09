import { PricingTier, pricingPackages as defaultPricingPackages } from '../data/pricing';
import { MaintenancePlan } from '../types/agency';
import { maintenancePlans as defaultMaintenancePlans } from '../config/agencyConfig';

const PRICING_STORAGE_KEY = 'viswaa_pricing_plans_v2';
const MAINTENANCE_STORAGE_KEY = 'viswaa_maintenance_plans_v2';

export class PricingService {
  /**
   * Retrieve active pricing tiers (from localStorage or defaults)
   */
  static getPricingTiers(): PricingTier[] {
    try {
      const data = localStorage.getItem(PRICING_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored pricing tiers:', e);
    }
    return defaultPricingPackages;
  }

  /**
   * Save all pricing tiers to localStorage and notify listeners
   */
  static savePricingTiers(tiers: PricingTier[]): PricingTier[] {
    try {
      localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(tiers));
      window.dispatchEvent(new CustomEvent('pricing_updated', { detail: { tiers } }));
    } catch (e) {
      console.error('Failed to save pricing tiers:', e);
    }
    return tiers;
  }

  /**
   * Update a specific pricing tier by ID
   */
  static updateTier(id: string, updates: Partial<PricingTier>): PricingTier[] {
    const tiers = this.getPricingTiers();
    const index = tiers.findIndex(t => t.id === id);
    if (index >= 0) {
      tiers[index] = { ...tiers[index], ...updates };
      return this.savePricingTiers(tiers);
    }
    return tiers;
  }

  /**
   * Reset pricing tiers to default seed values
   */
  static resetPricingTiers(): PricingTier[] {
    try {
      localStorage.removeItem(PRICING_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('pricing_updated', { detail: { tiers: defaultPricingPackages } }));
    } catch (e) {
      console.error('Failed to reset pricing tiers:', e);
    }
    return defaultPricingPackages;
  }

  /**
   * Retrieve active maintenance plans
   */
  static getMaintenancePlans(): MaintenancePlan[] {
    try {
      const data = localStorage.getItem(MAINTENANCE_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored maintenance plans:', e);
    }
    return defaultMaintenancePlans;
  }

  /**
   * Save maintenance plans
   */
  static saveMaintenancePlans(plans: MaintenancePlan[]): MaintenancePlan[] {
    try {
      localStorage.setItem(MAINTENANCE_STORAGE_KEY, JSON.stringify(plans));
      window.dispatchEvent(new CustomEvent('pricing_updated', { detail: { maintenancePlans: plans } }));
    } catch (e) {
      console.error('Failed to save maintenance plans:', e);
    }
    return plans;
  }

  /**
   * Update a specific maintenance plan
   */
  static updateMaintenancePlan(id: string, updates: Partial<MaintenancePlan>): MaintenancePlan[] {
    const plans = this.getMaintenancePlans();
    const index = plans.findIndex(p => p.id === id);
    if (index >= 0) {
      plans[index] = { ...plans[index], ...updates };
      return this.saveMaintenancePlans(plans);
    }
    return plans;
  }

  /**
   * Reset maintenance plans to default
   */
  static resetMaintenancePlans(): MaintenancePlan[] {
    try {
      localStorage.removeItem(MAINTENANCE_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('pricing_updated', { detail: { maintenancePlans: defaultMaintenancePlans } }));
    } catch (e) {
      console.error('Failed to reset maintenance plans:', e);
    }
    return defaultMaintenancePlans;
  }

  /**
   * Helper to get a single plan price by ID
   */
  static getPlanPrice(id: string, fallback = ''): string {
    const tier = this.getPricingTiers().find(t => t.id === id);
    return tier ? tier.price : fallback;
  }
}
