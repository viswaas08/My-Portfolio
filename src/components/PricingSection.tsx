import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  Clock, 
  RotateCcw, 
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { PricingService } from '../services/pricingService';
import { PricingTier } from '../data/pricing';
import { useLanguage } from '../context/LanguageContext';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';

export const PricingSection: React.FC = () => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [tiers, setTiers] = useState<PricingTier[]>(PricingService.getPricingTiers());
  const [selectedPkg, setSelectedPkg] = useState<PricingTier>(tiers[1] || tiers[0]);

  useEffect(() => {
    const handleUpdate = () => {
      setTiers(PricingService.getPricingTiers());
    };
    window.addEventListener('pricing_updated', handleUpdate);
    return () => window.removeEventListener('pricing_updated', handleUpdate);
  }, []);

  const handleSelectPackage = (pkg: PricingTier) => {
    setSelectedPkg(pkg);
    setModalOpen(true);
  };

  const handleWhatsAppInquiry = (pkg: PricingTier) => {
    const msg = pkg.whatsappMessage || `Hi Viswaas, I want to choose the ${pkg.name} package (${pkg.price}) for my business website.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  return (
    <>
      <section id="pricing" className="py-12 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              {t.pricing.badge}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'bg-white dark:bg-slate-800 border-2 border-sky-500 dark:border-sky-400 shadow-xl shadow-sky-500/10 lg:-translate-y-2'
                      : 'bg-white/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Popular Ribbon */}
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shadow-sky-500/30 flex items-center gap-1 whitespace-nowrap z-10">
                      <Sparkles className="w-3 h-3" />
                      <span>{t.pricing.mostPopular}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header: Title + Badge */}
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                          {pkg.name}
                        </h3>
                      </div>
                      {pkg.badge && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                          {pkg.price}
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          {t.pricing.startingPriceLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px] leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Ideal For / Best for */}
                    {pkg.idealFor && pkg.idealFor.length > 0 ? (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Ideal For:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pkg.idealFor.slice(0, 4).map((item, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white">Best for:</strong> {pkg.bestFor}
                      </div>
                    )}

                    {/* Meta: Delivery & Revisions */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300 border-y border-slate-100 dark:border-slate-800 py-2.5">
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                        <span className="truncate">{pkg.delivery}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <RotateCcw className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{pkg.revisions}</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {t.pricing.includedLabel}
                      </span>
                      <ul className="space-y-1.5">
                        {pkg.features.map((item, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Bottom CTA actions */}
                  <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition cursor-pointer active:scale-98 ${
                        isPopular
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/25'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white'
                      }`}
                    >
                      <span>{pkg.ctaText || `Choose ${pkg.name}`}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleWhatsAppInquiry(pkg)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{t.pricing.whatsappInquiry}</span>
                    </button>

                    {pkg.recommendedDemoId && (
                      <Link
                        to={`/demos/${pkg.recommendedDemoId}`}
                        className="w-full inline-flex items-center justify-center gap-1 pt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
                      >
                        <span>See Demo Preview</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Transparent Notice */}
          <div className="mt-10 sm:mt-14 max-w-3xl mx-auto rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-5 sm:p-7 shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
              <span>{t.pricing.noticeTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.pricing.noticeDesc}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
              <strong>Domain & Hosting:</strong> {t.pricing.domainNote}
            </p>
          </div>
        </div>
      </section>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackage={`${selectedPkg.name} (${selectedPkg.price})`}
        defaultBusinessType="Restaurant"
      />
    </>
  );
};
