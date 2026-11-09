import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { useBrandCustomizer } from '../context/BrandCustomizerContext';

interface DemoFloatingCTAProps {
  businessName: string;
  businessType: string;
  recommendedPackage?: string;
}

export const DemoFloatingCTA: React.FC<DemoFloatingCTAProps> = ({
  businessName,
  businessType,
  recommendedPackage = 'Business (₹9,999)',
}) => {
  const { t } = useLanguage();
  const { getBrandName } = useBrandCustomizer();
  const [modalOpen, setModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const effectiveBusinessName = getBrandName(businessName);

  const directWhatsApp = () => {
    const url = getWhatsAppUrl(
      `Hi Viswaas, I was reviewing the "${effectiveBusinessName}" (${businessType}) demo website on Viswaa Web and I want a similar website for my business.`
    );
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Conversion Bar */}
      <div className="fixed bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 z-40 max-w-4xl mx-auto">
        {isCollapsed ? (
          <div className="flex justify-end">
            <button
              onClick={() => setIsCollapsed(false)}
              className="px-3.5 py-2 rounded-full bg-slate-900/95 text-white border border-slate-700/80 shadow-xl backdrop-blur-md text-xs font-semibold flex items-center gap-2 hover:bg-slate-800 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Get Website like {effectiveBusinessName}</span>
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-2.5 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 animate-fadeIn">
            {/* Top/Left notice & back link */}
            <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-2 truncate">
                <Link
                  to="/demos"
                  className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 transition shrink-0"
                  title="Return to Demo Showroom"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{t.floating.allDemos}</span>
                </Link>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <div className="text-xs sm:text-sm font-medium truncate">
                    <span className="text-white font-semibold truncate">{effectiveBusinessName}</span>
                    <span className="hidden md:inline text-slate-400 ml-1.5">• {t.floating.question}</span>
                  </div>
                </div>
              </div>

              {/* Collapse toggle on mobile */}
              <button
                onClick={() => setIsCollapsed(true)}
                className="sm:hidden p-1 rounded-lg text-slate-400 hover:text-white"
                title="Minimize bar"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Actions row */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={directWhatsApp}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs sm:text-sm font-medium transition cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.floating.whatsapp}</span>
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/25 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.floating.getWebsite}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <ClientInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultBusinessType={businessType}
        defaultPackage={recommendedPackage}
      />
    </>
  );
};
