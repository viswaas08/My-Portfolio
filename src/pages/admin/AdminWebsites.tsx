import React, { useState } from 'react';
import { 
  Globe, 
  Server, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Cpu, 
  GitBranch,
  RefreshCw,
  Zap,
  DollarSign
} from 'lucide-react';
import { ClientRecord } from '../../types/agency';
import { StorageService } from '../../services/storageService';

export const AdminWebsites: React.FC = () => {
  const [clients, setClients] = useState<ClientRecord[]>(StorageService.getClients());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = clients.filter(c => {
    const matchesSearch = 
      c.businessName.toLowerCase().includes(search.toLowerCase()) ||
      c.domain.toLowerCase().includes(search.toLowerCase()) ||
      c.vercelProject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.deploymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInfraCost = clients.reduce((sum, c) => sum + (c.monthlyInfraCost || 0), 0);
  const totalMonthlyMaint = clients.reduce((sum, c) => sum + (c.monthlyMaintenanceAmount || 0), 0);
  const avgInfraPerSite = clients.length > 0 ? Math.round(totalInfraCost / clients.length) : 0;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
            Cloud Infrastructure
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Client Website & Deployment Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tracking Vercel deployments, custom domains, HTTPS SSL, and variable infrastructure costs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
          >
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* Infrastructure Cost Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Total Monthly Infrastructure Cost</span>
          <div className="text-2xl font-black text-rose-400 font-mono">
            ₹{totalInfraCost.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-slate-500">
            Recorded per-client based on serverless functions & bandwidth
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Maintenance Revenue (MRR)</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ₹{totalMonthlyMaint.toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-slate-500">
            Gross monthly recurring maintenance billings
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-semibold">Net Recurring Hosting Margin</span>
          <div className="text-2xl font-black text-white font-mono">
            ₹{(totalMonthlyMaint - totalInfraCost).toLocaleString('en-IN')}
          </div>
          <p className="text-[10px] text-teal-400 font-semibold">
            {totalMonthlyMaint > 0 ? `${Math.round(((totalMonthlyMaint - totalInfraCost) / totalMonthlyMaint) * 100)}% Gross Margin` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search domain, project name, or client..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white pl-9 text-xs focus:outline-none focus:border-sky-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
        >
          <option value="All">All Deployments ({clients.length})</option>
          <option value="Ready">Status: Ready</option>
          <option value="Building">Status: Building</option>
          <option value="Inactive">Status: Inactive / In Dev</option>
        </select>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-sm">{c.businessName}</h3>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {c.domain || 'Domain TBD'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  c.deploymentStatus === 'Ready'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : c.deploymentStatus === 'Building'
                    ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {c.deploymentStatus}
                </span>
              </div>

              {/* Vercel & Technical Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-sky-400" />
                    <span>Vercel Slug:</span>
                  </span>
                  <span className="text-white font-mono">{c.vercelProject || 'Pending'}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SSL Certificate:</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">{c.health.sslActive ? 'Active (Let\'s Encrypt)' : 'Unverified'}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Version:</span>
                  </span>
                  <span className="text-white font-mono">{c.currentVersion}</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Last Deployment:</span>
                  </span>
                  <span className="text-slate-300 font-mono">{c.lastDeploymentDate || 'None'}</span>
                </div>
              </div>

              {/* Financial & Infra footprint */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Monthly Care</span>
                  <strong className="text-emerald-400 font-mono">₹{c.monthlyMaintenanceAmount}/mo</strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Infra Cost</span>
                  <strong className="text-rose-400 font-mono">₹{c.monthlyInfraCost}/mo</strong>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              {c.domain ? (
                <a
                  href={`https://${c.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-slate-500 text-[11px]">Domain not live</span>
              )}

              {c.githubRepo && (
                <a
                  href={c.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
