import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FAQSection } from '../components/FAQSection';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-20">
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">
            {lang === 'ta' ? 'வணிக ஆலோசனை' : "Let's Talk Business"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            {lang === 'ta' ? 'தொடர்பு கொண்டு விலைப்பட்டியல் பெறுங்கள்' : 'Get In Touch & Request a Quote'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'ta'
              ? 'கீழே உள்ள படிவத்தை நிரப்பவும் அல்லது உடனடி பதிலைப் பெற வாட்ஸ்அப்பில் நேரடியாக எனக்கு செய்தி அனுப்பவும்.'
              : 'Fill out the form below or message me directly on WhatsApp for an immediate response.'}
          </p>
        </div>
      </section>

      <ContactSection />
      <FAQSection />
    </div>
  );
};
