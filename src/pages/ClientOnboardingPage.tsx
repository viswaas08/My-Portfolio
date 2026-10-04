import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Globe, 
  CreditCard, 
  Building2, 
  User, 
  FileText, 
  Send,
  MessageSquare,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { BusinessType, MaintenancePlanId, ClientRecord } from '../types/agency';
import { agencyPricing, maintenancePlans } from '../config/agencyConfig';
import { StorageService } from '../services/storageService';
import { getWhatsAppUrl } from '../config/siteConfig';

export const ClientOnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdClientId, setCreatedClientId] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Client Info
    clientName: '',
    phone: '',
    whatsapp: '',
    email: '',
    city: 'Coimbatore',
    state: 'Tamil Nadu',

    // Step 2: Business Info
    businessName: '',
    businessType: 'Restaurant' as BusinessType,
    physicalAddress: '',
    operatingHours: '11:00 AM – 10:30 PM',
    taglineOrStory: '',

    // Step 3: Package Selection
    selectedPackage: 'business' as 'starter' | 'business' | 'pro-web-app' | 'custom',
    selectedMaintenance: 'website-care' as MaintenancePlanId,

    // Step 4: Content Checklist
    hasLogo: true,
    hasPhotos: true,
    hasProductOrMenuList: true,
    hasSocialLinks: true,
    instagramHandle: '',
    googleBusinessProfileUrl: '',
    desiredDomainName: '',
    alreadyOwnsDomain: false,

    // Step 5: Domain Ownership Agreement
    agreedToDomainOwnership: false,
    agreedToInfraTerms: false,

    // Step 6: Payment Terms Agreement
    agreedToPaymentTerms: false,
    specialRequirements: ''
  });

  // Calculate pricing
  const pkgConfig = agencyPricing[formData.selectedPackage];
  const totalPrice = pkgConfig.numericPrice;
  const advanceAmount = Math.floor(totalPrice / 2);
  const remainingAmount = totalPrice - advanceAmount;

  const selectedMaintenancePlan = maintenancePlans.find(p => p.id === formData.selectedMaintenance);
  const monthlyMaintenancePrice = selectedMaintenancePlan?.numericMonthlyPrice || 0;

  const businessTypes: BusinessType[] = [
    'Restaurant',
    'Cafe',
    'Bakery',
    'Retail Shop',
    'Salon',
    'Gym',
    'Tuition Centre',
    'Clinic',
    'Local Service',
    'Other'
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create client record in persistent registry
    const newId = `client-${Date.now()}`;
    const newClient: ClientRecord = {
      id: newId,
      clientName: formData.clientName,
      businessName: formData.businessName,
      businessType: formData.businessType,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email,
      address: `${formData.physicalAddress}, ${formData.city}, ${formData.state}`,
      
      domain: formData.desiredDomainName || `${formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.in`,
      registrar: formData.alreadyOwnsDomain ? 'Client Registrar' : 'Pending Client Setup',
      domainRegistrationDate: new Date().toISOString().split('T')[0],
      domainExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      domainAutoRenew: false,

      vercelProject: `${formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-web`,
      vercelDeploymentUrl: '',
      githubRepo: `https://github.com/viswaas08/${formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      currentVersion: 'v0.1.0',
      deploymentStatus: 'Inactive',
      lastDeploymentDate: '',

      packageId: formData.selectedPackage,
      packageName: pkgConfig.name,
      totalProjectPrice: totalPrice,
      advanceAmount: advanceAmount,
      remainingAmount: remainingAmount,
      amountPaid: 0,
      amountPending: totalPrice,
      paymentStatus: 'Unpaid',
      projectStatus: 'DISCUSSION',
      projectStartDate: new Date().toISOString().split('T')[0],

      maintenancePlanId: formData.selectedMaintenance,
      maintenancePlanName: selectedMaintenancePlan?.name || 'None',
      monthlyMaintenanceAmount: monthlyMaintenancePrice,
      maintenancePaymentStatus: monthlyMaintenancePrice > 0 ? 'Due' : 'N/A',
      monthlyInfraCost: 0,

      notes: `Onboarding completed online. Desired domain: ${formData.desiredDomainName || 'TBD'}. Owns domain: ${formData.alreadyOwnsDomain ? 'Yes' : 'No'}.`,
      requirementsSummary: formData.specialRequirements || `${formData.businessType} website with online contact and WhatsApp features.`,

      seo: {
        seoTitle: `${formData.businessName} — ${formData.businessType} in ${formData.city}`,
        metaDescription: formData.taglineOrStory || `Visit ${formData.businessName} in ${formData.city}. Professional services, digital catalog, and direct WhatsApp contact.`,
        primaryCategory: formData.businessType,
        targetLocation: `${formData.city}, ${formData.state}`,
        hasSitemap: false,
        searchConsoleVerified: false,
        googleBusinessProfileLinked: !!formData.googleBusinessProfileUrl,
        mobileResponsiveCheck: true,
        robotsTxtCheck: false,
        schemaMarkupCheck: false,
        napConsistencyCheck: true
      },

      health: {
        productionUrl: '',
        httpStatus: 0,
        sslActive: false,
        lastChecked: new Date().toISOString().split('T')[0],
        responseTimeMs: 0,
        uptimePercentage: 0
      }
    };

    StorageService.saveClient(newClient);
    setCreatedClientId(newId);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateWhatsAppHandoffUrl = () => {
    const text = `*New Client Onboarding Completed!*
- Business: ${formData.businessName} (${formData.businessType})
- Client Name: ${formData.clientName}
- WhatsApp: ${formData.whatsapp || formData.phone}
- Package: ${pkgConfig.name} (₹${totalPrice.toLocaleString('en-IN')})
- Advance Due (50%): ₹${advanceAmount.toLocaleString('en-IN')}
- Maintenance Plan: ${selectedMaintenancePlan?.name || 'None'} (₹${monthlyMaintenancePrice}/mo)
- Desired Domain: ${formData.desiredDomainName || 'To be registered'}

Hi Viswaas, I have completed the website onboarding form and would like to confirm my 50% advance payment to begin development.`;
    return getWhatsAppUrl(text);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smooth 7-Step Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Client & Project Onboarding
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Provide your business details, select your package, and review your transparent terms. We begin development immediately upon receiving your 50% advance.
          </p>
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              <span>Step {currentStep} of 6</span>
              <span>
                {currentStep === 1 && 'Client Contact'}
                {currentStep === 2 && 'Business Details'}
                {currentStep === 3 && 'Package & Care'}
                {currentStep === 4 && 'Content & Assets'}
                {currentStep === 5 && 'Ownership Charter'}
                {currentStep === 6 && 'Payment & Agreement'}
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Submission Confirmation Screen */}
        {isSubmitted ? (
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                Registration Successful
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Welcome to Viswaa Web Systems!
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-lg mx-auto">
                Your onboarding dossier for <strong>{formData.businessName}</strong> has been saved directly to our client management system.
              </p>
            </div>

            {/* Financial Summary Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 max-w-md mx-auto text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500">Selected Package:</span>
                <strong className="text-slate-900 dark:text-white">{pkgConfig.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500">Total Project Price:</span>
                <strong className="text-slate-900 dark:text-white font-mono">₹{totalPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <span>50% Advance Due to Start:</span>
                <span className="font-mono">₹{advanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-slate-500">Remaining upon Final Handover:</span>
                <strong className="text-slate-900 dark:text-white font-mono">₹{remainingAmount.toLocaleString('en-IN')}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monthly Maintenance Plan:</span>
                <strong className="text-sky-600 dark:text-sky-400 font-mono">
                  {selectedMaintenancePlan ? `${selectedMaintenancePlan.name} (₹${monthlyMaintenancePrice}/mo)` : 'None'}
                </strong>
              </div>
            </div>

            {/* Next Step Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppHandoffUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm & Send via WhatsApp</span>
              </a>

              <Link
                to="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Return to Pricing
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
            
            {/* STEP 1: Client Information */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-500" />
                    <span>Step 1: Your Contact Information</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Who will be the primary point of contact for project milestones and approvals?
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Ramesh Sundaram"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@spiceroute.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98421 11223"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      WhatsApp Number (for instant updates) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+91 98421 11223"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Coimbatore"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Tamil Nadu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-sky-500" />
                    <span>Step 2: Business Details</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Tell us about your brand, physical address, and hours of operation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Spice Route Heritage Restaurant"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Business Category / Type *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    >
                      {businessTypes.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Physical Store / Clinic / Outlet Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.physicalAddress}
                    onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                    placeholder="e.g. 42 Heritage Lane, RS Puram, Coimbatore - 641002"
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Opening / Operating Hours *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.operatingHours}
                      onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
                      placeholder="e.g. Mon–Sun: 11:30 AM – 11:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Business Tagline or Short Description
                    </label>
                    <input
                      type="text"
                      value={formData.taglineOrStory}
                      onChange={(e) => setFormData({ ...formData, taglineOrStory: e.target.value })}
                      placeholder="e.g. Authentic Chettinad dum biryani & crispy dosas"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Package & Care Selection */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-500" />
                    <span>Step 3: Select Website Package & Maintenance Plan</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Choose the design tier matching your current growth stage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(['starter', 'business', 'pro-web-app'] as const).map((pkgKey) => {
                    const pkg = agencyPricing[pkgKey];
                    const isSelected = formData.selectedPackage === pkgKey;
                    return (
                      <div
                        key={pkgKey}
                        onClick={() => setFormData({ ...formData, selectedPackage: pkgKey })}
                        className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {pkg.name}
                            </h4>
                            {'popular' in pkg && pkg.popular && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-500 text-white">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
                            {pkg.price}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {pkg.pages} • {pkg.target}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold flex items-center justify-between text-sky-600">
                          <span>{isSelected ? '✓ Selected' : 'Select Plan'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Maintenance Addon Selection */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Optional Recurring Maintenance Plan
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Monthly hosting management, menu price changes, security, and technical support.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div
                      onClick={() => setFormData({ ...formData, selectedMaintenance: 'none' })}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        formData.selectedMaintenance === 'none'
                          ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 font-bold'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="text-xs text-slate-900 dark:text-white">No Monthly Plan</div>
                      <div className="text-[11px] text-slate-500">I will manage myself</div>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, selectedMaintenance: 'website-care' })}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        formData.selectedMaintenance === 'website-care'
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="text-xs">Website Care</div>
                      <div className="text-[11px] text-slate-500">₹1,499/month</div>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, selectedMaintenance: 'advanced-care' })}
                      className={`p-3.5 rounded-xl border transition cursor-pointer ${
                        formData.selectedMaintenance === 'advanced-care'
                          ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 font-bold text-sky-900 dark:text-sky-200'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="text-xs">Advanced Website Care</div>
                      <div className="text-[11px] text-slate-500">₹2,999/month (SEO & GBP)</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Content Checklist */}
            {currentStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sky-500" />
                    <span>Step 4: Content & Domain Assets</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Check the items you currently have ready for the new website.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasLogo}
                      onChange={(e) => setFormData({ ...formData, hasLogo: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>I have a high-res brand logo (PNG / Vector)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasPhotos}
                      onChange={(e) => setFormData({ ...formData, hasPhotos: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>I have store / ambience / dish photos</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasProductOrMenuList}
                      onChange={(e) => setFormData({ ...formData, hasProductOrMenuList: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>I have my menu / service pricing list</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.alreadyOwnsDomain}
                      onChange={(e) => setFormData({ ...formData, alreadyOwnsDomain: e.target.checked })}
                      className="rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>I already own my domain (GoDaddy / Hostinger etc.)</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Desired Domain Name (e.g. yourbusiness.in)
                    </label>
                    <input
                      type="text"
                      value={formData.desiredDomainName}
                      onChange={(e) => setFormData({ ...formData, desiredDomainName: e.target.value })}
                      placeholder="spiceroute.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Instagram Handle or Facebook Page (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.instagramHandle}
                      onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                      placeholder="@spiceroute.cbe"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Google Business Profile Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.googleBusinessProfileUrl}
                    onChange={(e) => setFormData({ ...formData, googleBusinessProfileUrl: e.target.value })}
                    placeholder="https://maps.app.goo.gl/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Domain & Hosting Agreement */}
            {currentStep === 5 && (
              <div className="space-y-5 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-emerald-500" />
                    <span>Step 5: Domain Ownership & Technical Boundaries</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Clear boundaries so you maintain full control of your digital identity.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs leading-relaxed">
                  <div className="font-bold text-slate-900 dark:text-white">
                    CLIENT-OWNED ASSETS vs FREELANCER-MANAGED:
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300">
                    <li><strong>Your Domain:</strong> Registered in your name or purchased directly by you. Viswaas does NOT claim permanent ownership of your domain.</li>
                    <li><strong>Your Business Accounts:</strong> Google Business Profile, business email, and social media remain 100% under your ownership.</li>
                    <li><strong>Freelancer Responsibilities:</strong> Website architecture, UI coding, mobile optimization, Vercel cloud deployment, and maintenance scope.</li>
                    <li><strong>Infrastructure Costs:</strong> Standard traffic is included within the maintenance scope. High video bandwidth or external database growth are recorded per client and billed transparently after prior notice.</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToDomainOwnership}
                      onChange={(e) => setFormData({ ...formData, agreedToDomainOwnership: e.target.checked })}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      I understand and confirm that I (the client) own my domain and business accounts. The developer manages technical implementation and cloud deployment.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToInfraTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToInfraTerms: e.target.checked })}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      I acknowledge that third-party infrastructure surges beyond standard usage will be notified in advance and billed transparently.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* STEP 6: Payment Terms & Submission */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-sky-500" />
                    <span>Step 6: Payment Terms & Project Handover Agreement</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Standard industry structure: 50% advance to start, 50% upon final handover.
                  </p>
                </div>

                {/* Calculation breakdown */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-stone-900 to-slate-950 text-white space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs text-slate-300">Selected Package:</span>
                    <span className="font-bold text-sm text-amber-400">{pkgConfig.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[11px]">50% Advance (To Start):</span>
                      <strong className="text-lg text-emerald-400 font-mono">
                        ₹{advanceAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-slate-400 block text-[11px]">Remaining 50% (At Handover):</span>
                      <strong className="text-lg text-white font-mono">
                        ₹{remainingAmount.toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1 border-t border-white/10">
                    <span className="text-slate-400">Total Project Fee:</span>
                    <strong className="text-base text-white font-mono">₹{totalPrice.toLocaleString('en-IN')}</strong>
                  </div>

                  {monthlyMaintenancePrice > 0 && (
                    <div className="flex justify-between items-center text-xs pt-1 text-sky-300 border-t border-white/10">
                      <span>Monthly Maintenance Care:</span>
                      <span className="font-mono">₹{monthlyMaintenancePrice}/month (Starts after launch)</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToPaymentTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToPaymentTerms: e.target.checked })}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <span>
                      I agree to pay 50% advance to initiate development, with the remaining 50% paid upon final website review and approval before DNS handover.
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Any specific deadline, notes, or special requirements?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    placeholder="e.g. Need the website live before our grand re-opening on the 25th..."
                    className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-base sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            {/* Stepper Controls */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-sky-600/20"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.agreedToPaymentTerms || !formData.agreedToDomainOwnership || !formData.agreedToInfraTerms}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit & Launch Project</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
