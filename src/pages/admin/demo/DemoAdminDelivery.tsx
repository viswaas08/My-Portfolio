import React, { useState, useEffect } from 'react';
import { Truck, Save, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore, DeliveryConfig } from '../../../services/demoConfigStore';

export const DemoAdminDelivery: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [delivery, setDelivery] = useState<DeliveryConfig>(store.delivery);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setDelivery(current.delivery);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStore = { ...store, delivery };
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
            <Truck className="w-6 h-6 text-purple-400" />
            <span>Delivery Zone & Fees</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure delivery coverage radius, fixed fee, or quote-on-order model
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Delivery Settings Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          {/* Master Delivery Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h4 className="font-extrabold text-sm text-white">Enable Home Delivery</h4>
              <p className="text-xs text-slate-400">Offer direct address delivery for local customers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={delivery.enabled}
                onChange={(e) => setDelivery({ ...delivery, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Fixed Delivery Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={delivery.deliveryCharge}
                onChange={(e) => setDelivery({ ...delivery, deliveryCharge: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                If ₹0: The checkout displays <em>"Delivery charges will be confirmed by the restaurant."</em>
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Minimum Order Value (₹)
              </label>
              <input
                type="number"
                min="0"
                value={delivery.minimumOrder}
                onChange={(e) => setDelivery({ ...delivery, minimumOrder: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Orders below this value prompt an alert
              </span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Delivery Coverage Area
              </label>
              <input
                type="text"
                placeholder="e.g. Within 7 km radius of Race Course, Coimbatore"
                value={delivery.deliveryArea}
                onChange={(e) => setDelivery({ ...delivery, deliveryArea: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Delivery Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
