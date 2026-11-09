import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  IndianRupee, 
  Users, 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  FileCode,
  Sparkles,
  Server,
  Utensils
} from 'lucide-react';
import { StorageService } from '../../services/storageService';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    if (!StorageService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    StorageService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Executive Dashboard', path: '/admin', exact: true, icon: LayoutDashboard },
    { label: 'Plan Prices & Packages', path: '/admin/pricing', icon: IndianRupee, badge: 'EDIT' },
    { label: 'Client Registry', path: '/admin/clients', icon: Users },
    { label: 'Websites & Hosting', path: '/admin/websites', icon: Globe },
    { label: 'Lead Pipeline', path: '/admin/leads', icon: TrendingUp },
    { label: 'SEO & Health Audits', path: '/admin/seo', icon: ShieldCheck },
  ];

  const isCurrentActive = (item: typeof navItems[0]) => {
    if (item.exact) {
      return location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/agency' || location.pathname === '/agency/';
    }
    return location.pathname.startsWith(item.path) || (item.path.startsWith('/admin/') && location.pathname.startsWith(item.path.replace('/admin/', '/agency/')));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-base shadow-sm">
            V
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block leading-none">VISWAA ADMIN</span>
            <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">Plan & Agency Suite</span>
          </div>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle admin navigation menu"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 p-4 md:p-5 transition-all`}
      >
        <div className="space-y-6">
          {/* Logo & Agency Identity */}
          <div className="hidden md:flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-sky-500/20">
              V
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight">VISWAA WEB</h2>
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                Master Business Platform
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 pb-2 block">
              Core Systems
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isCurrentActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 pb-1 block">
              Direct Portals
            </span>
            <Link
              to="/demo-admin"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <span className="flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Business CMS</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>

            <Link
              to="/onboarding"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Client Onboarding Form</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>

            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Public Website</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </div>
        </div>

        {/* Footer / Account / Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-3 mt-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-sky-400 shrink-0">
              VS
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">viswaas08@gmail.com</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Master Admin</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 border border-slate-700/80 hover:border-rose-800 text-slate-300 hover:text-rose-300 text-xs font-semibold transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};
