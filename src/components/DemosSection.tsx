import React, { useState } from 'react';
import { Sparkles, Layers, Store, X, RotateCcw } from 'lucide-react';
import { demosData } from '../data/demos';
import { DemoCard } from './DemoCard';
import { useLanguage } from '../context/LanguageContext';
import { useBrandCustomizer } from '../context/BrandCustomizerContext';

export const DemosSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const { customBrandName, setCustomBrandName, resetCustomBrandName } = useBrandCustomizer();
  const [filter, setFilter] = useState<string>('All');

  const categories = [
    { key: 'All', label: t.demos.filterAll },
    { key: 'Food & Dining', label: lang === 'ta' ? 'உணவு & டைனிங்' : 'Food & Dining' },
    { key: 'Beverages & Bites', label: lang === 'ta' ? 'கஃபே & பேக்கரி' : 'Beverages & Bites' },
    { key: 'Beauty & Wellness', label: lang === 'ta' ? 'அழகு & சலூன்' : 'Beauty & Wellness' },
    { key: 'Health & Fitness', label: lang === 'ta' ? 'உடற்பயிற்சி & ஜிம்' : 'Health & Fitness' },
    { key: 'Retail & Groceries', label: lang === 'ta' ? 'மளிகை & கடைகள்' : 'Retail & Groceries' },
    { key: 'Education & Coaching', label: lang === 'ta' ? 'கல்வி & டியூஷன்' : 'Education & Coaching' },
    { key: 'Healthcare & Wellness', label: lang === 'ta' ? 'மருத்துவம் & கிளினிக்' : 'Healthcare & Wellness' }
  ];

  const filteredDemos = filter === 'All' 
    ? demosData 
    : demosData.filter((d) => d.categoryTag === filter);

  return (
    <section id="demos" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.demos.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.demos.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.demos.subtitle}
          </p>

          {/* Interactive Live Brand Preview Input */}
          <div className="pt-2 max-w-lg mx-auto">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-slate-800/90 border border-sky-500/30 shadow-lg flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white flex items-center justify-center shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                placeholder={lang === 'ta' ? 'உங்கள் பிராண்ட் பெயரை உள்ளிடுக (உதா: ராயல் பிரியாணி)...' : 'Type your brand name (e.g. Royal Biryani)...'}
                className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              {customBrandName && (
                <button
                  onClick={resetCustomBrandName}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  title="Clear"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {customBrandName && (
              <p className="text-[11px] text-sky-600 dark:text-sky-400 mt-1.5 font-medium">
                ✨ {lang === 'ta' ? 'அனைத்து மாதிரிகளும் உங்கள் பிராண்டிற்கு மாறின!' : 'Live preview active: All demos updated to your brand!'}
              </p>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center sm:justify-center gap-2 pt-4 overflow-x-auto no-scrollbar pb-2 px-1 sm:flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  filter === cat.key
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  );
};
