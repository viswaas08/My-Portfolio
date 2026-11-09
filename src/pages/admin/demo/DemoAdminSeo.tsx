import React, { useState, useEffect } from 'react';
import { Search, Save, CheckCircle2, Globe } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore, SeoConfig } from '../../../services/demoConfigStore';

export const DemoAdminSeo: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [seo, setSeo] = useState<SeoConfig>(store.seo);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setSeo(current.seo);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStore = { ...store, seo };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-sky-400" />
            <span>Search Engine Optimization (SEO)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Control search engine meta titles and descriptions for {store.business.name}
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>SEO Meta Saved!</span>
          </div>
        )}
      </div>

      {/* Google SERP Preview Card */}
      <div className="p-5 rounded-2xl bg-white text-slate-900 shadow-md space-y-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
          Google Search Snippet Preview
        </span>
        <div className="flex items-center gap-1 text-xs text-slate-700">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">https://{store.business.id}-cbe.example.com</span>
        </div>
        <h4 className="font-medium text-base text-blue-800 hover:underline cursor-pointer truncate">
          {seo.metaTitle || `${store.business.name} | Authentic Food & Table Booking`}
        </h4>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {seo.metaDescription || store.business.description}
        </p>
      </div>

      <form onSubmit={handleSave} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Meta Title (Recommended &lt; 60 characters)
          </label>
          <input
            type="text"
            required
            value={seo.metaTitle}
            onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            {seo.metaTitle.length} characters
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Meta Description (Recommended 120–160 characters)
          </label>
          <textarea
            rows={3}
            required
            value={seo.metaDescription}
            onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          />
          <span className="text-[10px] text-slate-500 mt-1 block">
            {seo.metaDescription.length} characters
          </span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Keywords (comma separated)
          </label>
          <input
            type="text"
            value={seo.keywords}
            onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Tags</span>
          </button>
        </div>
      </form>
    </div>
  );
};
