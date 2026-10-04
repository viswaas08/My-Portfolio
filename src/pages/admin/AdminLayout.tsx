import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
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
  Server
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
    { label: 'Executive Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Client Registry', path: '/admin/clients', icon: Users },
    { label: 'Websites & Hosting', path: '/admin/websites', icon: Globe },
    { label: 'Lead Pipeline', path: '/admin/leads', icon: TrendingUp },
    { label: 'SEO & Health Audits', path: '/admin/seo', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center font-black text-white text-base">
            V
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">Agency Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg border border-slate-700 text-slate-300"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between shrink-0 p-4 md:p-5`}
      >
        <div className="space-y-6">
          {/* Logo & Agency Identity */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-md shadow-sky-500/20">
              V
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight">VISWAA WEB</h2>
              <span className="text-[10px] text-sky-400 font-bold uppercase tracking-wider block">
                Business Platform
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
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Shortcuts */}
          <div className="pt-4 border-t border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 pb-1 block">
              Direct Links
            </span>
            <Link
              to="/onboarding"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800/40 transition"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                <span>Public Portfolio Site</span>
              </span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </Link>
          </div>
        </div>

        {/* Footer / Account / Logout */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-sky-400">
              VS
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Viswaas (Owner)</div>
              <div className="text-[10px] text-slate-400">Master Admin</div>
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
