import React from 'react';
import { 
  MessageSquareText, 
  Palette, 
  Code2, 
  Eye, 
  Rocket,
  CheckCircle2
} from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: MessageSquareText,
      title: "Tell Me About Your Business",
      desc: "Share your business details, food menu, services, photos, and contact info via WhatsApp or a short phone call.",
      color: "from-sky-500 to-blue-600"
    },
    {
      step: "02",
      icon: Palette,
      title: "Choose Your Design & Vibe",
      desc: "Select a visual direction, color theme, and layout that matches your store's personality and local customer base.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      step: "03",
      icon: Code2,
      title: "I Build Your Website",
      desc: "I craft a fast, mobile-friendly website with custom WhatsApp ordering, Google Maps, and SEO optimization in 5–10 days.",
      color: "from-indigo-600 to-violet-600"
    },
    {
      step: "04",
      icon: Eye,
      title: "You Review & Request Revisions",
      desc: "You test the live preview link on your own phone. We refine menu items, prices, and copy together until you love it.",
      color: "from-violet-600 to-purple-600"
    },
    {
      step: "05",
      icon: Rocket,
      title: "Launch & Go Live",
      desc: "We connect your custom domain (yourbusiness.com/.in), verify on Google Search, and celebrate your new digital storefront!",
      color: "from-purple-600 to-emerald-600"
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Simple 5-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From initial idea to live domain launch in as little as 5 days. No technical headaches on your end.
          </p>
        </div>

        {/* Visual Timeline / Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200"
              >
                {/* Step indicator top */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
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
                  <span>Transparent updates</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
