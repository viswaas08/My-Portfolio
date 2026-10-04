import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactSection } from '../components/ContactSection';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">
            Web Development for Local Businesses
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Services & Technical Capabilities
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            From single-page storefronts with direct WhatsApp ordering to full-featured business management applications with admin dashboards.
          </p>
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </div>
  );
};
