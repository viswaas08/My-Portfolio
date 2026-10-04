import React from 'react';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-12 bg-slate-100/60 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
            Full-Stack Systems
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Engineering & Technical Work
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Complex applications solving real operational problems through role-based access, databases, APIs, and modern React architectures.
          </p>
        </div>
      </section>

      <ProjectsSection />
      <ContactSection />
    </div>
  );
};
