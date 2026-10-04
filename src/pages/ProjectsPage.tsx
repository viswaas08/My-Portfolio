import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { useLanguage } from '../context/LanguageContext';

export const ProjectsPage: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <div className="pt-20">
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            {lang === 'ta' ? 'முழுமையான வலை அமைப்புகள்' : 'Full-Stack Systems'}
          </span>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 dark:text-white break-words">
            {lang === 'ta' ? 'தொழில்நுட்ப மற்றும் பொறியியல் திட்டங்கள்' : 'Engineering & Technical Work'}
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            {lang === 'ta'
              ? 'பயனர் அனுமதிகள், டேட்டாபேஸ்கள், APIகள் மற்றும் நவீன ரியாக்ட் கட்டமைப்புகளுடன் உண்மையான செயல்பாட்டு சிக்கல்களைத் தீர்க்கும் பயன்பாடுகள்.'
              : 'Complex applications solving real operational problems through role-based access, databases, APIs, and modern React architectures.'}
          </p>
        </div>
      </section>

      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
