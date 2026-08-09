import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { GlassCard } from '../common/GlassCard';
import { MagneticButton } from '../common/MagneticButton';
import { personalData } from '../../data/personal';
import { Mail, Send, CheckCircle2, MessageSquare, User, AtSign, Phone } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import confetti from 'canvas-confetti';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    audioSynth.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      audioSynth.playSuccess();
      onShowToast('Message transmitted successfully! Viswaa S will reply within 24 hours.');

      // Trigger Confetti Burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Initiate Engineering Collaboration"
          subtitle="Whether you have an enterprise project, open-source opportunity, or full-time position — let's build something extraordinary."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Availability Card */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard glowColor="cyan" className="space-y-4 p-6" enableTilt={false}>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Contact Telemetry
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Direct communications are monitored daily. Average response latency is under 24 hours.
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-slate-200 text-sm transition-all"
                >
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="font-mono text-xs md:text-sm truncate">{personalData.email}</span>
                </a>

                {personalData.phone && (
                  <a
                    href={`tel:${personalData.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-slate-200 text-sm transition-all"
                  >
                    <Phone className="w-5 h-5 text-purple-400 shrink-0" />
                    <span className="font-mono text-xs md:text-sm">+91 {personalData.phone}</span>
                  </a>
                )}

                <a
                  href={personalData.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-slate-200 text-sm transition-all"
                >
                  <Github className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="font-mono text-xs md:text-sm">github.com/viswaas08</span>
                </a>

                <a
                  href={personalData.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-slate-200 text-sm transition-all"
                >
                  <Linkedin className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-xs md:text-sm">linkedin.com/in/viswaa-s-69a49a1ba</span>
                </a>
              </div>
            </GlassCard>

            <div className="glass-panel p-6 rounded-2xl border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Current Status
              </span>
              <p className="text-sm font-semibold text-white">
                {personalData.availability}
              </p>
            </div>
          </div>

          {/* Right Column: Quantum Glass Form */}
          <GlassCard className="lg:col-span-7 p-6 sm:p-8" glowColor="violet" enableTilt={false}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Message Transmitted</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for reaching out! Viswaa S will review your message and reply promptly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 rounded-xl glass-pill text-xs font-mono text-cyan-300 hover:border-cyan-400 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-white tracking-tight mb-4">
                  Send Direct Transmission
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-cyan-400" /> Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                      <AtSign className="w-3.5 h-3.5 text-purple-400" /> Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" /> Subject / Topic
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity / Hello"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, role, or technical inquiry..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full glass-input rounded-xl p-3.5 text-xs text-white focus:outline-none resize-none"
                  />
                </div>

                <MagneticButton
                  variant="primary"
                  className="w-full mt-2 glow-cyan"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
                </MagneticButton>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
