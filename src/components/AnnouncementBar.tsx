import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, X } from 'lucide-react';
import { SiteSettingsService, AnnouncementSettings } from '../services/siteSettingsService';
import { getWhatsAppUrl } from '../config/siteConfig';

export const AnnouncementBar: React.FC = () => {
  const [announcement, setAnnouncement] = useState<AnnouncementSettings>(
    () => SiteSettingsService.getSettings().announcement
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setAnnouncement(SiteSettingsService.getSettings().announcement);
    };
    window.addEventListener('site_settings_updated', handleUpdate);
    return () => window.removeEventListener('site_settings_updated', handleUpdate);
  }, []);

  if (!announcement?.enabled || dismissed) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(`Hi, I'm reaching out about the announcement offer: "${announcement.text}"`);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white text-xs py-2 px-3 sm:px-4 relative z-50 shadow-sm border-b border-sky-400/20 animate-fadeIn">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 truncate">
          {announcement.badge && (
            <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-amber-300" />
              <span>{announcement.badge}</span>
            </span>
          )}
          <span className="font-medium text-white truncate text-center">
            {announcement.text}
          </span>
          {announcement.linkText && (
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-1 font-bold underline hover:text-sky-200 transition text-[11px] sm:text-xs shrink-0 cursor-pointer ml-1"
            >
              <MessageSquare className="w-3 h-3 text-emerald-300" />
              <span>{announcement.linkText}</span>
            </button>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition shrink-0 cursor-pointer"
          aria-label="Dismiss banner"
          title="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
