import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Globe, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  HelpCircle, 
  MessageSquare, 
  Eye, 
  Layers, 
  Megaphone, 
  Check, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { SiteSettingsService, WebsiteDetails } from '../../services/siteSettingsService';
import { ServiceItem } from '../../data/services';
import { FAQItem } from '../../data/faq';
import { Link } from 'react-router-dom';

export const AdminWebsiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<WebsiteDetails>(SiteSettingsService.getSettings());
  const [activeTab, setActiveTab] = useState<'contact' | 'brand' | 'hero' | 'announcement' | 'services' | 'faqs'>('contact');
  const [savedSuccess, setSavedSuccess] = useState(false);
  
  // FAQ New state
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  
  // Feature new for services
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [newServiceFeature, setNewServiceFeature] = useState('');

  useEffect(() => {
    setSettings(SiteSettingsService.getSettings());
  }, []);

  const handleSave = () => {
    SiteSettingsService.saveSettings(settings);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all website contact info, hero copy, announcement banner, and FAQs back to initial defaults?')) {
      const def = SiteSettingsService.resetSettings();
      setSettings(def);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // Contact / Brand helper
  const updateContact = (key: keyof WebsiteDetails['contact'], val: string) => {
    setSettings(prev => ({
      ...prev,
      contact: { ...prev.contact, [key]: val }
    }));
  };

  const updateBrand = (key: keyof WebsiteDetails['brand'], val: string) => {
    setSettings(prev => ({
      ...prev,
      brand: { ...prev.brand, [key]: val }
    }));
  };

  const updateHero = (key: keyof WebsiteDetails['hero'], val: any) => {
    setSettings(prev => ({
      ...prev,
      hero: { ...prev.hero, [key]: val }
    }));
  };

  const updateAnnouncement = (key: keyof WebsiteDetails['announcement'], val: any) => {
    setSettings(prev => ({
      ...prev,
      announcement: { ...prev.announcement, [key]: val }
    }));
  };

  // FAQ Handlers
  const handleAddFaq = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const updatedFaqs = [...settings.faqs, { question: newQuestion.trim(), answer: newAnswer.trim() }];
    setSettings(prev => ({ ...prev, faqs: updatedFaqs }));
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleRemoveFaq = (idx: number) => {
    const updatedFaqs = settings.faqs.filter((_, i) => i !== idx);
    setSettings(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  const handleUpdateFaq = (idx: number, field: 'question' | 'answer', val: string) => {
    const updatedFaqs = [...settings.faqs];
    updatedFaqs[idx] = { ...updatedFaqs[idx], [field]: val };
    setSettings(prev => ({ ...prev, faqs: updatedFaqs }));
  };

  // Service Handlers
  const handleUpdateService = (idx: number, field: keyof ServiceItem, val: any) => {
    const updated = [...settings.services];
    updated[idx] = { ...updated[idx], [field]: val };
    setSettings(prev => ({ ...prev, services: updated }));
  };

  const handleAddServiceFeature = (serviceIdx: number) => {
    if (!newServiceFeature.trim()) return;
    const updated = [...settings.services];
    updated[serviceIdx].features = [...updated[serviceIdx].features, newServiceFeature.trim()];
    setSettings(prev => ({ ...prev, services: updated }));
    setNewServiceFeature('');
  };

  const handleRemoveServiceFeature = (serviceIdx: number, featIdx: number) => {
    const updated = [...settings.services];
    updated[serviceIdx].features = updated[serviceIdx].features.filter((_, i) => i !== featIdx);
    setSettings(prev => ({ ...prev, services: updated }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
              Agency Master Suite
            </span>
            <span className="text-xs text-slate-400">Live Website Content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2.5">
            <Settings className="w-7 h-7 text-sky-400" />
            <span>Website Details & Content Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Control your agency contact numbers, email, brand title, hero headlines, top announcement bar, service cards, and customer FAQs from one central dashboard.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleReset}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            title="Restore original preset settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-sky-600/25 transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Details</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="font-semibold">
            Website details successfully updated! Public navigation, footer, hero, and WhatsApp channels are now active with your latest changes.
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { key: 'contact', label: 'Contact & Social Info', icon: Phone },
          { key: 'brand', label: 'Brand & Agency Identity', icon: Globe },
          { key: 'hero', label: 'Hero Section Copy', icon: Sparkles },
          { key: 'announcement', label: 'Top Announcement Banner', icon: Megaphone },
          { key: 'services', label: 'Services Showcase', icon: Layers },
          { key: 'faqs', label: 'FAQ Manager', icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CONTACT & SOCIAL INFO */}
      {activeTab === 'contact' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-sky-400" />
              <span>Contact Channels & Direct Inquiries</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Updates your direct WhatsApp number, display phone, email, and social profiles across the public site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Number (International format) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>WhatsApp Number (Digits with Country Code)</span>
                <span className="text-[10px] text-emerald-400 font-mono">e.g. 916382450849</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={settings.contact.whatsappNumber}
                  onChange={(e) => updateContact('whatsappNumber', e.target.value)}
                  placeholder="916382450849"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Used for all one-click WhatsApp chat and order routing buttons.</p>
            </div>

            {/* Display Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Display Phone Number (Public formatting)</span>
                <span className="text-[10px] text-slate-400">e.g. +91 63824 50849</span>
              </label>
              <input
                type="text"
                value={settings.contact.phoneDisplay}
                onChange={(e) => updateContact('phoneDisplay', e.target.value)}
                placeholder="+91 63824 50849"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Primary Email Address</span>
              </label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                placeholder="viswaas08@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Business Location / City</span>
              </label>
              <input
                type="text"
                value={settings.contact.location}
                onChange={(e) => updateContact('location', e.target.value)}
                placeholder="Coimbatore, Tamil Nadu, India"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            {/* Business Hours */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-400" />
                <span>Operating / Response Timings</span>
              </label>
              <input
                type="text"
                value={settings.contact.businessHours}
                onChange={(e) => updateContact('businessHours', e.target.value)}
                placeholder="Mon – Sat: 9:00 AM – 9:00 PM IST"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Social Profiles */}
          <div className="border-t border-slate-800 pt-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Share2 className="w-4 h-4 text-sky-400" />
              <span>Social & Developer Profiles</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  value={settings.contact.linkedinUrl}
                  onChange={(e) => updateContact('linkedinUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                <input
                  type="text"
                  value={settings.contact.githubUrl}
                  onChange={(e) => updateContact('githubUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={settings.contact.instagramUrl}
                  onChange={(e) => updateContact('instagramUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRAND & AGENCY IDENTITY */}
      {activeTab === 'brand' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <span>Brand Identity & Agency Names</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Controls your public agency title, founder branding, and primary slogans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Brand / Agency Name</label>
              <input
                type="text"
                value={settings.brand.name}
                onChange={(e) => updateBrand('name', e.target.value)}
                placeholder="VISWAA WEB"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Developer / Founder Name</label>
              <input
                type="text"
                value={settings.brand.developer}
                onChange={(e) => updateBrand('developer', e.target.value)}
                placeholder="Viswaas"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Brand Tagline</label>
              <input
                type="text"
                value={settings.brand.tagline}
                onChange={(e) => updateBrand('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Subheadline Statement</label>
              <textarea
                rows={2}
                value={settings.brand.subheadline}
                onChange={(e) => updateBrand('subheadline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HERO SECTION COPY */}
      {activeTab === 'hero' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Hero Section Copy & Conversion Badges</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust the primary hero headline, value proposition, and key trust statements.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Top Eyebrow Badge</label>
              <input
                type="text"
                value={settings.hero.badge}
                onChange={(e) => updateHero('badge', e.target.value)}
                placeholder="Direct Developer • Zero Agency Bloat"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Headline Part 1</label>
                <input
                  type="text"
                  value={settings.hero.headlinePart1}
                  onChange={(e) => updateHero('headlinePart1', e.target.value)}
                  placeholder="High-Impact Websites for"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Headline Part 2 (Gradient Highlight)</label>
                <input
                  type="text"
                  value={settings.hero.headlinePart2}
                  onChange={(e) => updateHero('headlinePart2', e.target.value)}
                  placeholder="Restaurants, Cafes & Local Businesses"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Supporting Paragraph</label>
              <textarea
                rows={3}
                value={settings.hero.supporting}
                onChange={(e) => updateHero('supporting', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
              />
            </div>

            {/* Trust points list */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Hero Trust Points (4 highlights)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {settings.hero.trustPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-5 text-right text-xs font-mono text-slate-500 shrink-0">{idx + 1}.</span>
                    <input
                      type="text"
                      value={pt}
                      onChange={(e) => {
                        const updated = [...settings.hero.trustPoints];
                        updated[idx] = e.target.value;
                        updateHero('trustPoints', updated);
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: TOP ANNOUNCEMENT BANNER */}
      {activeTab === 'announcement' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-emerald-400" />
                <span>Top Announcement & Promotion Banner</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Displays a prominent notice bar above the navbar across the entire website.
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-white cursor-pointer bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={settings.announcement.enabled}
                onChange={(e) => updateAnnouncement('enabled', e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-700 bg-slate-900"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Banner Badge Text</label>
                <input
                  type="text"
                  value={settings.announcement.badge}
                  onChange={(e) => updateAnnouncement('badge', e.target.value)}
                  placeholder="Special Offer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Action Button Label</label>
                <input
                  type="text"
                  value={settings.announcement.linkText}
                  onChange={(e) => updateAnnouncement('linkText', e.target.value)}
                  placeholder="Claim on WhatsApp"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Announcement Content</label>
              <textarea
                rows={2}
                value={settings.announcement.text}
                onChange={(e) => updateAnnouncement('text', e.target.value)}
                placeholder="Launching a new local business? Get 15% off all website packages this month!"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
              />
            </div>

            {/* Live Preview of Banner */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Banner Live Preview
              </span>
              <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                    {settings.announcement.badge}
                  </span>
                  <span>{settings.announcement.text}</span>
                </div>
                <span className="underline font-bold text-[11px] flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {settings.announcement.linkText}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SERVICES SHOWCASE */}
      {activeTab === 'services' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-400" />
              <span>Services & Offerings Details</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit service titles, starting prices, and deliverable bullet points.
            </p>
          </div>

          {/* Service Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {settings.services.map((svc, idx) => (
              <button
                key={svc.id}
                onClick={() => setActiveServiceIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  activeServiceIdx === idx
                    ? 'bg-sky-600 text-white border-sky-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <span>{svc.title}</span>
                <span className="ml-1.5 opacity-70 font-mono">({svc.startingPrice})</span>
              </button>
            ))}
          </div>

          {/* Active Service Form */}
          {settings.services[activeServiceIdx] && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={settings.services[activeServiceIdx].title}
                    onChange={(e) => handleUpdateService(activeServiceIdx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={settings.services[activeServiceIdx].startingPrice}
                    onChange={(e) => handleUpdateService(activeServiceIdx, 'startingPrice', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle / Summary</label>
                <input
                  type="text"
                  value={settings.services[activeServiceIdx].subtitle}
                  onChange={(e) => handleUpdateService(activeServiceIdx, 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>

              {/* Features of this service */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Included Features ({settings.services[activeServiceIdx].features.length})
                  </label>
                </div>

                <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                  {settings.services[activeServiceIdx].features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <span className="w-5 text-right text-xs font-mono text-slate-500 shrink-0">{fIdx + 1}.</span>
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => {
                          const updated = [...settings.services];
                          updated[activeServiceIdx].features[fIdx] = e.target.value;
                          setSettings(prev => ({ ...prev, services: updated }));
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:border-sky-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleRemoveServiceFeature(activeServiceIdx, fIdx)}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={newServiceFeature}
                    onChange={(e) => setNewServiceFeature(e.target.value)}
                    placeholder="Add a new deliverable..."
                    className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleAddServiceFeature(activeServiceIdx)}
                    className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: FAQ MANAGER */}
      {activeTab === 'faqs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <span>Frequently Asked Questions Manager ({settings.faqs.length})</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit existing questions, update answers, or add new high-trust FAQs for potential clients.
            </p>
          </div>

          {/* Add New FAQ Form */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              + Add New Question & Answer
            </span>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Question: e.g. Do you provide support on weekends?"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
            />
            <textarea
              rows={2}
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Answer: e.g. Yes, urgent deployment or hosting inquiries are handled same-day via priority WhatsApp..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none resize-none"
            />
            <button
              onClick={handleAddFaq}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Public FAQs</span>
            </button>
          </div>

          {/* List of Existing FAQs */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {settings.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-500">Q{idx + 1}:</span>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:border-sky-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                    title="Delete Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-slate-300 focus:border-sky-500 focus:outline-none resize-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Save All Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div className="text-xs text-slate-400">
          Make sure to click <strong className="text-white">Save All Details</strong> to apply your updates across the live website.
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/pricing"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition"
          >
            ← Plan Prices & Packages
          </Link>
          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md shadow-sky-600/25 flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save All Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};
