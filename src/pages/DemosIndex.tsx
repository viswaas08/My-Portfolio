import React from 'react';
import { DemosSection } from '../components/DemosSection';
import { ContactSection } from '../components/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export const DemosIndex: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-20">
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400">
            {lang === 'ta' ? 'நேரலை மாதிரி இணையதளங்கள்' : 'Live Working Demos'}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 dark:text-white break-words">
            {lang === 'ta' ? '8 மாதிரி வணிக இணையதளங்களை பாருங்கள்' : 'Explore 8 Realistic Local Business Websites'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'ta'
              ? 'மெனுக்கள், அப்பாயிண்ட்மென்ட் படிவங்கள், மொபைல் வடிவமைப்பு மற்றும் நேரடி வாட்ஸ்அப் ஆர்டர் ஒருங்கிணைப்புகளைக் காண கீழே உள்ள ஏதேனும் ஒரு மாதிரியைத் திறக்கவும்.'
              : 'Click into any demo below to see menus, appointment booking forms, mobile-first layouts, and direct WhatsApp order integrations in action.'}
          </p>
        </div>
      </section>

      <DemosSection />
      <ContactSection />
    </div>
  );
};
