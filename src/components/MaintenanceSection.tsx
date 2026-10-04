import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Clock, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Lock,
  Globe
} from 'lucide-react';
import { maintenancePlans } from '../config/agencyConfig';
import { getWhatsAppUrl } from '../config/siteConfig';
import { ClientInquiryModal } from './ClientInquiryModal';

export const MaintenanceSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Website Care (₹1,499/mo)');

  const handleSelectPlan = (planName: string, price: string) => {
    setSelectedPlan(`${planName} (${price})`);
    setModalOpen(true);
  };

  return (
    <>
      <section id="maintenance" className="py-16 sm:py-24 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3.5 py-1 rounded-full border border-sky-500/20 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Continuous Care & Peace of Mind</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Recurring Website Maintenance Plans
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Running a business is your priority. Keeping your menu updated, hosting secure, domain active, and website fast is mine.
            </p>
          </div>

          {/* 2 Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {maintenancePlans.map((plan) => {
              const isAdvanced = plan.id === 'advanced-care';
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isAdvanced
                      ? 'bg-gradient-to-b from-sky-500/5 via-slate-50 to-white dark:from-sky-950/30 dark:via-slate-900 dark:to-slate-900 border-2 border-sky-500 dark:border-sky-400 shadow-xl shadow-sky-500/10'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isAdvanced && plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-sky-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-sky-600/30 flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                        {plan.tagline}
                      </p>
                      <div className="mt-4 flex items-baseline gap-1.5">
                        <span className="text-4xl font-black text-slate-900 dark:text-white font-mono">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          billed monthly
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
                        What's Included:
                      </span>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Disclaimers / Boundaries */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Scope & Transparency:</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {plan.disclaimers.map((disc, dIdx) => (
                          <li key={dIdx} className="leading-tight">{disc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <button
                      onClick={() => handleSelectPlan(plan.name, plan.price)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 ${
                        isAdvanced
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white'
                      }`}
                    >
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href={getWhatsAppUrl(`Hi Viswaas, I want to inquire about the ${plan.name} (${plan.price}) maintenance plan.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Ask via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Domain Ownership & Ethical Business Charter */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 sm:p-9 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Clear Domain Ownership & Hosting Architecture
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You retain permanent ownership of your brand assets. No hostage situations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
                  <Check className="w-4 h-4" />
                  <span>CLIENT-OWNED ASSETS (100% Yours)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  Your domain name (.com, .in), Google Business Profile, official email addresses, social media accounts, images, and menu content belong completely to you. I never register your domain under my name.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-400">
                  <Globe className="w-4 h-4" />
                  <span>FREELANCER-MANAGED (Engineering)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                  I handle code development, Vercel cloud deployment, HTTPS SSL certificates, mobile optimization, DNS records configuration, and technical maintenance.
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <p>
                <strong>Infrastructure Costs:</strong> Standard traffic and bandwidth are covered. Heavy video streaming, high serverless API usage, or external database growth are recorded per client and billed transparently after prior notification.
              </p>
              <p>
                <strong>No Fake Guarantees:</strong> We build top-tier, fast, mobile-friendly websites that give local businesses the best chance to convert visitors. We do not make false promises of #1 Google ranking or overnight revenue surges.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultPackage={selectedPlan}
      />
    </>
  );
};
