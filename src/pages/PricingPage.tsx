import React from 'react';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';

export const PricingPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
            Upfront & Honest Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Simple Packages for Every Business Stage
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Choose between Starter, Business (Most Popular), or custom Pro Web Applications with zero hidden costs.
          </p>
        </div>
      </section>

      <PricingSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
};
