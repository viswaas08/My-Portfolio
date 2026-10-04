import { ClientRecord, LeadRecord } from '../types/agency';
import { initialClients, initialLeads } from '../config/agencyConfig';

const CLIENTS_STORAGE_KEY = 'viswaa_agency_clients_v1';
const LEADS_STORAGE_KEY = 'viswaa_agency_leads_v1';
const AUTH_STORAGE_KEY = 'viswaa_agency_auth_token_v1';

export class StorageService {
  /**
   * Retrieve all client records
   */
  static getClients(): ClientRecord[] {
    try {
      const data = localStorage.getItem(CLIENTS_STORAGE_KEY);
      if (!data) {
        // Initialize with default seeds
        localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(initialClients));
        return initialClients;
      }
      return JSON.parse(data);
    } catch {
      return initialClients;
    }
  }

  /**
   * Save or update a client record
   */
  static saveClient(client: ClientRecord): ClientRecord[] {
    const clients = this.getClients();
    const index = clients.findIndex(c => c.id === client.id);
    
    // Auto-calculate remaining and pending amounts
    const updatedClient: ClientRecord = {
      ...client,
      remainingAmount: Math.max(0, client.totalProjectPrice - client.advanceAmount),
      amountPending: Math.max(0, client.totalProjectPrice - client.amountPaid)
    };

    if (index >= 0) {
      clients[index] = updatedClient;
    } else {
      clients.unshift(updatedClient);
    }

    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    return clients;
  }

  /**
   * Delete a client record by ID
   */
  static deleteClient(id: string): ClientRecord[] {
    const clients = this.getClients().filter(c => c.id !== id);
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
    return clients;
  }

  /**
   * Retrieve all lead records
   */
  static getLeads(): LeadRecord[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(initialLeads));
        return initialLeads;
      }
      return JSON.parse(data);
    } catch {
      return initialLeads;
    }
  }

  /**
   * Save or update a lead
   */
  static saveLead(lead: LeadRecord): LeadRecord[] {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === lead.id);
    if (index >= 0) {
      leads[index] = lead;
    } else {
      leads.unshift(lead);
    }
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return leads;
  }

  /**
   * Delete a lead by ID
   */
  static deleteLead(id: string): LeadRecord[] {
    const leads = this.getLeads().filter(l => l.id !== id);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return leads;
  }

  /**
   * Calculate real-time business metrics dynamically from client data
   */
  static getMetrics() {
    const clients = this.getClients();
    const leads = this.getLeads();
    const now = new Date();

    const totalClients = clients.length;
    
    const activeWebsites = clients.filter(
      c => c.deploymentStatus === 'Ready' || c.projectStatus === 'MAINTENANCE' || c.projectStatus === 'DEPLOYED'
    ).length;

    const maintenanceClients = clients.filter(
      c => c.maintenancePlanId !== 'none'
    );

    const mrr = maintenanceClients.reduce(
      (sum, c) => sum + (c.monthlyMaintenanceAmount || 0), 0
    );

    const arr = mrr * 12;

    const totalOneTimeRevenue = clients.reduce(
      (sum, c) => sum + (c.amountPaid || 0), 0
    );

    const pendingPayments = clients.reduce(
      (sum, c) => sum + (c.amountPending || 0), 0
    );

    const estimatedMonthlyInfraCost = clients.reduce(
      (sum, c) => sum + (c.monthlyInfraCost || 0), 0
    );

    const netRecurringMargin = Math.max(0, mrr - estimatedMonthlyInfraCost);

    // Domain Renewal alerts: 30, 14, 7, 3 days
    const domainAlerts = clients
      .filter(c => c.domainExpiryDate)
      .map(c => {
        const expiry = new Date(c.domainExpiryDate);
        const diffTime = expiry.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return {
          clientId: c.id,
          clientName: c.clientName,
          businessName: c.businessName,
          domain: c.domain,
          registrar: c.registrar,
          expiryDate: c.domainExpiryDate,
          daysLeft: diffDays,
          severity: 
            diffDays <= 3 ? 'critical' :
            diffDays <= 7 ? 'danger' :
            diffDays <= 14 ? 'warning' :
            diffDays <= 30 ? 'notice' : 'safe'
        };
      })
      .filter(alert => alert.daysLeft <= 30 && alert.daysLeft >= 0)
      .sort((a, b) => a.daysLeft - b.daysLeft);

    // Lead metrics
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const activeNegotiations = leads.filter(
      l => l.status === 'Meeting' || l.status === 'Proposal Sent' || l.status === 'Replied'
    ).length;
    const wonLeads = leads.filter(l => l.status === 'Won').length;
    const lostLeads = leads.filter(l => l.status === 'Lost').length;
    const conversionRate = totalLeads > 0 
      ? Math.round((wonLeads / (wonLeads + lostLeads || totalLeads)) * 100) 
      : 0;
    const pipelineExpectedRevenue = leads
      .filter(l => l.status !== 'Lost')
      .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

    return {
      totalClients,
      activeWebsites,
      maintenanceCount: maintenanceClients.length,
      mrr,
      arr,
      totalOneTimeRevenue,
      pendingPayments,
      estimatedMonthlyInfraCost,
      netRecurringMargin,
      domainAlerts,
      leads: {
        total: totalLeads,
        new: newLeads,
        negotiations: activeNegotiations,
        won: wonLeads,
        lost: lostLeads,
        conversionRate,
        pipelineValue: pipelineExpectedRevenue
      }
    };
  }

  /**
   * Reset data to seed values
   */
  static resetToDefaults() {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(initialClients));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(initialLeads));
  }

  /**
   * Export all agency database data as JSON
   */
  static exportBackup(): string {
    const payload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      clients: this.getClients(),
      leads: this.getLeads()
    };
    return JSON.stringify(payload, null, 2);
  }

  /**
   * Authentication Helpers
   */
  static isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }

  static login(passcode: string): boolean {
    if (passcode === 'admin2026' || passcode === 'viswaas2026') {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
