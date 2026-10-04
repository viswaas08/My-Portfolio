import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { ProcessSection } from '../components/ProcessSection';
import { ContactSection } from '../components/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export const ServicesPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">
            {lang === 'ta' ? 'உள்ளூர் வணிகங்களுக்கான இணையதள மேம்பாடு' : 'Web Development for Local Businesses'}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 dark:text-white break-words">
            {lang === 'ta' ? 'சேவைகள் & தொழில்நுட்பத் தீர்வுகள்' : 'Services & Technical Capabilities'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'ta' 
              ? 'வாட்ஸ்அப் நேரடி ஆர்டருடன் கூடிய எளிய முகப்புப் பக்கம் முதல் அட்மின் டாஷ்போர்டுகளுடன் கூடிய முழு வணிக மேலாண்மை மென்பொருள்கள் வரை.'
              : 'From single-page storefronts with direct WhatsApp ordering to full-featured business management applications with admin dashboards.'}
          </p>
        </div>
      </section>

      <ServicesSection />
      <ProcessSection />
      <ContactSection />
    </div>
  );
};
