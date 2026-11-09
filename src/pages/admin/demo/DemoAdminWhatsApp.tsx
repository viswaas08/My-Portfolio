import React, { useState, useEffect } from 'react';
import { MessageSquare, Save, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore } from '../../../services/demoConfigStore';

export const DemoAdminWhatsApp: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [number, setNumber] = useState(store.business.whatsappNumber);
  const [savedNotice, setSavedNotice] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setNumber(current.business.whatsappNumber);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const clean = number.replace(/[^0-9+]/g, '');
    if (clean.length < 10) {
      setValidationError('Please enter a valid phone number with at least 10 digits.');
      return;
    }

    const updatedStore: BusinessDemoStore = {
      ...store,
      business: {
        ...store.business,
        whatsappNumber: clean
      }
    };

    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const testNumberClean = number.replace(/[^0-9]/g, '');
  const testUrl = `https://wa.me/${testNumberClean}?text=${encodeURIComponent(`Test message to ${store.business.name} order hotline.`)}`;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            <span>WhatsApp Order Destination</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure the recipient phone number for all customer orders placed for {store.business.name}
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Target Number Updated!</span>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed flex items-start gap-3">
        <Info className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Zero Code Changes:</strong>
          This is the WhatsApp number that will receive customer order requests. Changing this number automatically redirects all future orders to the new WhatsApp number with zero code changes.
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Restaurant / Business WhatsApp Number
          </label>
          <div className="relative">
            <input
              type="text"
              required
              placeholder="e.g. +91 98430 12345"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setValidationError('');
              }}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 font-mono text-base font-extrabold focus:outline-hidden focus:border-emerald-500"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Include country code (e.g. +91 for India).
          </span>
        </div>

        {validationError && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={testUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-semibold"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test WhatsApp Chat Link</span>
          </a>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save WhatsApp Number</span>
          </button>
        </div>
      </form>
    </div>
  );
};
