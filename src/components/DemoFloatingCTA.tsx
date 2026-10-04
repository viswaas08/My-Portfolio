import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, MessageSquare } from 'lucide-react';
import { ClientInquiryModal } from './ClientInquiryModal';
import { getWhatsAppUrl } from '../config/siteConfig';

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
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto">
        <div className="bg-slate-900/95 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl rounded-2xl p-3 sm:px-5 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
          {/* Left notice */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/demos"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition shrink-0"
              title="Return to Demo Showroom"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">All</span> Demos
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs sm:text-sm font-medium">
                <span className="text-slate-300">Live Demo: </span>
                <span className="text-white font-semibold">{businessName}</span>
                <span className="hidden md:inline text-slate-400 ml-1.5">• Want a website like this for your business?</span>
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={directWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/25 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get This Website
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
