import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';
import { useLanguage } from '../context/LanguageContext';

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
  const [modalOpen, setModalOpen] = useState(false);

  const directWhatsApp = () => {
    const url = getWhatsAppUrl(
      `Hi Viswaas, I was reviewing the "${businessName}" (${businessType}) demo website on Viswaa Web and I want a similar website for my business.`
    );
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Conversion Bar */}
      <div className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-40 max-w-4xl mx-auto">
        <div className="bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-2.5 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 animate-fadeIn">
          {/* Top/Left notice & back link */}
          <div className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto">
            <Link
              to="/demos"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 active:scale-95 transition shrink-0"
              title="Return to Demo Showroom"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.floating.allDemos}</span>
            </Link>
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div className="text-xs sm:text-sm font-medium truncate">
                <span className="text-slate-400 hidden xs:inline">{t.floating.demoLabel} </span>
                <span className="text-white font-semibold">{businessName}</span>
                <span className="hidden md:inline text-slate-400 ml-1.5">• {t.floating.question}</span>
              </div>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={directWhatsApp}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.floating.whatsapp}</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/25 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.floating.getWebsite}</span>
            </button>
          </div>
        </div>
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
