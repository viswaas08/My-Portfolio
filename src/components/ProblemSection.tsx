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

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: Globe2,
      title: "No Professional Website",
      desc: "Relying purely on social media pages or outdated directories makes your business look informal and leaves potential customers skeptical.",
      color: "text-amber-500",
      bg: "bg-amber-500/10 dark:bg-amber-500/15"
    },
    {
      icon: Smartphone,
      title: "Doesn't Work Well on Mobile",
      desc: "Over 80% of local diners and shoppers search on their phones. If your page is slow or awkward to scroll, they click back to a competitor in seconds.",
      color: "text-rose-500",
      bg: "bg-rose-500/10 dark:bg-rose-500/15"
    },
    {
      icon: MenuSquare,
      title: "Menu & Services Are Hard to See",
      desc: "Customers get frustrated searching through messy PDF attachments or blurry photos just to check what dishes, haircuts, or products you offer.",
      color: "text-blue-500",
      bg: "bg-blue-500/10 dark:bg-blue-500/15"
    },
    {
      icon: MessageCircleOff,
      title: "No Clear WhatsApp Contact Option",
      desc: "Nobody wants to fill out obsolete 10-field contact forms. Today's customers want a 1-tap direct WhatsApp conversation to place orders or ask questions.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15"
    },
    {
      icon: SearchX,
      title: "Key Info is Difficult to Find",
      desc: "Opening hours, today's availability, exact Google Map location, and payment methods should take 2 seconds to spot, not endless scrolling.",
      color: "text-violet-500",
      bg: "bg-violet-500/10 dark:bg-violet-500/15"
    },
    {
      icon: ShieldAlert,
      title: "Outdated Online Appearance",
      desc: "First impressions are made online. A modern, polished website immediately signals superior hygiene, service quality, and reliability.",
      color: "text-sky-500",
      bg: "bg-sky-500/10 dark:bg-sky-500/15"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            The Local Business Challenge
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Is Your Business Missing Customers Online?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Every single day, nearby people search for restaurants, salons, groceries, and clinics around your locality. Here is why many walk into competing stores instead:
          </p>
        </div>

        {/* 6 Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
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
            "Your customers are already online.{' '}
            <span className="text-sky-600 dark:text-sky-400">
              Your business should be too.
            </span>"
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A fast, mobile-friendly website acts as your 24/7 digital front door — answering questions, showing photos, and booking appointments even while you sleep.
          </p>
          <div className="pt-2">
            <Link
              to="/demos"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300"
            >
              <span>See how your business can look</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
