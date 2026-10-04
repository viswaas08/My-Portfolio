const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lead contact name is required'],
    trim: true,
  },
  business: {
    type: String,
    required: [true, 'Business name is required'],
    trim: true,
  },
  businessType: {
    type: String,
    required: true,
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
  source: {
    type: String,
    enum: [
      'website',
      'whatsapp',
      'linkedin',
      'fiverr',
      'upwork',
      'referral',
      'local_outreach',
      'other'
    ],
    default: 'website',
  },
  interestedPackage: {
    type: String,
    enum: ['starter', 'business', 'pro', 'custom'],
    default: 'business',
  },
  estimatedValue: {
    type: Number,
    default: 9999,
  },
  status: {
    type: String,
    enum: [
      'new',
      'contacted',
      'replied',
      'meeting',
      'proposal_sent',
      'won',
      'lost'
    ],
    default: 'new',
  },
  notes: {
    type: String,
    default: '',
  },
  dateContacted: {
    type: String,
    default: '',
  },
  followUpDate: {
    type: String,
    default: '',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', LeadSchema);
