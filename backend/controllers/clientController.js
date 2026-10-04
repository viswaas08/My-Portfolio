const Client = require('../models/Client');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Private
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ updatedAt: -1 });
    res.json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single client
// @route   GET /api/clients/:id
// @access  Private
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new client
// @route   POST /api/clients
// @access  Private
exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update client
// @route   PUT /api/clients/:id
// @access  Private
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete client
// @route   DELETE /api/clients/:id
// @access  Private
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, message: 'Client removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get business metrics (dynamically calculated)
// @route   GET /api/clients/metrics
// @access  Private
exports.getMetrics = async (req, res) => {
  try {
    const clients = await Client.find();

    const totalClients = clients.length;
    const activeWebsites = clients.filter(c => c.deploymentStatus === 'live').length;
    const maintenanceClients = clients.filter(c => c.maintenancePlan !== 'none').length;

    // Monthly Recurring Revenue: sum of active maintenance plan monthly charges
    const mrr = clients
      .filter(c => c.maintenancePlan !== 'none')
      .reduce((acc, c) => acc + (Number(c.monthlyMaintenanceAmount) || 0), 0);

    const arr = mrr * 12;

    // One-time project revenue collected
    const oneTimeRevenue = clients.reduce((acc, c) => acc + (Number(c.amountPaid) || 0), 0);

    // Pending payments from advances/balances
    const pendingPayments = clients.reduce((acc, c) => {
      const remaining = Math.max(0, (Number(c.totalProjectPrice) || 0) - (Number(c.amountPaid) || 0));
      return acc + remaining;
    }, 0);

    // Per-client variable infrastructure costs
    const totalInfraCost = clients.reduce((acc, c) => acc + (Number(c.hostingCost) || 0), 0);

    // Net recurring margin: MRR - infrastructure costs
    const netRecurringMargin = Math.max(0, mrr - totalInfraCost);

    // Domain Renewal alerts: 30, 14, 7, 3 days
    const now = new Date();
    const domainAlerts = clients
      .filter(c => Boolean(c.domainRenewalDate))
      .map(c => {
        const renewal = new Date(c.domainRenewalDate);
        const diffDays = Math.ceil((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        let severity = 'normal';
        if (diffDays <= 3) severity = 'danger';
        else if (diffDays <= 7) severity = 'danger';
        else if (diffDays <= 14) severity = 'warning';
        else if (diffDays <= 30) severity = 'info';

        return {
          clientId: c._id,
          clientName: c.name,
          businessName: c.businessName,
          domain: c.domain,
          renewalDate: c.domainRenewalDate,
          daysRemaining: diffDays,
          severity,
        };
      })
      .filter(alert => alert.daysRemaining <= 30)
      .sort((a, b) => a.daysRemaining - b.daysRemaining);

    res.json({
      success: true,
      data: {
        totalClients,
        activeWebsites,
        maintenanceClients,
        mrr,
        arr,
        oneTimeRevenue,
        pendingPayments,
        totalInfraCost,
        netRecurringMargin,
        domainAlerts,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
