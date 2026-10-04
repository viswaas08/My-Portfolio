import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare,
  Sparkles,
  Check
} from 'lucide-react';
import { DemoFloatingCTA } from '../../components/DemoFloatingCTA';
import { getWhatsAppUrl } from '../../config/siteConfig';

export const TuitionDemo: React.FC = () => {
  const [enquiryForm, setEnquiryForm] = useState({
    parentName: '',
    studentName: '',
    phone: '',
    grade: 'Class 10 (CBSE/State)',
    stream: 'Science & Mathematics',
  });
  const [enquirySent, setEnquirySent] = useState(false);

  const courses = [
    {
      grade: 'Class 8, 9 & 10',
      title: 'Secondary Foundation & Concept Mastery',
      board: 'CBSE / ICSE / State Board',
      subjects: ['Mathematics', 'Science (Phy/Chem/Bio)', 'Social Science', 'English Grammar'],
      batchSize: 'Max 18 students per batch',
      features: ['Weekly concept tests & doubt solving', 'Personalized parent feedback report', 'Chapter-wise revision question banks'],
      popular: false,
    },
    {
      grade: 'Class 11 & 12',
      title: 'Senior Secondary Science & Board Toppers Batch',
      board: 'CBSE & Tamil Nadu State Board',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology / Computer Science'],
      batchSize: 'Max 20 students per batch',
      features: ['NCERT line-by-line depth coverage', 'Previous 10-year board paper drills', 'Formula master sheets & mock exams'],
      popular: true,
    },
    {
      grade: 'Competitive Crash & Long Term',
      title: 'JEE Main & NEET Medical Foundation',
      board: 'Integrated Coaching',
      subjects: ['Advanced Physics', 'Organic/Inorganic Chemistry', 'Calculus/Coordinate Maths', 'Botany/Zoology'],
      batchSize: 'Focused mentoring batch',
      features: ['Daily Practice Problems (DPP)', 'All India benchmark test series', 'OMR speed & time management strategy'],
      popular: false,
    },
  ];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySent(true);
  };

  const handleWhatsAppEnquiry = () => {
    const msg = `Hi BrightPath Academy, I would like to enquire about admission:\n- Parent: ${enquiryForm.parentName}\n- Student: ${enquiryForm.studentName}\n- Grade: ${enquiryForm.grade}\n- Subjects: ${enquiryForm.stream}\n- Phone: ${enquiryForm.phone}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-28">
      {/* Academy Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                BRIGHTPATH ACADEMY
              </span>
              <span className="text-[10px] block text-blue-400 font-semibold uppercase tracking-wider">
                Excellence in Tuition & Board Prep
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase font-bold tracking-wider text-slate-300">
            <a href="#courses" className="hover:text-blue-400 transition">Courses</a>
            <a href="#results" className="hover:text-blue-400 transition">Our Results</a>
            <a href="#faculty" className="hover:text-blue-400 transition">Faculty</a>
            <a href="#enquire" className="hover:text-blue-400 transition">Free Demo Class</a>
          </nav>

          <a
            href="#enquire"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md shadow-blue-600/20"
          >
            Enquire Now
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Admissions Open for Academic Year 2026–27
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Nurturing Academic Excellence from{' '}
                <span className="text-blue-400">Class 8 to 12.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Small batch sizes, veteran faculty with 10+ years experience, and rigorous weekly testing to help students conquer Board Exams, JEE, and NEET with confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#enquire"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-blue-600/25 text-center"
                >
                  Book 2-Day Free Trial Class
                </a>
                <a
                  href="#courses"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition text-center"
                >
                  Explore Course Curriculum
                </a>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 98.4% Pass Rate
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Max 20 Students / Batch
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-blue-500/20 shadow-2xl relative group">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                  alt="BrightPath Academy classroom"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase">Proven Results</span>
                    <h4 className="font-bold text-sm text-white">45+ Students Scored 95%+ in 2025</h4>
                    <span className="text-xs text-slate-400">Class 10 & 12 Board Examinations</span>
                  </div>
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs uppercase font-bold text-blue-400 tracking-widest">
            Structured Learning Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Batches & Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Every batch follows a disciplined schedule with bi-weekly mock tests and parent progress updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((c, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between transition-all ${
                c.popular
                  ? 'bg-slate-800 border-2 border-blue-500 shadow-xl shadow-blue-500/10'
                  : 'bg-slate-800/60 border border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{c.grade}</span>
                  {c.popular && (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
                      High Demand
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-slate-700/60 text-slate-300 font-mono inline-block">
                  {c.board}
                </span>

                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 block">Subjects:</span>
                  <div className="flex flex-wrap gap-1">
                    {c.subjects.map((sub, sIdx) => (
                      <span key={sIdx} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-blue-300">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 pt-3 border-t border-slate-700/60">
                  {c.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700">
                <a
                  href="#enquire"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow"
                >
                  Enquire for {c.grade}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Free Demo Enquiry Form */}
      <section id="enquire" className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
                Experience Before You Enroll
              </span>
              <h3 className="text-2xl font-bold text-white">
                Book a Free 2-Day Trial Class
              </h3>
              <p className="text-xs text-slate-400">
                Sit in on actual classes. Let your child experience the teaching quality firsthand before any fee payment.
              </p>
            </div>

            {enquirySent ? (
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-center space-y-3">
                <span className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </span>
                <h4 className="font-bold text-lg text-white">Trial Seat Reserved!</h4>
                <p className="text-xs text-slate-300">
                  Our academic coordinator will reach out to <strong>{enquiryForm.phone}</strong> with batch timings and classroom location.
                </p>
                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Directly
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Parent's Name</label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.parentName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, parentName: e.target.value })}
                      placeholder="e.g. S. Ramanathan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Student's Name</label>
                    <input
                      type="text"
                      required
                      value={enquiryForm.studentName}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })}
                      placeholder="e.g. Rahul"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={enquiryForm.phone}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Grade / Standard</label>
                    <select
                      value={enquiryForm.grade}
                      onChange={(e) => setEnquiryForm({ ...enquiryForm, grade: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-base sm:text-xs text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10 (CBSE/State)">Class 10 (CBSE/State)</option>
                      <option value="Class 11 Science">Class 11 Science</option>
                      <option value="Class 12 Science">Class 12 Science</option>
                      <option value="JEE / NEET Foundation">JEE / NEET Foundation</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Book 2-Day Trial Class
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <DemoFloatingCTA
        businessName="BrightPath Academy"
        businessType="Tuition Centre"
        recommendedPackage="Business (₹9,999)"
      />
    </div>
  );
};
