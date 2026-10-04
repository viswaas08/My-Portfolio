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

export const WhyChooseMe: React.FC = () => {
  const points = [
    {
      icon: Smartphone,
      title: "Mobile First Architecture",
      desc: "Designed ground-up for smartphone screens where your local customers browse menus and look for directions.",
      color: "text-sky-500",
      bg: "bg-sky-500/10 dark:bg-sky-500/15"
    },
    {
      icon: Zap,
      title: "Fast-Loading Performance",
      desc: "Built with modern React and clean code so your website loads in under a second without bloated page builders.",
      color: "text-amber-500",
      bg: "bg-amber-500/10 dark:bg-amber-500/15"
    },
    {
      icon: Palette,
      title: "Custom Modern Aesthetics",
      desc: "Distinctive, high-end styling tailored specifically to your trade — no generic copy-pasted templates.",
      color: "text-purple-500",
      bg: "bg-purple-500/10 dark:bg-purple-500/15"
    },
    {
      icon: MessageSquare,
      title: "Seamless WhatsApp Integration",
      desc: "Direct 1-tap chats with pre-filled order and booking inquiries, turning website visitors into immediate conversations.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15"
    },
    {
      icon: Search,
      title: "Local SEO Ready",
      desc: "Proper meta tags, schema markup, and Google Maps alignment so nearby customers can find you effortlessly.",
      color: "text-blue-500",
      bg: "bg-blue-500/10 dark:bg-blue-500/15"
    },
    {
      icon: BadgePercent,
      title: "Honest & Affordable Pricing",
      desc: "Transparent upfront packages starting at ₹4,999 with no sneaky long-term contracts or hidden surprises.",
      color: "text-rose-500",
      bg: "bg-rose-500/10 dark:bg-rose-500/15"
    },
    {
      icon: LayoutGrid,
      title: "Full Cross-Device Compatibility",
      desc: "Flawless rendering and touch-friendly controls tested across iPhone, Android, tablets, laptops, and 4K displays.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10 dark:bg-indigo-500/15"
    },
    {
      icon: Headphones,
      title: "Direct Developer Access",
      desc: "You deal directly with me, Viswaas. No frustrating account managers or offshore communication gaps.",
      color: "text-teal-500",
      bg: "bg-teal-500/10 dark:bg-teal-500/15"
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Why Partner With Viswaa Web
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Built for Real Reliability & Local Conversions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            I don't make unrealistic promises. I deliver clean, fast, and modern digital storefronts that make your business look world-class.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color} mb-4`}>
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
