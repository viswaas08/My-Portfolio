import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { DemoItem } from '../data/demos';
import { useLanguage } from '../context/LanguageContext';

interface DemoCardProps {
  demo: DemoItem;
}

export const DemoCard: React.FC<DemoCardProps> = ({ demo }) => {
  const { t } = useLanguage();

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-400/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Preview Image with overlay tags */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
          <img
            src={demo.previewImage}
            alt={`${demo.businessName} preview`}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80" />

          {/* Top category badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
              {demo.categoryTag}
            </span>
          </div>

          {/* Bottom title & tagline */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[11px] font-medium text-amber-300 block mb-0.5">
              {demo.industry}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              {demo.businessName}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed min-h-[40px]">
            {demo.description}
          </p>

          {/* Recommendation tag */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500 dark:text-slate-400">{t.demos.recommendedPlan}</span>
            <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {demo.recommendedPackage} ({demo.packagePrice})
            </span>
          </div>

          {/* Feature Highlights */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
              {t.demos.keyFeatures}
            </span>
            <ul className="space-y-1.5">
              {demo.features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="p-5 sm:p-6 pt-0">
        <Link
          to={demo.route}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 dark:bg-slate-700 dark:hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm transition-all duration-200 group-hover:shadow-md cursor-pointer"
        >
          <span>{t.demos.openDemo}</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
