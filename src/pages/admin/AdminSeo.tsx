import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckSquare, 
  Square, 
  Globe, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Info,
  Clock,
  Sparkles,
  Save
} from 'lucide-react';
import { ClientRecord } from '../../types/agency';
import { StorageService } from '../../services/storageService';

export const AdminSeo: React.FC = () => {
  const [clients, setClients] = useState<ClientRecord[]>(StorageService.getClients());
  const [selectedClientId, setSelectedClientId] = useState<string>(clients[0]?.id || '');
  const [saveAlert, setSaveAlert] = useState(false);

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const handleToggleCheck = (field: keyof typeof selectedClient.seo) => {
    if (!selectedClient) return;
    const currentVal = selectedClient.seo[field];
    if (typeof currentVal === 'boolean') {
      const updatedSeo = {
        ...selectedClient.seo,
        [field]: !currentVal
      };
      const updatedClient = {
        ...selectedClient,
        seo: updatedSeo
      };
      StorageService.saveClient(updatedClient);
      setClients(StorageService.getClients());
      setSaveAlert(true);
      setTimeout(() => setSaveAlert(false), 2000);
    }
  };

  const handleTextChange = (field: 'seoTitle' | 'metaDescription' | 'targetLocation', value: string) => {
    if (!selectedClient) return;
    const updatedClient = {
      ...selectedClient,
      seo: {
        ...selectedClient.seo,
        [field]: value
      }
    };
    StorageService.saveClient(updatedClient);
    setClients(StorageService.getClients());
  };

  // Calculate score
  const getSeoScore = (client: ClientRecord) => {
    let score = 0;
    if (client.seo.seoTitle) score += 15;
    if (client.seo.metaDescription) score += 15;
    if (client.seo.hasSitemap) score += 15;
    if (client.seo.robotsTxtCheck) score += 10;
    if (client.seo.mobileResponsiveCheck) score += 15;
    if (client.seo.searchConsoleVerified) score += 10;
    if (client.seo.googleBusinessProfileLinked) score += 10;
    if (client.seo.napConsistencyCheck) score += 10;
    return score;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
            Audit & Optimization
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            SEO Audit & Website Health
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store SEO titles, meta descriptions, Google Search Console & Business Profile verification checklists.
          </p>
        </div>

        {saveAlert && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Checklist Auto-Saved!</span>
          </div>
        )}
      </div>

      {/* Ethical SEO Notice */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs leading-relaxed text-slate-300">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Ethical Agency SEO Policy:</strong> We do NOT promise #1 Google rankings, guaranteed traffic, or instant business calls. We provide solid technical foundations (clean semantic tags, fast Core Web Vitals, XML sitemaps, structured data, and local citation consistency) to maximize long-term search performance.
        </div>
      </div>

      {/* Client Selector Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {clients.map((c) => {
          const isSelected = c.id === selectedClient?.id;
          const score = getSeoScore(c);
          return (
            <button
              key={c.id}
              onClick={() => setSelectedClientId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{c.businessName}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                score >= 80 ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/30 text-amber-300'
              }`}>
                {score}%
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Client Audit Workspace */}
      {selectedClient && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Metadata & Live Snippet Preview */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Search Result Mockup */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Google Search Snippet Preview
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5 font-sans">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span className="font-mono">https://{selectedClient.domain || 'yourbusiness.in'}</span>
                </div>
                <h4 className="text-sm font-bold text-sky-400 hover:underline cursor-pointer line-clamp-1">
                  {selectedClient.seo.seoTitle || `${selectedClient.businessName} — Official Website`}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {selectedClient.seo.metaDescription || `Welcome to ${selectedClient.businessName}. Browse our catalog, view services, and order via WhatsApp.`}
                </p>
              </div>
            </div>

            {/* Editable Tags */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4 text-xs">
              <h3 className="font-bold text-white text-sm">On-Page Meta Attributes</h3>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Title Tag (Recommended: 50–60 characters)
                </label>
                <input
                  type="text"
                  value={selectedClient.seo.seoTitle}
                  onChange={(e) => handleTextChange('seoTitle', e.target.value)}
                  placeholder="e.g. Spice Route Restaurant — Authentic Chettinad Dum Biryani"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Length: {selectedClient.seo.seoTitle.length} characters
                </span>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Meta Description (Recommended: 120–160 characters)
                </label>
                <textarea
                  rows={3}
                  value={selectedClient.seo.metaDescription}
                  onChange={(e) => handleTextChange('metaDescription', e.target.value)}
                  placeholder="e.g. Authentic Chettinad dum biryani, crispy dosas, and heritage wood-fired cuisine..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Length: {selectedClient.seo.metaDescription.length} characters
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Target Location</label>
                  <input
                    type="text"
                    value={selectedClient.seo.targetLocation}
                    onChange={(e) => handleTextChange('targetLocation', e.target.value)}
                    placeholder="e.g. RS Puram, Coimbatore"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Primary Category</label>
                  <input
                    type="text"
                    disabled
                    value={selectedClient.businessType}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Checklist & Health Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Checklist */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-white text-sm">SEO & Verification Checklist</h3>
                <span className="text-xs font-mono font-bold text-sky-400">
                  {getSeoScore(selectedClient)}/100
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div 
                  onClick={() => handleToggleCheck('mobileResponsiveCheck')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.mobileResponsiveCheck ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.mobileResponsiveCheck ? 'text-white' : 'text-slate-400'}>
                    Mobile Responsive Design (Touch targets ≥ 44px)
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('hasSitemap')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.hasSitemap ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.hasSitemap ? 'text-white' : 'text-slate-400'}>
                    XML Sitemap Generated & Deployed
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('robotsTxtCheck')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.robotsTxtCheck ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.robotsTxtCheck ? 'text-white' : 'text-slate-400'}>
                    Robots.txt Crawl Permissions Configured
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('schemaMarkupCheck')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.schemaMarkupCheck ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.schemaMarkupCheck ? 'text-white' : 'text-slate-400'}>
                    Schema.org Structured Data (LocalBusiness)
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('searchConsoleVerified')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.searchConsoleVerified ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.searchConsoleVerified ? 'text-white' : 'text-slate-400'}>
                    Google Search Console Verified & Monitored
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('googleBusinessProfileLinked')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.googleBusinessProfileLinked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.googleBusinessProfileLinked ? 'text-white' : 'text-slate-400'}>
                    Google Business Profile Linked with Maps
                  </span>
                </div>

                <div 
                  onClick={() => handleToggleCheck('napConsistencyCheck')}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 cursor-pointer hover:bg-slate-800/40"
                >
                  {selectedClient.seo.napConsistencyCheck ? (
                    <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className={selectedClient.seo.napConsistencyCheck ? 'text-white' : 'text-slate-400'}>
                    NAP Consistency (Name, Address, Phone identical across web)
                  </span>
                </div>
              </div>
            </div>

            {/* Live Health Status Card */}
            <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3 text-xs">
              <h3 className="font-bold text-white text-sm">Site Uptime & HTTP Status</h3>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">HTTP Status Code:</span>
                  <strong className="text-emerald-400 font-mono">
                    {selectedClient.health.httpStatus || 200} OK
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Response Speed:</span>
                  <strong className="text-white font-mono">{selectedClient.health.responseTimeMs || 280} ms</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">30-Day Uptime:</span>
                  <strong className="text-teal-400 font-mono">{selectedClient.health.uptimePercentage || 99.9}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SSL Certificate:</span>
                  <span className="text-emerald-400 font-semibold">{selectedClient.health.sslActive ? 'Active (HTTPS)' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
