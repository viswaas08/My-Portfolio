import React, { useState, useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Store, 
  UtensilsCrossed, 
  Layers, 
  ShoppingBag, 
  Clock, 
  CalendarDays, 
  Truck, 
  MessageSquare, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  LogOut, 
  Menu, 
  X, 
  ShieldAlert,
  Briefcase
} from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore } from '../../../services/demoConfigStore';

export const DemoAdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const [activeBizId, setActiveBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [currentStore, setCurrentStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(activeBizId));

  // Demo-only auth flag (sessionStorage). NOT production authentication.
  const isAuth = sessionStorage.getItem('demo_admin_auth') === 'true';

  useEffect(() => {
    const handleConfigChange = () => {
      const bizId = DemoConfigStore.getActiveBusinessId();
      setActiveBizId(bizId);
      setCurrentStore(DemoConfigStore.getStore(bizId));
    };
    window.addEventListener('demo_config_changed', handleConfigChange);
    return () => window.removeEventListener('demo_config_changed', handleConfigChange);
  }, []);

  const handleBusinessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    DemoConfigStore.setActiveBusinessId(newId);
    setActiveBizId(newId);
    setCurrentStore(DemoConfigStore.getStore(newId));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('demo_admin_auth');
    navigate('/admin');
  };

  const demoRoute = activeBizId === 'cafe' ? '/demos/cafe' : activeBizId === 'bakery' ? '/demos/bakery' : '/demos/restaurant';

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Business Settings', path: '/admin/business', icon: Store },
    { label: 'Menu Items', path: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Orders Configuration', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Time Slots', path: '/admin/time-slots', icon: Clock },
    { label: 'Opening Hours', path: '/admin/hours', icon: CalendarDays },
    { label: 'Delivery', path: '/admin/delivery', icon: Truck },
    { label: 'WhatsApp', path: '/admin/whatsapp', icon: MessageSquare },
    { label: 'SEO Settings', path: '/admin/seo-settings', icon: Search },
    { label: 'Reset Demo Data', path: '/admin/settings', icon: RotateCcw },
  ];

  if (!isAuth) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      
      {/* Mobile Top Bar */}
      <header className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-200"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-extrabold text-white text-sm">Demo Admin Panel</span>
        </div>

        <Link
          to={demoRoute}
          target="_blank"
          className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Preview</span>
        </Link>
      </header>

      {/* Backdrop for Mobile */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/80 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-0 max-lg:-translate-x-full'
        }`}
      >
        {/* Brand & Business Selector */}
        <div className="p-5 border-b border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-sky-500/20">
                {currentStore.business.logo}
              </div>
              <div>
                <h1 className="font-black text-sm text-white leading-none">DEMO ADMIN</h1>
                <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">Business Management</span>
              </div>
            </div>
            <button 
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active Business Switcher */}
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Active Demo Business:
            </label>
            <select
              value={activeBizId}
              onChange={handleBusinessChange}
              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-hidden focus:border-sky-500 cursor-pointer"
            >
              <option value="restaurant">🍽️ Spice Route (Restaurant)</option>
              <option value="cafe">☕ Brew & Bean (Cafe)</option>
              <option value="bakery">🥐 Sweet Crumbs (Bakery)</option>
            </select>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 pb-1">
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block">External & Tools</span>
          </div>

          <Link
            to={demoRoute}
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-slate-800/60 transition"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-4 h-4 shrink-0" />
              <span>Preview Website</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded-md font-bold">Live</span>
          </Link>

          <Link
            to="/agency/clients"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
          >
            <Briefcase className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Agency Client Roster</span>
          </Link>
        </nav>

        {/* Security Alert & Logout Footer */}
        <div className="p-3 border-t border-slate-800 space-y-2 bg-slate-900/60">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 leading-tight flex items-start gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>Demo authentication active (Portfolio presentation mode).</span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 text-xs font-bold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 overflow-y-auto min-h-screen flex flex-col">
        {/* Top notification bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-3 bg-slate-900/40 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Configuring:</span>
            <span className="font-extrabold text-white">{currentStore.business.name}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-sky-400">
              {currentStore.business.businessType}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={demoRoute}
              target="_blank"
              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Website</span>
            </Link>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
