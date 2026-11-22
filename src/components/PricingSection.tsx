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
  ChevronRight,
  Wrench,
  Zap,
  Layers
} from 'lucide-react';
import { PricingService } from '../services/pricingService';
import { PricingTier } from '../data/pricing';
import { MaintenancePlan } from '../types/agency';
import { useLanguage } from '../context/LanguageContext';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';

export const PricingSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [tiers, setTiers] = useState<PricingTier[]>(PricingService.getPricingTiers());
  const [monthlyPlans, setMonthlyPlans] = useState<MaintenancePlan[]>(PricingService.getMaintenancePlans());
  const [selectedPkg, setSelectedPkg] = useState<string>('Business Plan (All Features) (₹14,999)');

  useEffect(() => {
    const handleUpdate = () => {
      setTiers(PricingService.getPricingTiers());
      setMonthlyPlans(PricingService.getMaintenancePlans());
    };
    window.addEventListener('pricing_updated', handleUpdate);
    return () => window.removeEventListener('pricing_updated', handleUpdate);
  }, []);

  const handleSelectPackage = (name: string, price: string) => {
    setSelectedPkg(`${name} (${price})`);
    setModalOpen(true);
  };

  const handleWhatsAppInquiry = (pkg: PricingTier) => {
    const msg = pkg.whatsappMessage || `Hi Viswaas, I want to inquire about the ${pkg.name} package (${pkg.price}) for my business website.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  const handleMonthlyWhatsAppInquiry = (plan: MaintenancePlan) => {
    const msg = `Hi Viswaas, I want to subscribe to the ${plan.name} (${plan.price}) monthly maintenance service for my website.`;
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
  };

  // 3 Core Website Plan Tiles
  const mainTiers = tiers.filter(t => t.id !== 'custom-build' && t.id !== 'custom').slice(0, 3);
  // Separate Dedicated Custom Build Tile
  const customTier = tiers.find(t => t.id === 'custom-build' || t.id === 'custom') || tiers[tiers.length - 1];

  return (
    <>
      <section id="pricing" className="py-12 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.pricing.badge}</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.pricing.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base leading-relaxed max-w-xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          {/* 1. TOP SECTION: THE 3 PLAN TILES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {mainTiers.map((pkg) => {
              const isPopular = pkg.popular;
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isPopular
                      ? 'bg-white dark:bg-slate-800 border-2 border-sky-500 dark:border-sky-400 shadow-xl shadow-sky-500/10 md:-translate-y-2'
                      : 'bg-white/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-lg'
                  }`}
                >
                  {/* Popular Ribbon */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-sky-500/30 flex items-center gap-1.5 whitespace-nowrap z-10">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.pricing.mostPopular}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header: Title + Badge */}
                    <div className="flex items-start justify-between gap-2 pt-1">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {pkg.name}
                        </h3>
                      </div>
                      {pkg.badge && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shrink-0">
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {t.pricing.startingPriceLabel}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[34px] leading-relaxed">
                        {pkg.tagline}
                      </p>
                    </div>

                    {/* Target profile */}
                    {pkg.idealFor && pkg.idealFor.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          Ideal For:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pkg.idealFor.map((item, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-medium"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meta: Delivery & Revisions */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 border-y border-slate-100 dark:border-slate-800 py-2.5">
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
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {t.pricing.includedLabel}
                      </span>
                      <ul className="space-y-2">
                        {pkg.features.map((item, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    <button
                      onClick={() => handleSelectPackage(pkg.name, pkg.price)}
                      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-98 ${
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

          {/* 2. SEPARATE DEDICATED TILE: CUSTOM BUILD */}
          {customTier && (
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border-2 border-indigo-500/40 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left side: Heading, description, targets */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {customTier.badge || 'Bespoke Architecture'}
                    </span>
                    <span className="text-xs text-indigo-200/80 font-mono">Specialized Solutions</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {customTier.name}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                    {customTier.tagline}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Ideal For Specialized Requirements:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {customTier.idealFor?.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-500/20 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {customTier.features.slice(0, 6).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right side: Price & Action trigger */}
                <div className="lg:col-span-5 bg-slate-950/70 border border-indigo-500/30 rounded-2xl p-6 sm:p-7 space-y-5 text-center flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Pricing & Roadmap
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                      {customTier.price}
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      Milestone delivery schedule • Direct WhatsApp & phone roadmap review • Staging environments
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleSelectPackage(customTier.name, customTier.price)}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-400 hover:to-sky-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg shadow-indigo-500/25 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{customTier.ctaText || 'Request Custom Scope'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleWhatsAppInquiry(customTier)}
                      className="w-full py-2 text-xs font-semibold text-emerald-400 hover:underline cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Discuss on WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MONTHLY SERVICES TILES BELOW (₹500 & ₹1,000) */}
          <div className="space-y-8 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20 inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                <span>Continuous Maintenance & Retainers</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Monthly Website Care & Review Plans
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Choose between passive monthly health monitoring or active day-to-day menu, dish, and price updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              {monthlyPlans.map((plan) => {
                const isEveryday = plan.numericMonthlyPrice >= 1000 || plan.id === 'instant-everyday';
                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                      isEveryday
                        ? 'bg-white dark:bg-slate-800 border-2 border-emerald-500 dark:border-emerald-400 shadow-xl shadow-emerald-500/10'
                        : 'bg-white/90 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isEveryday && plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md shadow-emerald-600/30 flex items-center gap-1 whitespace-nowrap z-10">
                        <Zap className="w-3 h-3" />
                        <span>{plan.badge}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                            {plan.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                            {plan.tagline}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          billed monthly
                        </span>
                      </div>

                      <div className="space-y-2 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Included In This Monthly Care:
                        </span>
                        <ul className="space-y-2">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                              <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <button
                        onClick={() => handleSelectPackage(plan.name, plan.price)}
                        className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-98 flex items-center justify-center gap-2 ${
                          isEveryday
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white'
                        }`}
                      >
                        <span>Choose {plan.price} Retainer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleMonthlyWhatsAppInquiry(plan)}
                        className="w-full text-center py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Inquire via WhatsApp</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Transparent Notice */}
          <div className="max-w-3xl mx-auto rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-5 sm:p-7 shadow-sm space-y-3">
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
        defaultPackage={selectedPkg}
        defaultBusinessType="Restaurant"
      />
    </>
  );
};
