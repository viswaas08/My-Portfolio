const Lead = require('../models/Lead');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create lead (public enquiry or admin manual)
// @route   POST /api/leads
// @access  Public / Private
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update lead status / notes / follow-up
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }
    res.json({ success: true, message: 'Lead removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Lead pipeline stats
// @route   GET /api/leads/stats
// @access  Private
exports.getLeadStats = async (req, res) => {
  try {
    const leads = await Lead.find();
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const wonProjects = leads.filter(l => l.status === 'won').length;
    const lostProjects = leads.filter(l => l.status === 'lost').length;
    const activeNegotiations = leads.filter(l => ['contacted', 'replied', 'meeting', 'proposal_sent'].includes(l.status)).length;
    const conversionRate = totalLeads > 0 ? (wonProjects / totalLeads) * 100 : 0;
    const expectedRevenue = leads
      .filter(l => !['won', 'lost'].includes(l.status))
      .reduce((acc, l) => acc + (Number(l.estimatedValue) || 0), 0);

    res.json({
      success: true,
      data: {
        totalLeads,
        newLeads,
        wonProjects,
        lostProjects,
        activeNegotiations,
        conversionRate: Math.round(conversionRate * 10) / 10,
        expectedRevenue,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
