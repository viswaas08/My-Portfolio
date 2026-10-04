import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Monitor, 
  MessageSquare,
  Star,
  Clock,
  MapPin,
  Utensils
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { ClientInquiryModal } from './ClientInquiryModal';

export const Hero: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { t, lang } = useLanguage();

  return (
    <>
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/15 border border-sky-500/20 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.14] break-words">
                {t.hero.headlinePart1}{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  {t.hero.headlinePart2}
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.supporting}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  to="/demos"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-sky-600/25 transition cursor-pointer text-sm sm:text-base group"
                >
                  <span>{t.hero.viewDemos}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer text-sm sm:text-base shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>{t.hero.consultation}</span>
                </button>
              </div>

              {/* Trust Line */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.hero.trust1}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.hero.trust2}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.hero.trust3}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.hero.trust4}
                </span>
              </div>
            </div>

            {/* Right Visual: Realistic Restaurant Website Preview on Desktop & Mobile */}
            <div className="lg:col-span-5 relative max-w-md sm:max-w-xl mx-auto lg:max-w-none w-full">
              {/* Desktop Mockup Frame */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden">
                {/* Browser top chrome */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-slate-800/90 text-slate-300 text-[11px] font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    spiceroute-restaurant.in
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{t.hero.previewBadge}</div>
                </div>

                {/* Simulated Business Website Screen */}
                <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 via-stone-900 to-slate-950 text-white space-y-4">
                  {/* Restaurant mini navbar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                        <Utensils className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-sm tracking-wide text-amber-400">
                        SPICE ROUTE
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-300">
                      <span className="hidden sm:inline">Menu</span>
                      <span className="hidden sm:inline">About</span>
                      <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-bold text-[11px]">
                        {t.hero.orderOnline}
                      </span>
                    </div>
                  </div>

                  {/* Restaurant hero mini banner */}
                  <div className="rounded-xl overflow-hidden relative bg-gradient-to-r from-amber-950/60 to-slate-900 p-4 border border-amber-500/20">
                    <div className="max-w-[70%] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {lang === 'ta' ? 'தென்னிந்திய ஸ்பெஷல்' : 'South Indian Special'}
                      </span>
                      <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight">
                        {lang === 'ta' ? 'செட்டிநாடு பிரியாணி & மொறுமொறு தோசை' : 'Authentic Chettinad Biryani & Crispy Dosas'}
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        {lang === 'ta' ? 'இன்று திறந்துள்ளது • 11:30 AM – 11:00 PM' : 'Open today • 11:30 AM – 11:00 PM'}
                      </p>
                    </div>
                    <div className="absolute right-3 top-3 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-amber-400/30 shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80"
                        alt="Biryani preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Sample popular item cards */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-100">{t.hero.dishName1}</div>
                        <div className="text-[10px] text-amber-400 font-bold">₹140</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                        Veg
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-semibold text-slate-100">{t.hero.dishName2}</div>
                        <div className="text-[10px] text-amber-400 font-bold">₹360</div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                        Chef Pick
                      </span>
                    </div>
                  </div>

                  {/* Trust footer indicators */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-white">4.8</span>
                      <span>(520+ Reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-medium">
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Enabled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Phone Mockup (Layered Overlapping) */}
              <div className="absolute -bottom-6 right-0 sm:-bottom-8 sm:-right-4 w-44 sm:w-52 rounded-3xl bg-slate-950 p-2 border-2 border-slate-700 shadow-2xl hidden sm:block">
                {/* Screen frame */}
                <div className="rounded-2xl bg-stone-950 overflow-hidden text-white p-3 space-y-2.5 border border-slate-800">
                  <div className="flex items-center justify-between text-[9px] text-slate-400 border-b border-white/10 pb-1.5">
                    <span className="font-bold text-amber-400">Spice Route</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold">OPEN</span>
                  </div>
                  <div className="w-full h-20 rounded-lg overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=400&q=80"
                      alt="Dosa preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-1.5">
                      <span className="text-[10px] font-bold text-white leading-none">{t.hero.whatsappDirect}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium text-slate-200">{t.hero.tableBooking}</span>
                    <span className="text-amber-400 font-bold">Book Free</span>
                  </div>
                  <div className="w-full py-1.5 rounded-lg bg-emerald-600 text-center font-bold text-[10px] text-white flex items-center justify-center gap-1">
                    <MessageSquare className="w-2.5 h-2.5" /> Order on WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultBusinessType="Restaurant"
        defaultPackage="Business (₹9,999)"
      />
    </>
  );
};
