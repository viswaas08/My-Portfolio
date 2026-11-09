import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  UtensilsCrossed, 
  MessageSquare, 
  Clock, 
  ShoppingBag, 
  Truck, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sparkles,
  Layers,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore } from '../../../services/demoConfigStore';

export const DemoAdminDashboard: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      setStore(DemoConfigStore.getStore(activeId));
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const todayStr = DemoConfigStore.getIstDateString();
  const { slots, isClosed, reason } = DemoConfigStore.generateTimeSlots(bizId, todayStr);

  const demoRoute = bizId === 'cafe' ? '/demos/cafe' : bizId === 'bakery' ? '/demos/bakery' : '/demos/restaurant';

  const isOrderingActive = store.ordering.takeaway || store.ordering.dining || store.ordering.delivery;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900/40 via-slate-900 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Demo Control Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {store.business.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {store.business.tagline}. Any adjustments to menus, prices, WhatsApp number, or operating hours made here immediately reflect on the live public demo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={demoRoute}
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-sky-600/20 transition cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Preview Website</span>
          </Link>

          <Link
            to={demoRoute}
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
          >
            <span>Open Demo</span>
          </Link>
        </div>
      </div>

      {/* Grid of Key Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Card 1: Business Profile */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Name</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-white block truncate">
              {store.business.name}
            </span>
            <span className="text-xs text-sky-400 font-semibold">
              Category: {store.business.businessType}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Currency & Timezone</span>
            <span className="font-bold text-slate-300">{store.business.currency} • IST</span>
          </div>
        </div>

        {/* Card 2: WhatsApp Number */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">WhatsApp Number</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-lg font-extrabold text-emerald-400 block font-mono">
              {store.business.whatsappNumber}
            </span>
            <span className="text-xs text-slate-400">
              Receives customer orders instantly
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Phone Hotline</span>
            <span className="font-bold text-slate-300">{store.business.phone}</span>
          </div>
        </div>

        {/* Card 3: Ordering Enabled Status */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordering Status</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isOrderingActive ? (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE ORDERING ACTIVE
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-extrabold flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> ORDERING PAUSED
              </span>
            )}
          </div>
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
            Customers generate formatted WhatsApp tickets
          </div>
        </div>

        {/* Card 4: Order Methods Breakdown */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordering Methods</span>
            <span className="text-xs text-sky-400 font-semibold">Toggles</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className={`p-2 rounded-xl border ${store.ordering.takeaway ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
              <span>Takeaway</span>
              <span className="block text-[10px] mt-0.5">{store.ordering.takeaway ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className={`p-2 rounded-xl border ${store.ordering.dining ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
              <span>Dining</span>
              <span className="block text-[10px] mt-0.5">{store.ordering.dining ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className={`p-2 rounded-xl border ${store.ordering.delivery ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
              <span>Delivery</span>
              <span className="block text-[10px] mt-0.5">{store.ordering.delivery ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          <div className="pt-1 text-[11px] text-slate-500">
            Disabled methods are automatically hidden on public website
          </div>
        </div>

        {/* Card 5: Today's Available Slots (IST) */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Available Slots</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-white">
              {slots.length} Slots
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              {isClosed ? (reason || 'Closed Today') : `Interval: ${store.timeSlots.slotInterval} mins (IST)`}
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">First / Last Slot</span>
            <span className="font-bold text-slate-300">
              {slots.length > 0 ? `${slots[0]} → ${slots[slots.length - 1]}` : 'None'}
            </span>
          </div>
        </div>

        {/* Card 6: Total Menu Items & Categories */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Menu Catalog</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-black text-white">
              {store.menu.length} Food Items
            </span>
            <span className="text-xs text-purple-400 font-semibold block mt-0.5">
              {store.categories.length} Categories ({store.menu.filter(m => m.isAvailable).length} Available)
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Popular Dishes</span>
            <span className="font-bold text-amber-400">{store.menu.filter(m => m.isPopular).length} Starred</span>
          </div>
        </div>

      </div>

      {/* Quick Navigation Action Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">
          Fast Configuration Hub
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/menu"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Manage Menu</h4>
              <p className="text-xs text-slate-400">Add dishes, edit prices, toggle availability</p>
            </div>
          </Link>

          <Link
            to="/admin/hours"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                <Clock className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Opening Hours</h4>
              <p className="text-xs text-slate-400">Set lunch/dinner shifts & closed days</p>
            </div>
          </Link>

          <Link
            to="/admin/whatsapp"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                <MessageSquare className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">WhatsApp Order Target</h4>
              <p className="text-xs text-slate-400">Update destination number without code changes</p>
            </div>
          </Link>

          <Link
            to="/admin/delivery"
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                <Truck className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Delivery & Charges</h4>
              <p className="text-xs text-slate-400">Set radius, fee or quote confirmation</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};
