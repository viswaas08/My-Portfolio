import React from 'react';
import { 
  MessageSquareText, 
  Palette, 
  Code2, 
  Eye, 
  Rocket,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ProcessSection: React.FC = () => {
  const { t, lang } = useLanguage();

  const stepIcons = [MessageSquareText, Palette, Code2, Eye, Rocket];
  const stepColors = [
    "from-sky-500 to-blue-600",
    "from-blue-600 to-indigo-600",
    "from-indigo-600 to-violet-600",
    "from-violet-600 to-purple-600",
    "from-purple-600 to-emerald-600"
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            {t.process.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.process.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* Visual Timeline / Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {t.process.steps.map((item, idx) => {
            const Icon = stepIcons[idx] || Rocket;
            const color = stepColors[idx] || "from-sky-500 to-blue-600";
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Step indicator top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'வெளிப்படையான தகவல்கள்' : 'Transparent updates'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
