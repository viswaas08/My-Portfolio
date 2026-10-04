import React, { useState } from 'react';
import { 
  HeartPulse, 
  Stethoscope, 
  Clock, 
  MapPin, 
  Phone, 
  Check, 
  ShieldCheck, 
  Calendar, 
  MessageSquare,
  Users,
  Award
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const ClinicDemo: React.FC = () => {
  const [aptForm, setAptForm] = useState({
    patientName: '',
    phone: '',
    doctor: 'Dr. S. Arvind (General Medicine)',
    date: '',
    slot: 'Evening (05:30 PM - 08:30 PM)',
    notes: '',
  });
  const [booked, setBooked] = useState(false);

  const doctors = [
    {
      name: 'Dr. S. Arvind, MD',
      role: 'Senior Consultant Physician',
      specialty: 'General Medicine & Diabetes Care',
      experience: '16+ Years Experience',
      timings: 'Mon – Sat: 09:30 AM – 01:00 PM & 05:30 PM – 08:30 PM',
      fee: '₹400 Consultation',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Meera Nambiar, DNB (Peds)',
      role: 'Consultant Pediatrician',
      specialty: 'Child Wellness, Newborn Care & Immunization',
      experience: '12+ Years Experience',
      timings: 'Mon – Sat: 10:00 AM – 02:00 PM',
      fee: '₹450 Consultation',
      image: 'https://images.unsplash.com/photo-1594824813627-897fae0078dc?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Karthik Sundaram, MDS',
      role: 'Chief Dental Surgeon',
      specialty: 'Root Canal, Crown & Invisible Aligners',
      experience: '10+ Years Experience',
      timings: 'Mon – Sat: 04:00 PM – 09:00 PM',
      fee: '₹350 Consultation',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const departments = [
    {
      title: 'General & Family Medicine',
      desc: 'Routine health checkups, hypertension management, seasonal flu diagnosis, and preventative wellness counseling.',
    },
    {
      title: 'Pediatrics & Vaccination',
      desc: 'Child growth monitoring, government and optional immunization schedules, neonatal development tracking.',
    },
    {
      title: 'Dental & Oral Health',
      desc: 'Digital X-rays, painless rotary root canals, ultrasonic teeth scaling, and smile correction.',
    },
    {
      title: 'Diagnostic Laboratory & ECG',
      desc: 'In-house blood collection, fasting sugar tests, lipid profiles, and instant computerized ECG test reports.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hello CarePoint Clinic, I would like to request an appointment:\n- Patient: ${aptForm.patientName}\n- Doctor/Dept: ${aptForm.doctor}\n- Date: ${aptForm.date || 'Today/Tomorrow'}\n- Time Slot: ${aptForm.slot}\n- Phone: ${aptForm.phone}\n- Brief Symptom: ${aptForm.notes || 'General consultation'}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-900 font-sans pb-28">
      {/* Clinic Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                CAREPOINT CLINIC
              </span>
              <span className="text-[10px] block text-teal-600 font-bold uppercase tracking-wider">
                Family Health & Multispeciality Centre
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-wider text-slate-600">
            <a href="#departments" className="hover:text-teal-600 transition">Departments</a>
            <a href="#doctors" className="hover:text-teal-600 transition">Doctors</a>
            <a href="#appointment" className="hover:text-teal-600 transition">Book Slot</a>
            <a href="#location" className="hover:text-teal-600 transition">Contact & Timings</a>
          </nav>

          <a
            href="#appointment"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-sm"
          >
            Book Appointment
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-gradient-to-b from-teal-50/70 to-[#f7fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                Trusted Neighbourhood Family Healthcare
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                Caring for Your Family’s Health{' '}
                <span className="text-teal-600">with Compassion.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Consult verified senior medical practitioners in a clean, friendly, and unhurried setting. Same-day appointments available for general ailments, pediatrics, and dental care.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#appointment"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-md text-center"
                >
                  Book Doctor Consultation
                </a>
                <a
                  href="#doctors"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition text-center"
                >
                  View Visiting Doctors
                </a>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Check className="w-4 h-4 text-teal-600" /> Verified Medical Council Registration
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Clock className="w-4 h-4 text-teal-600" /> Pharmacy Attached
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white relative group">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                  alt="CarePoint Clinic facility"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-md flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-teal-700 font-bold uppercase">OPD Timings</span>
                    <h4 className="font-bold text-sm text-slate-900">Morning & Evening Clinics</h4>
                    <span className="text-xs text-slate-500">09:00 AM – 09:00 PM</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    Open Today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs uppercase font-bold text-teal-600 tracking-widest">
            Clinical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Departments & Care Specialities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Comprehensive primary care under one roof for parents, infants, and seniors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-teal-400 transition">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">{dept.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visiting Doctors Roster */}
      <section id="doctors" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-widest">
              Qualified Specialists
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Meet Our Doctors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Experienced clinicians dedicated to accurate diagnosis and transparent care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <div key={idx} className="rounded-2xl bg-[#f7fafc] border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="h-52 overflow-hidden bg-slate-200">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">{doc.experience}</span>
                    <h3 className="font-bold text-base text-slate-900">{doc.name}</h3>
                    <p className="text-xs font-semibold text-slate-600">{doc.role}</p>
                    <p className="text-xs text-slate-500">{doc.specialty}</p>

                    <div className="pt-2 text-[11px] text-slate-600 space-y-1 border-t border-slate-200/80">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span className="font-medium">{doc.timings}</span>
                      </div>
                      <div className="text-teal-700 font-bold">{doc.fee}</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href="#appointment"
                    onClick={() => setAptForm({ ...aptForm, doctor: doc.name })}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1 shadow-sm"
                  >
                    Request Slot
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Request Form */}
      <section id="appointment" className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-teal-600 tracking-wider">
              Quick Scheduling
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Request an Appointment Slot
            </h3>
            <p className="text-xs text-slate-500">
              We will confirm your appointment by SMS and WhatsApp within 30 minutes during clinic hours.
            </p>
          </div>

          {booked ? (
            <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3">
              <span className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </span>
              <h4 className="font-bold text-lg text-slate-900">Appointment Request Received!</h4>
              <p className="text-xs text-slate-600">
                Thank you, <strong>{aptForm.patientName}</strong>. Our front desk will verify slot availability with {aptForm.doctor} for {aptForm.date || 'today'}.
              </p>
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Message Clinic on WhatsApp
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    value={aptForm.patientName}
                    onChange={(e) => setAptForm({ ...aptForm, patientName: e.target.value })}
                    placeholder="e.g. Radhika Iyer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={aptForm.phone}
                    onChange={(e) => setAptForm({ ...aptForm, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Select Doctor</label>
                  <select
                    value={aptForm.doctor}
                    onChange={(e) => setAptForm({ ...aptForm, doctor: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    {doctors.map((d, i) => (
                      <option key={i} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={aptForm.date}
                    onChange={(e) => setAptForm({ ...aptForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Consultation Slot</label>
                  <select
                    value={aptForm.slot}
                    onChange={(e) => setAptForm({ ...aptForm, slot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                  >
                    <option value="Morning (09:30 AM - 01:00 PM)">Morning (09:30 AM - 01:00 PM)</option>
                    <option value="Evening (05:30 PM - 08:30 PM)">Evening (05:30 PM - 08:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Brief Reason / Symptoms (Optional)</label>
                <input
                  type="text"
                  value={aptForm.notes}
                  onChange={(e) => setAptForm({ ...aptForm, notes: e.target.value })}
                  placeholder="e.g. Mild fever since 2 days, general checkup..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base sm:text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Submit Slot Request
              </button>
            </form>
          )}
        </div>
      </section>

      <DemoFloatingCTA
        businessName="CarePoint Clinic"
        businessType="Clinic"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
