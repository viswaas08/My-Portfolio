import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  Store, 
  Tag, 
  Wand2, 
  X 
} from 'lucide-react';
import { useBrandCustomizer } from '../context/BrandCustomizerContext';

interface BrandCustomizerBarProps {
  businessType: string;
  defaultBrandName: string;
}

const PRESETS_BY_TYPE: Record<string, string[]> = {
  Restaurant: ['Madras Biryani Club', 'Anand Bhavan', 'Spice Route Deluxe', 'Royal Chettinad Kitchen'],
  Cafe: ['Aroma Craft Cafe', 'Bean & Bloom', 'Mocha Corner', 'The Roasted Bean'],
  Bakery: ['Sweet Crumbs Patisserie', 'Golden Oven Bakes', 'Butter & Whisk', 'Velvet Frosting'],
  'Retail Shop': ['Sri Murugan Supermarket', 'Daily Fresh Mart', 'Town Grocers', 'Evergreen Retail'],
  Shop: ['Sri Murugan Supermarket', 'Daily Fresh Mart', 'Town Grocers', 'Evergreen Retail'],
  Salon: ['Aura Unisex Salon', 'Glow & Glamour Lounge', 'Scissors & Style', 'Urban Cut & Spa'],
  Gym: ['IronPulse Fitness Club', 'FitZone Crossfit', 'Spartan Gym 24/7', 'Titan Strength Arena'],
  'Tuition Centre': ['Apex Learning Academy', 'Bright Minds Classes', 'Vidya Coaching Institute', 'Pinnacle Scholars'],
  Tuition: ['Apex Learning Academy', 'Bright Minds Classes', 'Vidya Coaching Institute', 'Pinnacle Scholars'],
  Clinic: ['CareWell Polyclinic', 'Arogya Family Health', 'City Smile Dental', 'LifeLine Medicare'],
};

export const BrandCustomizerBar: React.FC<BrandCustomizerBarProps> = ({
  businessType,
  defaultBrandName,
}) => {
  const { customBrandName, setCustomBrandName, resetCustomBrandName, getBrandName } = useBrandCustomizer();
  const [minimized, setMinimized] = useState(false);
  const presets = PRESETS_BY_TYPE[businessType] || ['Viswaas Enterprise', 'Royal Traders', 'Premier Store'];

  const effectiveName = getBrandName(defaultBrandName);
  const isCustomized = !!customBrandName.trim();

  // If minimized on mobile, show a compact floating pill
  if (minimized) {
    return (
      <aside aria-label="Brand Customizer" className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-sky-500/30 text-white px-3 py-1.5 shadow-md flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-slate-400 text-[11px]">Brand:</span>
          <span className="font-bold text-sky-400 truncate max-w-[160px] sm:max-w-none">{effectiveName}</span>
        </div>
        <button
          onClick={() => setMinimized(false)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-600/80 hover:bg-sky-600 text-white text-[11px] font-semibold transition cursor-pointer shrink-0"
        >
          <Wand2 className="w-3 h-3" />
          <span>Change Name</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Live Demo Customizer" className="sticky top-0 z-40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-sky-500/40 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 space-y-2">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center justify-between sm:justify-start gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                  <span>Live Demo Customizer</span>
                  {isCustomized && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 hidden xs:block">
                  Type your brand name below to see this demo transform instantly!
                </span>
              </div>
            </div>

            {/* Mobile Minimize Toggle */}
            <button
              onClick={() => setMinimized(true)}
              className="sm:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title="Minimize customizer to save mobile screen space"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          {/* Input Box & Reset Button */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <input
                type="text"
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                placeholder={`e.g. ${presets[0]}...`}
                className="w-full px-3 py-1.5 sm:py-2 pl-8 rounded-xl bg-slate-950 border border-sky-500/40 focus:border-sky-400 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none shadow-inner"
              />
              <Store className="w-3.5 h-3.5 text-sky-400 absolute left-2.5 top-2.5 sm:top-3" />
              {isCustomized && (
                <button
                  onClick={resetCustomBrandName}
                  className="absolute right-2.5 top-2 sm:top-2.5 text-slate-400 hover:text-white"
                  title="Clear custom name"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {isCustomized && (
              <button
                onClick={resetCustomBrandName}
                className="px-2.5 py-1.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 border border-slate-700 transition shrink-0 cursor-pointer"
                title="Restore default demo brand name"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            <button
              onClick={() => setMinimized(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition cursor-pointer"
              title="Minimize customizer bar"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Hide</span>
            </button>
          </div>
        </div>

        {/* Quick Industry Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-0.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 whitespace-nowrap shrink-0 flex items-center gap-1 mr-1">
            <Tag className="w-3 h-3 text-sky-400" />
            <span>Try Quick Brand:</span>
          </span>
          {presets.map((preset) => {
            const isSelected = customBrandName === preset;
            return (
              <button
                key={preset}
                onClick={() => setCustomBrandName(preset)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap shrink-0 transition cursor-pointer border ${
                  isSelected
                    ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-xs'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {preset}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
