import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Store, 
  UtensilsCrossed, 
  Database, 
  Sparkles, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { servicesData, ServiceItem } from '../data/services';
import { ClientInquiryModal } from './ClientInquiryModal';

const iconMap: Record<string, React.ElementType> = {
  Store,
  UtensilsCrossed,
  Database,
  Sparkles,
};

export const ServicesSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleServiceSelect = (service: ServiceItem) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <>
      <section id="services" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-600 dark:text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Services & Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Website Solutions Built for Real Local Growth
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Every package is tailored to help nearby customers discover you on Google Maps, browse what you offer on their smartphones, and contact you directly via WhatsApp.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service) => {
              const Icon = iconMap[service.iconName] || Sparkles;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-sky-500/40 dark:hover:border-sky-400/40 transition-all duration-200 group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition">
                        <Icon className="w-6 h-6" />
                      </div>
                      {service.badge && (
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Title & Price */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-xs text-slate-500 dark:text-slate-400">Starting from</span>
                        <span className="text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                          {service.startingPrice}
                        </span>
                      </div>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Best for tags */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block mb-1.5">
                        Ideal For:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.idealFor.map((item, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features checklist */}
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                        Included Features:
                      </span>
                      <ul className="space-y-1.5">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700/60 space-y-2">
                    <button
                      onClick={() => handleServiceSelect(service)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-sky-600 dark:hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {service.recommendedDemoId && (
                      <Link
                        to={`/demos/${service.recommendedDemoId}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition"
                      >
                        <span>See Demo Preview</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultBusinessType={selectedService?.idealFor?.[0] || 'Restaurant'}
        defaultPackage={selectedService ? `${selectedService.title} (${selectedService.startingPrice})` : 'Business (₹9,999)'}
      />
    </>
  );
};
