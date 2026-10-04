const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Client representative name is required'],
    trim: true,
  },
  businessName: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
    enum: [
      'restaurant',
      'cafe',
      'bakery',
      'retail',
      'salon',
      'gym',
      'tuition',
      'clinic',
      'other'
    ],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  whatsapp: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    default: '',
  },
  domain: {
    type: String,
    default: '',
    trim: true,
  },
  vercelProject: {
    type: String,
    default: '',
    trim: true,
  },
  githubRepo: {
    type: String,
    default: '',
    trim: true,
  },
  package: {
    type: String,
    enum: ['starter', 'business', 'pro', 'custom'],
    default: 'business',
  },
  projectStatus: {
    type: String,
    enum: [
      'lead',
      'contacted',
      'discussion',
      'quoted',
      'advance_paid',
      'development',
      'client_review',
      'revision',
      'deployed',
      'maintenance',
      'completed'
    ],
    default: 'lead',
  },
  deploymentStatus: {
    type: String,
    enum: ['live', 'building', 'pending', 'error', 'inactive'],
    default: 'pending',
  },
  maintenancePlan: {
    type: String,
    enum: ['none', 'care', 'advanced'],
    default: 'care',
  },
  maintenanceStartDate: {
    type: String,
    default: '',
  },
  nextBillingDate: {
    type: String,
    default: '',
  },
  monthlyMaintenanceAmount: {
    type: Number,
    default: 1499,
  },
  domainRenewalDate: {
    type: String,
    default: '',
  },
  hostingCost: {
    type: Number,
    default: 0,
    comment: 'Actual recorded infrastructure cost per client'
  },
  notes: {
    type: String,
    default: '',
  },
  documents: [{
    title: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  projectRequirements: {
    type: String,
    default: '',
  },
  totalProjectPrice: {
    type: Number,
    default: 9999,
  },
  advanceAmount: {
    type: Number,
    default: 4999,
  },
  amountPaid: {
    type: Number,
    default: 0,
  },
  maintenanceStatus: {
    type: String,
    enum: ['paid', 'pending', 'overdue', 'cancelled'],
    default: 'pending',
  },
  lastMaintenanceActivity: {
    type: String,
    default: '',
  },
  sslStatus: {
    type: String,
    enum: ['active', 'expiring', 'missing'],
    default: 'active',
  },
  httpStatus: {
    type: Number,
    default: 200,
  },
  lastDeploymentDate: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);
