import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Save, 
  Globe, 
  CreditCard,
  Building2,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { ClientRecord, BusinessType, ProjectStatus, PaymentStatus, MaintenancePlanId } from '../../types/agency';
import { StorageService } from '../../services/storageService';
import { agencyPricing, maintenancePlans } from '../../config/agencyConfig';

export const AdminClients: React.FC = () => {
  const [clients, setClients] = useState<ClientRecord[]>(StorageService.getClients());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedMaintenance, setSelectedMaintenance] = useState<string>('All');

  // Modals state
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [activeClient, setActiveClient] = useState<ClientRecord | null>(null);

  // Form State for create/edit
  const defaultClientData: ClientRecord = {
    id: '',
    clientName: '',
    businessName: '',
    businessType: 'Restaurant',
    phone: '',
    whatsapp: '',
    email: '',
    address: 'Coimbatore, Tamil Nadu',
    domain: '',
    registrar: 'GoDaddy',
    domainRegistrationDate: new Date().toISOString().split('T')[0],
    domainExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    domainAutoRenew: false,
    vercelProject: '',
    vercelDeploymentUrl: '',
    githubRepo: '',
    currentVersion: 'v1.0.0',
    deploymentStatus: 'Ready',
    lastDeploymentDate: new Date().toISOString().split('T')[0],
    packageId: 'business',
    packageName: 'Business Website',
    totalProjectPrice: 9999,
    advanceAmount: 4999,
    remainingAmount: 5000,
    amountPaid: 4999,
    amountPending: 5000,
    paymentStatus: 'Advance Paid',
    projectStatus: 'DEVELOPMENT',
    projectStartDate: new Date().toISOString().split('T')[0],
    maintenancePlanId: 'website-care',
    maintenancePlanName: 'Website Care',
    monthlyMaintenanceAmount: 1499,
    maintenancePaymentStatus: 'Current',
    monthlyInfraCost: 250,
    notes: '',
    requirementsSummary: '',
    seo: {
      seoTitle: '',
      metaDescription: '',
      primaryCategory: 'Restaurant',
      targetLocation: 'Coimbatore',
      hasSitemap: true,
      searchConsoleVerified: false,
      googleBusinessProfileLinked: true,
      mobileResponsiveCheck: true,
      robotsTxtCheck: true,
      schemaMarkupCheck: false,
      napConsistencyCheck: true
    },
    health: {
      productionUrl: '',
      httpStatus: 200,
      sslActive: true,
      lastChecked: new Date().toISOString().split('T')[0],
      responseTimeMs: 320,
      uptimePercentage: 99.9
    }
  };

  const [formData, setFormData] = useState<ClientRecord>(defaultClientData);

  const refreshClients = () => {
    setClients(StorageService.getClients());
  };

  const handleOpenCreate = () => {
    setFormData({
      ...defaultClientData,
      id: `client-${Date.now()}`
    });
    setModalMode('create');
  };

  const handleOpenEdit = (client: ClientRecord) => {
    setActiveClient(client);
    setFormData(client);
    setModalMode('edit');
  };

  const handleOpenView = (client: ClientRecord) => {
    setActiveClient(client);
    setModalMode('view');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete client record for "${name}"? This cannot be undone.`)) {
      StorageService.deleteClient(id);
      refreshClients();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveClient(formData);
    refreshClients();
    setModalMode(null);
  };

  // Filter clients
  const filteredClients = clients.filter(c => {
    const matchesSearch = 
      c.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);

    const matchesType = selectedType === 'All' || c.businessType === selectedType;
    const matchesStatus = selectedStatus === 'All' || c.projectStatus === selectedStatus;
    const matchesMaint = selectedMaintenance === 'All' || 
      (selectedMaintenance === 'None' && c.maintenancePlanId === 'none') ||
      (selectedMaintenance !== 'None' && c.maintenancePlanId === selectedMaintenance);

    return matchesSearch && matchesType && matchesStatus && matchesMaint;
  });

  const allStatuses: ProjectStatus[] = [
    'LEAD',
    'CONTACTED',
    'DISCUSSION',
    'QUOTED',
    'ADVANCE PAID',
    'DEVELOPMENT',
    'CLIENT REVIEW',
    'REVISION',
    'DEPLOYED',
    'MAINTENANCE',
    'COMPLETED',
    'INACTIVE'
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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
            Portfolio Database
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Client & Project Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scalable management for 1 to 50+ local business clients with automated billing calculations.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search business, name, domain..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white pl-9 text-xs focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          {/* Business Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Business Types ({clients.length})</option>
            {businessTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Project Statuses</option>
            {allStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Maintenance Filter */}
          <select
            value={selectedMaintenance}
            onChange={(e) => setSelectedMaintenance(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Maintenance Tiers</option>
            <option value="website-care">Website Care (₹1,499/mo)</option>
            <option value="advanced-care">Advanced Care (₹2,999/mo)</option>
            <option value="None">No Maintenance</option>
          </select>
        </div>
      </div>

      {/* Clients Scalable Data Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800 bg-slate-950/60">
              <tr>
                <th className="py-3 px-4">Business & Client</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Project Status</th>
                <th className="py-3 px-4">Package & Price</th>
                <th className="py-3 px-4">Payment Balance</th>
                <th className="py-3 px-4">Maintenance Plan</th>
                <th className="py-3 px-4">Domain Expiry</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500">
                    No clients match the specified filters.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => {
                  return (
                    <tr key={client.id} className="hover:bg-slate-800/40 transition">
                      {/* Business & Client */}
                      <td className="py-3 px-4">
                        <div 
                          onClick={() => handleOpenView(client)}
                          className="font-bold text-white hover:text-sky-400 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{client.businessName}</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {client.clientName} • {client.phone}
                        </div>
                        {client.domain && (
                          <a 
                            href={`https://${client.domain}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] text-sky-400 hover:underline font-mono inline-flex items-center gap-1"
                          >
                            <span>{client.domain}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        )}
                      </td>

                      {/* Business Type */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                          {client.businessType}
                        </span>
                      </td>

                      {/* Status Timeline Badge */}
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          client.projectStatus === 'MAINTENANCE' || client.projectStatus === 'DEPLOYED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : client.projectStatus === 'DEVELOPMENT' || client.projectStatus === 'ADVANCE PAID'
                            ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                            : client.projectStatus === 'CLIENT REVIEW' || client.projectStatus === 'REVISION'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {client.projectStatus}
                        </span>
                      </td>

                      {/* Package & Price */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{client.packageName}</div>
                        <div className="font-mono text-[11px] text-slate-400">
                          ₹{client.totalProjectPrice.toLocaleString('en-IN')}
                        </div>
                      </td>

                      {/* Payment Balance */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            client.paymentStatus === 'Fully Paid'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}>
                            {client.paymentStatus}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Paid: <span className="text-slate-200 font-mono">₹{client.amountPaid}</span> / Due: <span className="text-amber-400 font-mono">₹{client.amountPending}</span>
                        </div>
                      </td>

                      {/* Maintenance Plan */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-200">{client.maintenancePlanName}</div>
                        {client.monthlyMaintenanceAmount > 0 && (
                          <div className="text-[10px] text-emerald-400 font-mono">
                            ₹{client.monthlyMaintenanceAmount}/mo
                          </div>
                        )}
                      </td>

                      {/* Domain Renewal */}
                      <td className="py-3 px-4">
                        <div className="font-mono text-[11px] text-slate-300">{client.domainExpiryDate || 'N/A'}</div>
                        <span className="text-[10px] text-slate-500">{client.registrar || 'Self-hosted'}</span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenView(client)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="View dossier"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 transition"
                            title="Edit client"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(client.id, client.businessName)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 transition"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE & EDIT MODAL */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {modalMode === 'create' ? 'Add New Client Project' : `Edit Client: ${formData.businessName}`}
                </h3>
                <p className="text-xs text-slate-400">
                  Update billing, Vercel deployments, infrastructure tracking, and milestones.
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              {/* Client & Business Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Business Type & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <label className="block text-slate-300 font-bold mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Status and Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Project Status (Timeline)</label>
                  <select
                    value={formData.projectStatus}
                    onChange={(e) => setFormData({ ...formData, projectStatus: e.target.value as ProjectStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    {allStatuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Selected Package</label>
                  <select
                    value={formData.packageId}
                    onChange={(e) => {
                      const pkgId = e.target.value as 'starter' | 'business' | 'pro-web-app' | 'custom';
                      const p = agencyPricing[pkgId];
                      setFormData({ 
                        ...formData, 
                        packageId: pkgId, 
                        packageName: p.name,
                        totalProjectPrice: p.numericPrice,
                        advanceAmount: Math.floor(p.numericPrice / 2),
                        remainingAmount: p.numericPrice - Math.floor(p.numericPrice / 2)
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="starter">Starter (₹4,999)</option>
                    <option value="business">Business (₹9,999 - Most Popular)</option>
                    <option value="pro-web-app">Pro Web App (₹19,999+)</option>
                    <option value="custom">Custom Project</option>
                  </select>
                </div>
              </div>

              {/* Financials: Total, Paid, Pending */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Total Project Price (₹)</label>
                  <input
                    type="number"
                    value={formData.totalProjectPrice}
                    onChange={(e) => {
                      const total = Number(e.target.value);
                      const adv = Math.floor(total / 2);
                      setFormData({ 
                        ...formData, 
                        totalProjectPrice: total,
                        advanceAmount: adv,
                        remainingAmount: total - adv,
                        amountPending: total - formData.amountPaid
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Amount Paid (₹)</label>
                  <input
                    type="number"
                    value={formData.amountPaid}
                    onChange={(e) => {
                      const paid = Number(e.target.value);
                      setFormData({
                        ...formData,
                        amountPaid: paid,
                        amountPending: Math.max(0, formData.totalProjectPrice - paid),
                        paymentStatus: paid >= formData.totalProjectPrice 
                          ? 'Fully Paid' 
                          : paid > 0 
                          ? 'Advance Paid' 
                          : 'Unpaid'
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Payment Status</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Advance Paid">Advance Paid (50%)</option>
                    <option value="Fully Paid">Fully Paid (100%)</option>
                    <option value="Pending Final">Pending Final Handover</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              {/* Maintenance & Infra Cost */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Maintenance Care Plan</label>
                  <select
                    value={formData.maintenancePlanId}
                    onChange={(e) => {
                      const mId = e.target.value as MaintenancePlanId;
                      const plan = maintenancePlans.find(p => p.id === mId);
                      setFormData({
                        ...formData,
                        maintenancePlanId: mId,
                        maintenancePlanName: plan?.name || 'None',
                        monthlyMaintenanceAmount: plan?.numericMonthlyPrice || 0
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  >
                    <option value="none">None (₹0/mo)</option>
                    <option value="website-care">Website Care (₹1,499/mo)</option>
                    <option value="advanced-care">Advanced Care (₹2,999/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Monthly Fee (₹)</label>
                  <input
                    type="number"
                    value={formData.monthlyMaintenanceAmount}
                    onChange={(e) => setFormData({ ...formData, monthlyMaintenanceAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1" title="Recorded per client based on bandwidth/serverless usage">
                    Client Infra Cost (₹/mo)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyInfraCost}
                    onChange={(e) => setFormData({ ...formData, monthlyInfraCost: Number(e.target.value) })}
                    placeholder="e.g. 250"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-400 font-mono"
                  />
                </div>
              </div>

              {/* Domain & Registrar Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Custom Domain</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="spiceroute.in"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Registrar</label>
                  <input
                    type="text"
                    value={formData.registrar}
                    onChange={(e) => setFormData({ ...formData, registrar: e.target.value })}
                    placeholder="GoDaddy / Hostinger"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Domain Expiry Date</label>
                  <input
                    type="date"
                    value={formData.domainExpiryDate}
                    onChange={(e) => setFormData({ ...formData, domainExpiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Vercel & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Vercel Project Slug</label>
                  <input
                    type="text"
                    value={formData.vercelProject}
                    onChange={(e) => setFormData({ ...formData, vercelProject: e.target.value })}
                    placeholder="spice-route-restaurant"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">GitHub Repository</label>
                  <input
                    type="text"
                    value={formData.githubRepo}
                    onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                    placeholder="https://github.com/viswaas08/..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">Internal Notes & Client Requirements</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specific requirements, special features, brand colors..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition flex items-center gap-2 shadow-md shadow-sky-600/20"
                >
                  <Save className="w-4 h-4" />
                  <span>{modalMode === 'create' ? 'Create Client' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW DOSSIER MODAL */}
      {modalMode === 'view' && activeClient && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                  Client Record Dossier
                </span>
                <h3 className="text-xl font-bold text-white">{activeClient.businessName}</h3>
                <p className="text-xs text-slate-400">{activeClient.clientName} • {activeClient.businessType}</p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Dossier sections */}
            <div className="space-y-4 text-xs">
              {/* Financial Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-slate-300 border-b border-slate-800 pb-2">
                  <span>Billing & Handover Financials</span>
                  <span className="text-emerald-400">{activeClient.paymentStatus}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Price</span>
                    <strong className="text-white font-mono">₹{activeClient.totalProjectPrice.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">50% Advance</span>
                    <strong className="text-emerald-400 font-mono">₹{activeClient.advanceAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Paid Amount</span>
                    <strong className="text-white font-mono">₹{activeClient.amountPaid.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Pending Balance</span>
                    <strong className="text-amber-400 font-mono">₹{activeClient.amountPending.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>

              {/* Technical & Hosting */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-bold text-slate-300 border-b border-slate-800 pb-2">
                  Technical Architecture & Cloud Deployment
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Domain (Client Owned)</span>
                    <strong className="text-sky-400 font-mono">{activeClient.domain || 'Not configured'}</strong>
                    <div className="text-[10px] text-slate-500">Registrar: {activeClient.registrar} (Expires: {activeClient.domainExpiryDate})</div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Vercel Project & Deployment</span>
                    <strong className="text-white font-mono">{activeClient.vercelProject || 'None'}</strong>
                    <div className="text-[10px] text-emerald-400">Status: {activeClient.deploymentStatus}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Recurring Care Plan</span>
                    <strong className="text-white">{activeClient.maintenancePlanName}</strong>
                    <div className="text-[10px] text-slate-400 font-mono">₹{activeClient.monthlyMaintenanceAmount}/mo</div>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Estimated Infra Cost</span>
                    <strong className="text-rose-400 font-mono">₹{activeClient.monthlyInfraCost}/mo</strong>
                    <div className="text-[10px] text-slate-500">Recorded per client</div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-slate-300">Contact & Address</div>
                <p className="text-slate-400">Phone: {activeClient.phone} | WhatsApp: {activeClient.whatsapp}</p>
                <p className="text-slate-400">Email: {activeClient.email}</p>
                <p className="text-slate-400">Address: {activeClient.address}</p>
              </div>

              {/* Notes */}
              {activeClient.notes && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-slate-300">Internal Project Notes</div>
                  <p className="text-slate-400 whitespace-pre-wrap">{activeClient.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  setModalMode('edit');
                  setFormData(activeClient);
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
              >
                Edit This Record
              </button>
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
