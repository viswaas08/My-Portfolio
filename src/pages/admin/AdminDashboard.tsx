import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Globe, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Download, 
  RotateCcw, 
  Server, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpRight,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  PieChart
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { ClientRecord } from '../../types/agency';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState(StorageService.getMetrics());
  const [clients, setClients] = useState<ClientRecord[]>(StorageService.getClients());
  const [copiedBackup, setCopiedBackup] = useState(false);

  const refreshData = () => {
    setMetrics(StorageService.getMetrics());
    setClients(StorageService.getClients());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleDownloadBackup = () => {
    const json = StorageService.exportBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agency-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 3000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all clients, leads, and metrics back to initial seed data?')) {
      StorageService.resetToDefaults();
      refreshData();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
            Agency Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Executive Business Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time calculations for portfolio clients, recurring MRR, infrastructure costs, and domain renewals.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadBackup}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700"
            title="Download full agency database as JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copiedBackup ? 'Saved!' : 'Export JSON'}</span>
          </button>

          <button
            onClick={handleResetData}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-rose-300 text-xs font-semibold transition flex items-center gap-1.5 border border-slate-700"
            title="Reset database to default seed records"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <Link
            to="/admin/clients"
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-sky-600/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Client</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: MRR */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Monthly Recurring Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              ₹{metrics.mrr.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <span>ARR Estimate:</span>
              <strong className="text-slate-300 font-mono">₹{metrics.arr.toLocaleString('en-IN')}/yr</strong>
            </div>
          </div>
          <div className="text-[11px] text-emerald-500 font-semibold pt-2 border-t border-slate-800">
            {metrics.maintenanceCount} Active Care Subscriptions
          </div>
        </div>

        {/* Metric 2: Net Recurring Margin */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Net Recurring Margin</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{metrics.netRecurringMargin.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <span>Infra Costs:</span>
              <span className="text-rose-400 font-mono">-₹{metrics.estimatedMonthlyInfraCost.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            MRR minus variable hosting costs
          </div>
        </div>

        {/* Metric 3: Total One-Time Project Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">One-Time Project Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{metrics.totalOneTimeRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <span>Pending Handover:</span>
              <strong className="text-amber-400 font-mono">₹{metrics.pendingPayments.toLocaleString('en-IN')}</strong>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            {metrics.totalClients} Total Projects Onboarded
          </div>
        </div>

        {/* Metric 4: Active Websites & Health */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Live Websites</span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
              {metrics.activeWebsites}
            </div>
            <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
              <span>On Vercel Production</span>
            </div>
          </div>
          <div className="text-[11px] text-teal-400 font-semibold pt-2 border-t border-slate-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Client Domain Ownership</span>
          </div>
        </div>
      </div>

      {/* Domain Expiration Alerts Bar (Urgent Operational Warning) */}
      {metrics.domainAlerts.length > 0 && (
        <div className="rounded-2xl bg-amber-950/20 border border-amber-600/40 p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Domain Expiration Alerts ({metrics.domainAlerts.length} upcoming renewals)</span>
            </div>
            <span className="text-[10px] text-amber-300 font-medium">
              Client-owned assets: Notify clients to renew directly.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {metrics.domainAlerts.map((alert) => (
              <div 
                key={alert.clientId}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>{alert.domain}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {alert.registrar}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{alert.businessName}</span>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    alert.daysLeft <= 7 
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {alert.daysLeft} days left
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{alert.expiryDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: Pipeline Breakdown & Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Clients Registry Slice */}
        <div className="lg:col-span-8 rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Client Portfolio Overview</h3>
              <p className="text-xs text-slate-400">Recent client websites, Vercel status & billing details</p>
            </div>
            <Link
              to="/admin/clients"
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({clients.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 bg-slate-950/40">
                <tr>
                  <th className="py-2.5 px-3">Business</th>
                  <th className="py-2.5 px-3">Package</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Maintenance</th>
                  <th className="py-2.5 px-3 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {clients.slice(0, 6).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{c.businessName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.domain}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-300 font-medium">{c.packageName}</span>
                      <div className="text-[10px] text-slate-500 font-mono">₹{c.totalProjectPrice.toLocaleString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.projectStatus === 'MAINTENANCE' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : c.projectStatus === 'DEVELOPMENT'
                          ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {c.projectStatus}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-300 font-medium">{c.maintenancePlanName}</span>
                      {c.monthlyMaintenanceAmount > 0 && (
                        <div className="text-[10px] text-emerald-400 font-mono">
                          ₹{c.monthlyMaintenanceAmount}/mo
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.paymentStatus === 'Fully Paid'
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-amber-400 bg-amber-500/10'
                      }`}>
                        {c.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Lead Pipeline & Quick Metrics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Lead Funnel Card */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Lead Pipeline Funnel</h3>
                <span className="text-[11px] text-slate-400">Total pipeline expected value</span>
              </div>
              <Link to="/admin/leads" className="text-xs text-sky-400 hover:underline">
                Manage
              </Link>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-left">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Pipeline Value</span>
              <div className="text-xl font-black text-emerald-400 font-mono">
                ₹{metrics.leads.pipelineValue.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Conversion Rate: <strong>{metrics.leads.conversionRate}%</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-800/40">
                <span className="text-slate-400">New Inquiries</span>
                <span className="font-bold text-white font-mono">{metrics.leads.new}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-800/40">
                <span className="text-slate-400">In Active Discussion / Meeting</span>
                <span className="font-bold text-sky-400 font-mono">{metrics.leads.negotiations}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-800/40">
                <span className="text-slate-400">Won Projects</span>
                <span className="font-bold text-emerald-400 font-mono">{metrics.leads.won}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-800/40">
                <span className="text-slate-400">Lost</span>
                <span className="font-bold text-slate-500 font-mono">{metrics.leads.lost}</span>
              </div>
            </div>
          </div>

          {/* Quick Onboarding Link Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-sky-900/40 to-slate-900 border border-sky-500/30 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Share With Prospective Client</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Send clients our automated 7-step onboarding wizard. Clients agree to domain ownership, choose their package, and calculate advance payments.
            </p>
            <Link
              to="/onboarding"
              target="_blank"
              className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow"
            >
              <span>Open Onboarding Wizard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
