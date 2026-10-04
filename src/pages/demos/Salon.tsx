import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Check, 
  Heart, 
  Phone, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const SalonDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Hair' | 'Skin' | 'Makeup' | 'Bridal'>('Hair');
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [aptForm, setAptForm] = useState({
    name: '',
    phone: '',
    service: 'Keratin Hair Spa & Treatment',
    date: '',
    timeSlot: '02:00 PM',
  });
  const [booked, setBooked] = useState(false);

  const salonServices = {
    Hair: [
      { name: 'Cysteine / Keratin Smoothing Therapy', price: 3499, duration: '120 mins', desc: 'Formaldehyde-free protein infusion that leaves frizzy hair sleek and glossy for up to 4 months.' },
      { name: 'Advanced Balayage / Global Color & Gloss', price: 2799, duration: '90 mins', desc: 'Custom multidimensional highlights styled to complement your natural skin undertone.' },
      { name: 'Moroccan Argan Deep Conditioning Spa', price: 1299, duration: '45 mins', desc: 'Intense hydration ritual with warm ozone steam and relaxing scalp massage.' },
      { name: 'Designer Layered Haircut & Blowdry', price: 699, duration: '40 mins', desc: 'Precision styling tailored to your face structure by our senior creative stylist.' },
    ],
    Skin: [
      { name: 'Hydra-Infusion Facial & Glow Peeling', price: 2199, duration: '60 mins', desc: 'Non-invasive vortex suction to unclog pores followed by hyaluronic acid infusion.' },
      { name: '24K Gold Luxury Illuminating Facial', price: 2899, duration: '75 mins', desc: 'Pure 24k gold leaf therapy promoting collagen elasticity and radiant glow.' },
      { name: 'Detoxifying Charcoal Back Polish & Pack', price: 1499, duration: '45 mins', desc: 'Exfoliates dead cells and prevents acne marks with natural mineral clays.' },
    ],
    Makeup: [
      { name: 'HD Party Makeup & Hair Styling', price: 2499, duration: '75 mins', desc: 'Camera-ready finish using international brands (MAC, NARS, Huda Beauty).' },
      { name: 'Airbrush Reception Makeup', price: 4999, duration: '90 mins', desc: 'Waterproof, sweat-proof airbrush application with 18-hour stay guarantee.' },
      { name: 'Saree Draping & Traditional Styling', price: 799, duration: '30 mins', desc: 'Expert silk saree pleating and dupatta styling with floral hair accents.' },
    ],
    Bridal: [
      { name: 'Royal Muhurtham Bridal Package', price: 14999, duration: 'Full Day', desc: 'Includes Trial Makeup, HD Bridal Makeup, Saree Draping, Jewelry fixing, and Luxury Lashes.' },
      { name: 'Complete 3-Day Bridal Glow Ritual', price: 21999, duration: '3 Days', desc: 'Full body polishing, pre-bridal facial, Moroccan hair spa, deluxe mani-pedi & reception look.' },
    ],
  };

  const handleAptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hi Glow Studio Salon, I would like to book an appointment:\n- Name: ${aptForm.name}\n- Service: ${aptForm.service}\n- Date: ${aptForm.date || 'Soon'}\n- Time Slot: ${aptForm.timeSlot}\n- Phone: ${aptForm.phone}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#110f13] text-[#f7f3f6] font-sans pb-28">
      {/* Salon Header */}
      <header className="sticky top-0 z-30 bg-[#110f13]/90 backdrop-blur-md border-b border-[#2d2532]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-pink-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white font-serif">
                GLOW STUDIO
              </span>
              <span className="text-[10px] block text-rose-300 font-bold uppercase tracking-widest">
                Luxury Salon & Bridal Lounge
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-wider text-[#b8aab9]">
            <a href="#services" className="hover:text-rose-400 transition">Services</a>
            <a href="#bridal" className="hover:text-rose-400 transition">Bridal</a>
            <a href="#stylists" className="hover:text-rose-400 transition">Our Team</a>
            <a href="#location" className="hover:text-rose-400 transition">Location</a>
          </nav>

          <button
            onClick={() => setAppointmentModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white text-xs font-bold transition shadow-md shadow-rose-500/20 cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#1c1521] to-[#110f13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Premium Hair & Skin Aesthetics
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif text-white leading-tight">
                Reveal Your{' '}
                <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-amber-200 bg-clip-text text-transparent">
                  True Radiance.
                </span>
              </h1>

              <p className="text-[#b8aab9] text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step into an oasis of calm. Our certified senior cosmetologists specialize in organic hair therapies, advanced facials, and couture bridal transformations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setAppointmentModal(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-sm transition shadow-lg shadow-rose-500/25 cursor-pointer"
                >
                  Book Appointment
                </button>
                <a
                  href="#services"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#3b2e40] bg-[#1d1622] hover:bg-[#271e2e] text-white font-bold text-sm transition text-center"
                >
                  View Rate Card
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[#9d8d9f]">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-rose-400 fill-rose-400" />
                  <span className="font-bold text-white">4.9 / 5.0</span>
                  <span>(380+ Clients)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Sanitized Tools & Suites</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-rose-500/20 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80"
                  alt="Glow Studio aesthetic"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110f13] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#1e1723]/90 backdrop-blur-md p-4 rounded-2xl border border-rose-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-rose-300 font-bold uppercase">Bridal Special</span>
                    <h4 className="font-bold text-sm text-white">Muhurtham HD Makeup</h4>
                    <span className="text-xs text-[#b8aab9]">Mac & Huda Beauty range</span>
                  </div>
                  <span className="text-base font-extrabold text-rose-300">₹4,999+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Tabs */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase font-bold text-rose-400 tracking-widest">
            Transparent Pricing Rate Card
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            Salon Services & Therapies
          </h2>

          <div className="flex items-center sm:justify-center gap-2 pt-3 overflow-x-auto no-scrollbar pb-1 px-1 sm:flex-wrap">
            {(['Hair', 'Skin', 'Makeup', 'Bridal'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  activeTab === tab
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-[#1e1823] text-[#b8aab9] hover:bg-[#281f30]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {salonServices[activeTab].map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#1b1520] border border-[#2d2233] flex flex-col justify-between hover:border-rose-500/40 transition group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-white text-base group-hover:text-rose-300 transition">
                    {item.name}
                  </h4>
                  <span className="text-rose-400 font-extrabold text-base shrink-0">
                    ₹{item.price}
                  </span>
                </div>
                <span className="text-[11px] text-[#8e7e90] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {item.duration}
                </span>
                <p className="text-xs text-[#b8aab9] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#2a2030] flex items-center justify-between">
                <button
                  onClick={() => {
                    setAptForm({ ...aptForm, service: item.name });
                    setAppointmentModal(true);
                  }}
                  className="text-xs font-bold text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  Book this service →
                </button>
                <a
                  href={getWhatsAppUrl(`Hi Glow Studio, I want to inquire about: ${item.name} (₹${item.price})`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Appointment Modal */}
      {appointmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-[#19131d] border border-rose-500/30 rounded-3xl p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#2e2334] pb-3">
              <h3 className="font-bold text-lg font-serif">Book Salon Appointment</h3>
              <button
                onClick={() => setAppointmentModal(false)}
                className="text-[#9d8d9f] hover:text-white"
              >
                ✕
              </button>
            </div>

            {booked ? (
              <div className="py-6 text-center space-y-3">
                <span className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </span>
                <h4 className="font-bold text-lg">Appointment Slot Requested!</h4>
                <p className="text-xs text-[#b8aab9]">
                  We will confirm your appointment for <strong>{aptForm.service}</strong> on {aptForm.date} at {aptForm.timeSlot}.
                </p>
                <button
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase"
                >
                  Chat with Stylist on WhatsApp
                </button>
              </div>
            ) : (
              <form onSubmit={handleAptSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#b8aab9] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={aptForm.name}
                    onChange={(e) => setAptForm({ ...aptForm, name: e.target.value })}
                    placeholder="Priya Sundar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#231a28] border border-[#3b2b42] text-base sm:text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#b8aab9] mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    value={aptForm.phone}
                    onChange={(e) => setAptForm({ ...aptForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#231a28] border border-[#3b2b42] text-base sm:text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#b8aab9] mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={aptForm.date}
                      onChange={(e) => setAptForm({ ...aptForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#231a28] border border-[#3b2b42] text-base sm:text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#b8aab9] mb-1">Time Slot</label>
                    <select
                      value={aptForm.timeSlot}
                      onChange={(e) => setAptForm({ ...aptForm, timeSlot: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#231a28] border border-[#3b2b42] text-base sm:text-xs text-white focus:outline-none focus:border-rose-400"
                    >
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:30 PM">02:30 PM</option>
                      <option value="04:30 PM">04:30 PM</option>
                      <option value="06:30 PM">06:30 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <DemoFloatingCTA
        businessName="Glow Studio Salon"
        businessType="Salon"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
