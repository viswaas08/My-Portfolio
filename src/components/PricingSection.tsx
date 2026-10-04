import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { pricingPackages, pricingNotice, PricingTier } from '../data/pricing';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';

export const PricingSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<PricingTier>(pricingPackages[1]);

  const handleSelectPackage = (pkg: PricingTier) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  const handleWhatsAppInquiry = (pkg: PricingTier) => {
    const url = getWhatsAppUrl(pkg.whatsappMessage);
    window.open(url, '_blank');
  };

  return (
    <>
      <section id="pricing" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Clear & Transparent Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Invest in a Website That Pays For Itself
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              No hidden retainers, no confusing tech jargon. Simple upfront packages built specifically for Indian local businesses.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-white dark:bg-slate-800 border-2 border-sky-500 dark:border-sky-400 shadow-xl shadow-sky-500/10 lg:-translate-y-2'
                    : 'bg-white/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-lg'
                }`}
              >
                {/* Popular Ribbon */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-sky-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package Head */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                      {pkg.tagline}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {pkg.numericPrice ? 'starting price' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Best for description */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Best for:</strong>{' '}
                    {pkg.bestFor}
                  </div>

                  {/* Meta: Delivery & Revisions */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 border-y border-slate-100 dark:border-slate-800 py-3">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{pkg.delivery}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{pkg.revisions}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                      What is included:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA actions */}
                <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition cursor-pointer ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(pkg)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Transparent Notice */}
          <div className="mt-14 max-w-3xl mx-auto rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-6 sm:p-7 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
              <span>{pricingNotice.headline}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {pricingNotice.disclaimer}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
              <strong>Domain & Hosting note:</strong> {pricingNotice.domainHostingNote}
            </p>
          </div>
        </div>
      </section>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackage={`${selectedPkg.name} (${selectedPkg.price})`}
        defaultBusinessType={
          selectedPkg.id === 'starter'
            ? 'Retail Shop'
            : selectedPkg.id === 'business'
            ? 'Restaurant'
            : 'Other Local Business'
        }
      />
    </>
  );
};
