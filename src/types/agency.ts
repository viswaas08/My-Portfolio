export type BusinessType = 
  | 'Restaurant'
  | 'Cafe'
  | 'Bakery'
  | 'Retail Shop'
  | 'Salon'
  | 'Gym'
  | 'Tuition Centre'
  | 'Clinic'
  | 'Local Service'
  | 'Other';

export type ProjectStatus =
  | 'LEAD'
  | 'CONTACTED'
  | 'DISCUSSION'
  | 'QUOTED'
  | 'ADVANCE PAID'
  | 'DEVELOPMENT'
  | 'CLIENT REVIEW'
  | 'REVISION'
  | 'DEPLOYED'
  | 'MAINTENANCE'
  | 'COMPLETED'
  | 'INACTIVE';

export type PaymentStatus =
  | 'Unpaid'
  | 'Advance Paid'
  | 'Fully Paid'
  | 'Pending Final'
  | 'Overdue';

export type MaintenancePlanId = 'none' | 'website-care' | 'advanced-care';

export type LeadSource =
  | 'Website'
  | 'WhatsApp'
  | 'LinkedIn'
  | 'Fiverr'
  | 'Upwork'
  | 'Referral'
  | 'Local Outreach'
  | 'Other';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Replied'
  | 'Meeting'
  | 'Proposal Sent'
  | 'Won'
  | 'Lost';

export interface SeoAudit {
  seoTitle: string;
  metaDescription: string;
  primaryCategory: string;
  targetLocation: string;
  hasSitemap: boolean;
  searchConsoleVerified: boolean;
  googleBusinessProfileLinked: boolean;
  mobileResponsiveCheck: boolean;
  robotsTxtCheck: boolean;
  schemaMarkupCheck: boolean;
  napConsistencyCheck: boolean; // Name, Address, Phone
}

export interface WebsiteHealth {
  productionUrl: string;
  httpStatus: number;
  sslActive: boolean;
  lastChecked: string;
  responseTimeMs: number;
  uptimePercentage: number;
}

export interface ClientRecord {
  id: string;
  clientName: string;
  businessName: string;
  businessType: BusinessType;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  
  // Domain & Assets (Client Owned)
  domain: string;
  registrar: string;
  domainRegistrationDate: string;
  domainExpiryDate: string;
  domainAutoRenew: boolean;
  
  // Hosting & Technical (Freelancer Managed)
  vercelProject: string;
  vercelDeploymentUrl: string;
  githubRepo: string;
  currentVersion: string;
  deploymentStatus: 'Ready' | 'Building' | 'Error' | 'Inactive';
  lastDeploymentDate: string;
  
  // Package & Project Billing
  packageId: 'starter' | 'business' | 'pro-web-app' | 'custom';
  packageName: string;
  totalProjectPrice: number;
  advanceAmount: number; // 50%
  remainingAmount: number; // 50%
  amountPaid: number;
  amountPending: number;
  paymentStatus: PaymentStatus;
  projectStatus: ProjectStatus;
  projectStartDate: string;
  handoverDate?: string;
  
  // Recurring Maintenance
  maintenancePlanId: MaintenancePlanId;
  maintenancePlanName: string;
  monthlyMaintenanceAmount: number;
  maintenanceStartDate?: string;
  nextBillingDate?: string;
  maintenancePaymentStatus: 'Current' | 'Due' | 'Overdue' | 'N/A';
  
  // Infrastructure Cost Tracking (per client)
  monthlyInfraCost: number; // Cloud hosting, domains, serverless bandwidth
  
  // Notes & Content
  notes: string;
  requirementsSummary: string;
  documentLinks?: string[];
  
  // SEO & Health
  seo: SeoAudit;
  health: WebsiteHealth;
}

export interface LeadRecord {
  id: string;
  name: string;
  businessName: string;
  businessType: BusinessType;
  phone: string;
  whatsapp: string;
  email: string;
  source: LeadSource;
  interestedPackage: string;
  estimatedValue: number;
  status: LeadStatus;
  notes: string;
  dateContacted: string;
  followUpDate: string;
}

export interface MaintenancePlan {
  id: MaintenancePlanId;
  name: string;
  price: string;
  numericMonthlyPrice: number;
  tagline: string;
  badge?: string;
  features: string[];
  disclaimers: string[];
}

export interface OnboardingData {
  // Step 1: Client Info
  clientName: string;
  email: string;
  phone: string;
  whatsapp: string;
  city: string;
  state: string;

  // Step 2: Business Info
  businessName: string;
  businessType: BusinessType;
  physicalAddress: string;
  googleMapsUrl: string;
  operatingHours: string;
  taglineOrStory: string;

  // Step 3: Package Selection
  selectedPackage: 'starter' | 'business' | 'pro-web-app' | 'custom';
  selectedMaintenance: MaintenancePlanId;

  // Step 4: Content Checklist
  hasLogo: boolean;
  hasPhotos: boolean;
  hasProductOrMenuList: boolean;
  hasSocialLinks: boolean;
  instagramHandle: string;
  facebookUrl: string;
  googleBusinessProfileUrl: string;
  desiredDomainName: string;
  alreadyOwnsDomain: boolean;

  // Step 5: Domain & Hosting Agreement
  agreedToClientDomainOwnership: boolean;
  agreedToInfrastructurePolicy: boolean;

  // Step 6: Payment Terms Agreement
  agreedTo50PercentAdvance: boolean;

  // Additional Notes
  specialRequirements: string;
}
