import React, { useState } from 'react';
import { 
  Dumbbell, 
  Flame, 
  Zap, 
  Clock, 
  MapPin, 
  Check, 
  Users, 
  Trophy, 
  MessageSquare,
  ShieldCheck,
  Award
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const GymDemo: React.FC = () => {
  const [trialForm, setTrialForm] = useState({
    name: '',
    phone: '',
    goal: 'Fat Loss & Conditioning',
    preferredSlot: 'Morning (6:00 AM - 9:00 AM)',
  });
  const [passClaimed, setPassClaimed] = useState(false);

  const plans = [
    {
      name: 'Monthly Pass',
      price: '₹1,499',
      duration: '1 Month',
      desc: 'Ideal for short-term fitness goals or seasonal workout schedules.',
      features: [
        'Full gym floor & cardio access',
        'Locker room & steam bath',
        '1 Free trainer induction session',
        'Complimentary diet guideline PDF'
      ],
      popular: false,
    },
    {
      name: 'Quarterly Transformation',
      price: '₹3,999',
      duration: '3 Months (Save 12%)',
      desc: 'Our most popular plan for visible fat loss and muscle building.',
      features: [
        'Full gym floor & free weights access',
        'Unlimited steam bath & showers',
        'Bi-weekly body fat InBody analysis',
        'Customized nutrition & macro plan',
        'Access to weekend HIIT bootcamps'
      ],
      popular: true,
    },
    {
      name: 'Annual Champion Pass',
      price: '₹11,999',
      duration: '12 Months (Best Value)',
      desc: 'Complete lifestyle commitment for serious athletes and transformation seekers.',
      features: [
        'All Quarterly benefits included',
        '2 Free Personal Training starter sessions',
        'Free Forge Fitness gym bag & shaker',
        '1 Month membership freeze option',
        'Priority locker allocation'
      ],
      popular: false,
    },
  ];

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassClaimed(true);
  };

  const handleWhatsAppPlan = (planName: string, price: string) => {
    const msg = `Hi Forge Fitness, I am interested in joining the *${planName}* (${price}). Please let me know how to enroll.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d0f11] text-[#f4f4f4] font-sans pb-28">
      {/* Gym Header */}
      <header className="sticky top-0 z-30 bg-[#0d0f11]/90 backdrop-blur-md border-b border-[#25282d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#84cc16] text-[#0d0f11] flex items-center justify-center font-black">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight text-white uppercase italic">
                FORGE FITNESS
              </span>
              <span className="text-[10px] block text-[#84cc16] font-bold uppercase tracking-widest">
                Strength & Performance Club
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-extrabold tracking-wider text-[#a0a5ad]">
            <a href="#plans" className="hover:text-[#84cc16] transition">Plans</a>
            <a href="#programs" className="hover:text-[#84cc16] transition">Programs</a>
            <a href="#trainers" className="hover:text-[#84cc16] transition">Trainers</a>
            <a href="#trial" className="hover:text-[#84cc16] transition">Free Trial</a>
            <a href="#location" className="hover:text-[#84cc16] transition">Location</a>
          </nav>

          <a
            href="#trial"
            className="px-4 py-2 rounded-xl bg-[#84cc16] hover:bg-[#99e620] text-[#0d0f11] text-xs font-black uppercase tracking-wider transition shadow-md shadow-[#84cc16]/20"
          >
            Claim Free Trial
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#161a1e] to-[#0d0f11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#84cc16]/15 border border-[#84cc16]/30 text-[#84cc16] text-xs font-black uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                State-Of-The-Art Strength Arena
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05]">
                Transform Your Body.{' '}
                <span className="text-[#84cc16] italic">
                  Elevate Your Mind.
                </span>
              </h1>

              <p className="text-[#a0a5ad] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                High-voltage workout space with Olympic lifting platforms, imported biomechanics machinery, certified coaches, and an empowering community.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#trial"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#84cc16] hover:bg-[#99e620] text-[#0d0f11] font-black text-xs uppercase tracking-wider transition shadow-lg shadow-[#84cc16]/25 text-center"
                >
                  Get 1-Day Free Trial Pass
                </a>
                <a
                  href="#plans"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-[#2b3038] bg-[#1a1e23] hover:bg-[#232930] text-white font-bold text-xs uppercase tracking-wider transition text-center"
                >
                  View Membership Plans
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#717680] font-bold">
                <span className="flex items-center gap-1.5 text-white">
                  <Award className="w-4 h-4 text-[#84cc16]" /> Certified Coaches
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <Clock className="w-4 h-4 text-[#84cc16]" /> 05:00 AM – 10:30 PM
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-[#84cc16]/40 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
                  alt="Forge Fitness Gym floor"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f11] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#161a1e]/90 backdrop-blur-md p-4 rounded-2xl border border-[#2e343d] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#84cc16] font-black uppercase tracking-wider">
                      Free Pass Available
                    </span>
                    <h4 className="font-black text-sm text-white uppercase">Experience The Energy</h4>
                    <span className="text-xs text-[#a0a5ad]">Includes locker & steam access</span>
                  </div>
                  <span className="text-xs font-black px-3 py-1.5 rounded-lg bg-[#84cc16] text-[#0d0f11]">
                    FREE PASS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs uppercase font-black text-[#84cc16] tracking-widest">
            Simple Transparent Memberships
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase">
            Choose Your Commitment
          </h2>
          <p className="text-xs sm:text-sm text-[#a0a5ad]">
            No hidden maintenance charges or surprise admission fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all ${
                p.popular
                  ? 'bg-[#181d22] border-2 border-[#84cc16] shadow-xl shadow-[#84cc16]/10'
                  : 'bg-[#13161a] border border-[#252a31]'
              }`}
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white uppercase">{p.name}</h3>
                  {p.popular && (
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#84cc16] text-[#0d0f11]">
                      Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white">{p.price}</div>
                  <span className="text-xs text-[#84cc16] font-bold">{p.duration}</span>
                </div>

                <p className="text-xs text-[#a0a5ad]">{p.desc}</p>

                <ul className="space-y-2 pt-2 border-t border-[#252a31]">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#d1d5db]">
                      <Check className="w-3.5 h-3.5 text-[#84cc16] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#252a31]">
                <button
                  onClick={() => handleWhatsAppPlan(p.name, p.price)}
                  className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition cursor-pointer ${
                    p.popular
                      ? 'bg-[#84cc16] hover:bg-[#99e620] text-[#0d0f11]'
                      : 'bg-[#232930] hover:bg-[#2e3640] text-white'
                  }`}
                >
                  Join on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free 1-Day Trial Form */}
      <section id="trial" className="py-16 bg-[#13161a] border-y border-[#252a31]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#1a1e24] border border-[#2e343d] p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase font-black text-[#84cc16] tracking-wider">
                Experience The Difference
              </span>
              <h3 className="text-2xl font-black uppercase text-white">
                Claim Free 1-Day Trial Pass
              </h3>
              <p className="text-xs text-[#a0a5ad]">
                Come workout for free. Test our machines, meet the coaches, and feel the vibe with zero pressure.
              </p>
            </div>

            {passClaimed ? (
              <div className="p-6 rounded-2xl bg-[#84cc16]/10 border border-[#84cc16]/30 text-center space-y-3">
                <span className="w-12 h-12 rounded-full bg-[#84cc16] text-[#0d0f11] flex items-center justify-center mx-auto text-xl font-black">
                  ✓
                </span>
                <h4 className="font-black text-lg text-white uppercase">Trial Pass Activated!</h4>
                <p className="text-xs text-[#a0a5ad]">
                  Your pass for <strong>{trialForm.name}</strong> is valid for the next 48 hours. Just show this confirmation or SMS at our front desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTrialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a0a5ad] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                      placeholder="Karthik Raj"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0f11] border border-[#2e343d] text-base sm:text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a0a5ad] mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={trialForm.phone}
                      onChange={(e) => setTrialForm({ ...trialForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0f11] border border-[#2e343d] text-base sm:text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a0a5ad] mb-1">Primary Fitness Goal</label>
                    <select
                      value={trialForm.goal}
                      onChange={(e) => setTrialForm({ ...trialForm, goal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0f11] border border-[#2e343d] text-base sm:text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    >
                      <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                      <option value="Muscle Building / Hypertrophy">Muscle Building / Hypertrophy</option>
                      <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                      <option value="General Health & Stamina">General Health & Stamina</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#a0a5ad] mb-1">Preferred Workout Slot</label>
                    <select
                      value={trialForm.preferredSlot}
                      onChange={(e) => setTrialForm({ ...trialForm, preferredSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d0f11] border border-[#2e343d] text-base sm:text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    >
                      <option value="Morning (6:00 AM - 9:00 AM)">Morning (6:00 AM - 9:00 AM)</option>
                      <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      <option value="Night (8:00 PM - 10:30 PM)">Night (8:00 PM - 10:30 PM)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#84cc16] hover:bg-[#99e620] text-[#0d0f11] font-black text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Generate Free Day Pass
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <DemoFloatingCTA
        businessName="Forge Fitness Gym"
        businessType="Gym"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
