import React from 'react';
import { 
  Globe2, 
  Smartphone, 
  MenuSquare, 
  MessageCircleOff, 
  SearchX, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const ProblemSection: React.FC = () => {
  const { t } = useLanguage();

  const problemIcons = [
    { icon: Globe2, color: "text-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/15" },
    { icon: Smartphone, color: "text-rose-500", bg: "bg-rose-500/10 dark:bg-rose-500/15" },
    { icon: MenuSquare, color: "text-blue-500", bg: "bg-blue-500/10 dark:bg-blue-500/15" },
    { icon: MessageCircleOff, color: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/15" },
    { icon: SearchX, color: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/15" },
    { icon: ShieldAlert, color: "text-sky-500", bg: "bg-sky-500/10 dark:bg-sky-500/15" },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            {t.problem.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.problem.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.problem.subtitle}
          </p>
        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.problem.items.map((item, idx) => {
            const visual = problemIcons[idx] || problemIcons[0];
            const Icon = visual.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-xl ${visual.bg} flex items-center justify-center ${visual.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact Conclusion Box */}
        <div className="mt-12 text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/10 border border-sky-500/20 space-y-4">
          <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            "{t.problem.quote}{' '}
            <span className="text-sky-600 dark:text-sky-400">
              {t.problem.quoteHighlight}
            </span>"
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {t.problem.quoteSub}
          </p>
          <div className="pt-2">
            <Link
              to="/demos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
            >
              <span>{t.problem.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
