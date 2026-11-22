import React, { useState, useEffect } from 'react';
import { 
  IndianRupee, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  RotateCcw as RevisionIcon, 
  MessageSquare, 
  Eye, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { PricingService } from '../../services/pricingService';
import { PricingTier } from '../../data/pricing';
import { MaintenancePlan } from '../../types/agency';

export const AdminPricing: React.FC = () => {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [maintenancePlans, setMaintenancePlans] = useState<MaintenancePlan[]>([]);
  const [activeTierId, setActiveTierId] = useState<string>('starter');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newFeatureText, setNewFeatureText] = useState('');

  useEffect(() => {
    setTiers(PricingService.getPricingTiers());
    setMaintenancePlans(PricingService.getMaintenancePlans());
  }, []);

  const activeTier = tiers.find(t => t.id === activeTierId) || tiers[0];

  const handleUpdateActiveTier = (updates: Partial<PricingTier>) => {
    if (!activeTier) return;
    const updated = tiers.map(t => t.id === activeTier.id ? { ...t, ...updates } : t);
    setTiers(updated);
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim() || !activeTier) return;
    const updatedFeatures = [...activeTier.features, newFeatureText.trim()];
    handleUpdateActiveTier({ features: updatedFeatures });
    setNewFeatureText('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!activeTier) return;
    const updatedFeatures = activeTier.features.filter((_, i) => i !== index);
    handleUpdateActiveTier({ features: updatedFeatures });
  };

  const handleUpdateFeatureText = (index: number, text: string) => {
    if (!activeTier) return;
    const updatedFeatures = [...activeTier.features];
    updatedFeatures[index] = text;
    handleUpdateActiveTier({ features: updatedFeatures });
  };

  const handleSaveAll = () => {
    PricingService.savePricingTiers(tiers);
    PricingService.saveMaintenancePlans(maintenancePlans);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all plan prices and features back to initial default rates?')) {
      const defaultTiers = PricingService.resetPricingTiers();
      const defaultMaint = PricingService.resetMaintenancePlans();
      setTiers(defaultTiers);
      setMaintenancePlans(defaultMaint);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const handleUpdateMaintenancePlan = (id: string, updates: Partial<MaintenancePlan>) => {
    const updated = maintenancePlans.map(p => p.id === id ? { ...p, ...updates } : p);
    setMaintenancePlans(updated);
  };

  if (!activeTier) {
    return <div className="text-white p-8">Loading pricing configuration...</div>;
  }

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-md border border-sky-500/20">
              Commercial Engine
            </span>
            <span className="text-xs text-slate-400">Viswaas Web</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2.5">
            <IndianRupee className="w-7 h-7 text-emerald-400" />
            <span>Plan Prices & Packages Manager</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Edit and adjust your public agency pricing packages, deliverables, timelines, and WhatsApp inquiry templates. Changes reflect instantly across all visitor pages and onboarding forms.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
            title="Restore original preset prices"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 transition flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Prices</span>
          </button>
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="font-semibold">
            Plan prices and features successfully updated! The public website and client onboarding forms are now using your latest rates.
          </div>
        </div>
      )}

      {/* Plan Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tiers.map((tier) => {
          const isActive = tier.id === activeTierId;
          return (
            <button
              key={tier.id}
              onClick={() => setActiveTierId(tier.id)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border ${
                isActive
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span>{tier.name}</span>
              <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                isActive ? 'bg-sky-700/80 text-white' : 'bg-slate-800 text-emerald-400'
              }`}>
                {tier.price}
              </span>
              {tier.popular && (
                <span className="w-2 h-2 rounded-full bg-amber-400" title="Most Popular Badge" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Editor Grid: Left Form, Right Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Editing: {activeTier.name} Package</span>
                {activeTier.popular && (
                  <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Most Popular
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure rates, deliverables, and selling points for this tier.
              </p>
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-300 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={!!activeTier.popular}
                onChange={(e) => handleUpdateActiveTier({ popular: e.target.checked })}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-700 bg-slate-950"
              />
              <span>Mark as Popular</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Plan Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Plan Title / Name
              </label>
              <input
                type="text"
                value={activeTier.name}
                onChange={(e) => handleUpdateActiveTier({ name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                placeholder="e.g. Business Website"
              />
            </div>

            {/* Pill Badge */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Card Badge</span>
                <span className="text-[10px] text-slate-400">e.g. High Conversion</span>
              </label>
              <input
                type="text"
                value={activeTier.badge || ''}
                onChange={(e) => handleUpdateActiveTier({ badge: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                placeholder="e.g. Fast Launch / High Conversion"
              />
            </div>

            {/* Display Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Display Price Text</span>
                <span className="text-[10px] text-slate-400 font-mono">e.g. ₹4,999 or ₹9,999</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={activeTier.price}
                  onChange={(e) => handleUpdateActiveTier({ price: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                  placeholder="₹9,999"
                />
              </div>
            </div>

            {/* Numeric Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Numeric Price (₹)</span>
                <span className="text-[10px] text-slate-400">For totals & calculations</span>
              </label>
              <input
                type="number"
                value={activeTier.numericPrice || 0}
                onChange={(e) => handleUpdateActiveTier({ numericPrice: Number(e.target.value) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none font-mono"
                placeholder="9999"
              />
            </div>

            {/* Delivery Timeline */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>Delivery Timeframe</span>
              </label>
              <input
                type="text"
                value={activeTier.delivery}
                onChange={(e) => handleUpdateActiveTier({ delivery: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                placeholder="5–7 days"
              />
            </div>

            {/* Revision Rounds */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <RevisionIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Revision Rounds</span>
              </label>
              <input
                type="text"
                value={activeTier.revisions}
                onChange={(e) => handleUpdateActiveTier({ revisions: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
                placeholder="3 rounds"
              />
            </div>

            {/* Associated Demo */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Recommended Demo Shortcut</span>
                <span className="text-[10px] text-slate-400">Links directly to live interactive demo preview</span>
              </label>
              <select
                value={activeTier.recommendedDemoId || ''}
                onChange={(e) => handleUpdateActiveTier({ recommendedDemoId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none cursor-pointer"
              >
                <option value="">None</option>
                <option value="restaurant">Restaurant Demo (/demos/restaurant)</option>
                <option value="cafe">Cafe Demo (/demos/cafe)</option>
                <option value="bakery">Bakery Demo (/demos/bakery)</option>
                <option value="shop">Retail Shop Demo (/demos/shop)</option>
                <option value="salon">Salon Demo (/demos/salon)</option>
                <option value="gym">Gym & Fitness Demo (/demos/gym)</option>
                <option value="tuition">Tuition Academy Demo (/demos/tuition)</option>
                <option value="clinic">Clinic Demo (/demos/clinic)</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Tagline (Headline summary)
            </label>
            <input
              type="text"
              value={activeTier.tagline}
              onChange={(e) => handleUpdateActiveTier({ tagline: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none"
              placeholder="Brief value statement..."
            />
          </div>

          {/* Best For Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Best For (Target client profile)
            </label>
            <textarea
              rows={2}
              value={activeTier.bestFor}
              onChange={(e) => handleUpdateActiveTier({ bestFor: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
              placeholder="e.g. Restaurants, cafes, salons, and growing local brands..."
            />
          </div>

          {/* WhatsApp Message Template */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Click-to-Chat Message</span>
              </span>
              <span className="text-[10px] text-slate-400">Pre-filled when client clicks WhatsApp</span>
            </label>
            <textarea
              rows={2}
              value={activeTier.whatsappMessage}
              onChange={(e) => handleUpdateActiveTier({ whatsappMessage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:outline-none resize-none"
              placeholder="Hi Viswaas, I want to choose the..."
            />
          </div>

          {/* Features List Manager */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Included Features ({activeTier.features.length})
              </label>
              <span className="text-[11px] text-slate-400">Bullet points on pricing card</span>
            </div>

            {/* List of features */}
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {activeTier.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 text-right text-xs font-mono text-slate-500 shrink-0">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleUpdateFeatureText(idx, e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 text-xs sm:text-sm text-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0 cursor-pointer"
                    title="Remove feature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new feature input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Type a new feature bullet and click Add..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Quick save button at bottom of form */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleSaveAll}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Apply & Save {activeTier.name} Rates</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Website Card Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-300">
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Live Public Card Preview</span>
            </span>
            <span className="text-[11px] text-emerald-400">Updates live as you type</span>
          </div>

          {/* Card Mockup */}
          <div className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all border ${
            activeTier.popular
              ? 'bg-slate-900 border-2 border-sky-500 shadow-2xl shadow-sky-500/10'
              : 'bg-slate-900/90 border border-slate-800 shadow-xl'
          }`}>
            {activeTier.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md shadow-sky-500/30 flex items-center gap-1.5 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Most Popular Choice</span>
              </div>
            )}

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-bold text-white">
                  {activeTier.name}
                </h3>
                {activeTier.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                    {activeTier.badge}
                  </span>
                )}
              </div>
                <p className="text-xs text-slate-400 mt-1 min-h-[32px]">
                  {activeTier.tagline}
                </p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {activeTier.price}
                  </span>
                  <span className="text-xs text-slate-400">
                    starting price
                  </span>
                </div>
              </div>

              {/* Best for */}
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                <strong className="text-white">Best for:</strong> {activeTier.bestFor}
              </div>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 border-y border-slate-800 py-3">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{activeTier.delivery}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RevisionIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activeTier.revisions}</span>
                </div>
              </div>

              {/* Features list */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  What's Included:
                </span>
                <ul className="space-y-2">
                  {activeTier.features.map((item, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Simulated CTA Button */}
            <div className="pt-6 mt-6 border-t border-slate-800 space-y-2">
              <div className={`w-full py-3 px-4 rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 ${
                activeTier.popular
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-800 text-white'
              }`}>
                <span>{activeTier.ctaText || `Choose ${activeTier.name}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <div className="w-full text-center py-1 text-xs text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Plans Price Editor Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 shadow-xl mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              <span>Monthly Maintenance & Care Plans</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the recurring monthly retainer pricing displayed on the maintenance section and onboarding choices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenancePlans.map((plan) => (
            <div key={plan.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{plan.name}</span>
                {plan.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Display Price
                  </label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) => handleUpdateMaintenancePlan(plan.id, { price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-sky-500 focus:outline-none"
                    placeholder="₹1,499/mo"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Numeric (₹/mo)
                  </label>
                  <input
                    type="number"
                    value={plan.numericMonthlyPrice || 0}
                    onChange={(e) => handleUpdateMaintenancePlan(plan.id, { numericMonthlyPrice: Number(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:border-sky-500 focus:outline-none"
                    placeholder="1499"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={plan.tagline}
                  onChange={(e) => handleUpdateMaintenancePlan(plan.id, { tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Maintenance Rates</span>
          </button>
        </div>
      </div>
    </div>
  );
};
