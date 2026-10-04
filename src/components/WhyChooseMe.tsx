import React from 'react';
import { 
  Smartphone, 
  Zap, 
  Palette, 
  LayoutGrid, 
  MessageSquare, 
  Search, 
  BadgePercent, 
  Headphones
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseMe: React.FC = () => {
  const { t } = useLanguage();

  const styling = [
    { icon: Smartphone, color: "text-sky-500", bg: "bg-sky-500/10 dark:bg-sky-500/15" },
    { icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/15" },
    { icon: Palette, color: "text-purple-500", bg: "bg-purple-500/10 dark:bg-purple-500/15" },
    { icon: MessageSquare, color: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/15" },
    { icon: Search, color: "text-blue-500", bg: "bg-blue-500/10 dark:bg-blue-500/15" },
    { icon: BadgePercent, color: "text-rose-500", bg: "bg-rose-500/10 dark:bg-rose-500/15" },
    { icon: LayoutGrid, color: "text-indigo-500", bg: "bg-indigo-500/10 dark:bg-indigo-500/15" },
    { icon: Headphones, color: "text-teal-500", bg: "bg-teal-500/10 dark:bg-teal-500/15" }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            {t.why.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.why.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.why.subtitle}
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.why.cards.map((item, idx) => {
            const style = styling[idx] || styling[0];
            const Icon = style.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${style.bg} flex items-center justify-center ${style.color} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
