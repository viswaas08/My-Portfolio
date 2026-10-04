import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  X, 
  Save, 
  MessageSquare, 
  ArrowRight,
  UserCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { LeadRecord, LeadSource, LeadStatus, BusinessType } from '../../types/agency';
import { StorageService } from '../../services/storageService';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>(StorageService.getLeads());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sourceFilter, setSourceFilter] = useState<string>('All');

  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);

  const defaultLead: LeadRecord = {
    id: '',
    name: '',
    businessName: '',
    businessType: 'Restaurant',
    phone: '',
    whatsapp: '',
    email: '',
    source: 'Website',
    interestedPackage: 'Business Website (₹9,999)',
    estimatedValue: 9999,
    status: 'New',
    notes: '',
    dateContacted: new Date().toISOString().split('T')[0],
    followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState<LeadRecord>(defaultLead);

  const refreshLeads = () => {
    setLeads(StorageService.getLeads());
  };

  const handleOpenCreate = () => {
    setFormData({
      ...defaultLead,
      id: `lead-${Date.now()}`
    });
    setModalMode('create');
  };

  const handleOpenEdit = (lead: LeadRecord) => {
    setFormData(lead);
    setModalMode('edit');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveLead(formData);
    refreshLeads();
    setModalMode(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete lead "${name}"?`)) {
      StorageService.deleteLead(id);
      refreshLeads();
    }
  };

  const handleQuickStatusChange = (lead: LeadRecord, newStatus: LeadStatus) => {
    const updated = { ...lead, status: newStatus };
    StorageService.saveLead(updated);
    refreshLeads();
  };

  const filtered = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.businessName.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || l.source === sourceFilter;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const metrics = StorageService.getMetrics().leads;

  const leadSources: LeadSource[] = [
    'Website',
    'WhatsApp',
    'LinkedIn',
    'Fiverr',
    'Upwork',
    'Referral',
    'Local Outreach',
    'Other'
  ];

  const leadStatuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Replied',
    'Meeting',
    'Proposal Sent',
    'Won',
    'Lost'
  ];

  const businessTypes: BusinessType[] = [
    'Restaurant',
    'Cafe',
    'Bakery',
    'Retail Shop',
    'Salon',
    'Gym',
    'Tuition Centre',
    'Clinic',
    'Local Service',
    'Other'
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
            Pipeline Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sales & Lead Conversion System
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track inquiries, sales discussions, proposals, and conversion rates across acquisition channels.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Pipeline Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Leads</span>
          <div className="text-xl font-black text-white font-mono">{metrics.total}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-sky-400 uppercase font-bold block">New Inquiries</span>
          <div className="text-xl font-black text-sky-400 font-mono">{metrics.new}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-amber-400 uppercase font-bold block">Active Discussions</span>
          <div className="text-xl font-black text-amber-400 font-mono">{metrics.negotiations}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block">Won Deals</span>
          <div className="text-xl font-black text-emerald-400 font-mono">{metrics.won}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-teal-400 uppercase font-bold block">Conversion Rate</span>
          <div className="text-xl font-black text-teal-400 font-mono">{metrics.conversionRate}%</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Expected Pipeline</span>
          <div className="text-xl font-black text-white font-mono">₹{metrics.pipelineValue.toLocaleString('en-IN')}</div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contact, business name, phone..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white pl-9 text-xs focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Statuses ({leads.length})</option>
            {leadStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Acquisition Channels</option>
            {leadSources.map(src => (
              <option key={src} value={src}>{src}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">Contact & Business</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Interested Package</th>
                <th className="py-3 px-4">Est. Value</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Follow Up</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No leads match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {lead.businessName} ({lead.businessType})
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {lead.phone} {lead.email && `• ${lead.email}`}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                        {lead.source}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-slate-300 font-medium">{lead.interestedPackage}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-mono text-emerald-400 font-bold">
                        ₹{lead.estimatedValue.toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleQuickStatusChange(lead, e.target.value as LeadStatus)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                          lead.status === 'Won'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : lead.status === 'Lost'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            : lead.status === 'Proposal Sent' || lead.status === 'Meeting'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                        }`}
                      >
                        {leadStatuses.map(s => (
                          <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono text-[11px] text-slate-300">{lead.followUpDate}</div>
                      <span className="text-[10px] text-slate-500">Contacted: {lead.dateContacted}</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getWhatsAppUrl(`Hi ${lead.name}, following up regarding your website inquiry for ${lead.businessName}.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 transition"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleOpenEdit(lead)}
                          className="p-1.5 rounded-lg bg-slate-800 text-sky-400 hover:bg-slate-700 transition"
                          title="Edit Lead"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE & EDIT MODAL */}
      {modalMode && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {modalMode === 'create' ? 'Add New Sales Lead' : `Edit Lead: ${formData.name}`}
              </h3>
              <button onClick={() => setModalMode(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Business Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {businessTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Channel Source</label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value as LeadSource })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {leadSources.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Pipeline Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as LeadStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {leadStatuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Estimated Value (₹)</label>
                  <input
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Follow-Up Date</label>
                  <input
                    type="date"
                    value={formData.followUpDate}
                    onChange={(e) => setFormData({ ...formData, followUpDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Lead Notes & Discussion Log</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Client requirements, objections, demo website shown..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
