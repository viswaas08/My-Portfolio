import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DemoConfigStore } from '../../../services/demoConfigStore';

export const DemoAdminReset: React.FC = () => {
  const [bizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resetAllConfirm, setResetAllConfirm] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  const handleResetCurrent = () => {
    DemoConfigStore.resetStore(bizId);
    setShowConfirmModal(false);
    setSuccessNotice(`Factory demo data restored for ${bizId === 'cafe' ? 'Brew & Bean' : bizId === 'bakery' ? 'Sweet Crumbs' : 'Spice Route'}.`);
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  const handleResetAll = () => {
    DemoConfigStore.resetAllStores();
    setResetAllConfirm(false);
    setSuccessNotice('All demo business stores (Restaurant, Cafe, Bakery) restored to original presets.');
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="pb-4 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-sky-400" />
          <span>Reset Demo Data</span>
        </h2>
        <p className="text-xs text-slate-400">
          Restore default menus, prices, WhatsApp numbers, and hours for presenting to a new client
        </p>
      </div>

      {successNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successNotice}</span>
        </div>
      )}

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Reset Current Active Business</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
              Reverts all menu items, custom prices, opening hours, delivery charges, and WhatsApp numbers for the currently active demo business back to default factory seed data.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowConfirmModal(true)}
          className="px-5 py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-white">Reset All Demos Simultaneously</h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
              Clears custom edits across Spice Route (Restaurant), Brew & Bean (Cafe), and Sweet Crumbs (Bakery) in one action.
            </p>
          </div>
        </div>

        <button
          onClick={() => setResetAllConfirm(true)}
          className="px-5 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset All Business Demos</span>
        </button>
      </div>

      {/* Confirmation Modal - Single Business */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-white text-base text-center">
              Confirm Demo Reset
            </h3>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
              Reset all business settings, menu items and ordering configuration to the original demo data?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetCurrent}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal - All Demos */}
      {resetAllConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-white text-base text-center">
              Reset All Business Demos
            </h3>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
              This will overwrite configurations for Restaurant, Cafe, and Bakery with fresh out-of-the-box demo settings.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setResetAllConfirm(false)}
                className="w-full py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAll}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition"
              >
                Reset All Demos
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
