import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Briefcase, CheckCircle2, Mail, ExternalLink, Sparkles, User, ShieldCheck, Phone } from 'lucide-react';
import { Github, Linkedin } from '../common/Icons';
import { personalData } from '../../data/personal';
import { skillsData } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { audioSynth } from '../../utils/audioSynthesizer';

interface RecruiterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const RecruiterPanel: React.FC<RecruiterPanelProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    audioSynth.playClick();
    onShowToast('Resume download initiated (Viswaa_S_Resume.pdf)');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg"
        />

        {/* Panel Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white font-mono flex items-center gap-2">
                  Recruiter Executive Panel <Sparkles className="w-4 h-4 text-cyan-400" />
                </h3>
                <span className="text-xs text-cyan-400 font-mono">Candidate Profile: {personalData.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-mono font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer"
              >
                <Download className="w-4 h-4" /> Resume PDF
              </button>
              <button onClick={onClose} className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-300">
            {/* Quick Candidate Snapshot Card */}
            <div className="glass-card p-5 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-xl font-extrabold text-white">{personalData.name}</h4>
                  <p className="text-cyan-300 font-mono text-xs mt-0.5">{personalData.titles.join(' • ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {personalData.availability}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
                <div><span className="text-slate-400 block">Experience</span><strong className="text-white">{personalData.experienceYears}</strong></div>
                <div><span className="text-slate-400 block">Phone</span><strong className="text-white">+91 6382450849</strong></div>
                <div><span className="text-slate-400 block">Primary Stack</span><strong className="text-cyan-300">Flutter / React / MERN / AI</strong></div>
                <div><span className="text-slate-400 block">Location</span><strong className="text-white">{personalData.location}</strong></div>
              </div>
            </div>

            {/* Social Links & Direct Contact Telemetry */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <a
                href={`tel:${personalData.phone}`}
                className="p-3 rounded-xl glass-pill hover:border-cyan-400/40 flex items-center justify-between text-slate-200"
              >
                <span className="flex items-center gap-2 font-mono text-xs">
                  <Phone className="w-4 h-4 text-cyan-400" /> +91 6382450849
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={`mailto:${personalData.email}`}
                className="p-3 rounded-xl glass-pill hover:border-cyan-400/40 flex items-center justify-between text-slate-200"
              >
                <span className="flex items-center gap-2 font-mono text-xs">
                  <Mail className="w-4 h-4 text-emerald-400" /> viswaas08@gmail.com
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-pill hover:border-cyan-400/40 flex items-center justify-between text-slate-200"
              >
                <span className="flex items-center gap-2 font-mono text-xs">
                  <Github className="w-4 h-4 text-purple-400" /> GitHub Profile
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl glass-pill hover:border-cyan-400/40 flex items-center justify-between text-slate-200"
              >
                <span className="flex items-center gap-2 font-mono text-xs">
                  <Linkedin className="w-4 h-4 text-cyan-400" /> LinkedIn Profile
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Top Skills Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Core Technical Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.map(s => (
                  <span
                    key={s.name}
                    className="px-3 py-1 rounded-lg glass-pill text-xs text-slate-200 border-white/10 font-mono flex items-center gap-1.5"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name} ({s.level}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects Overview */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                Flagship Projects
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectsData.slice(0, 2).map(p => (
                  <div key={p.id} className="glass-card p-3.5 rounded-xl space-y-1">
                    <h5 className="font-extrabold text-white text-sm">{p.title}</h5>
                    <p className="text-xs text-slate-300 line-clamp-2">{p.description}</p>
                    <span className="text-[10px] text-cyan-300 font-mono block pt-1">{p.techStack.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Viswaa S • Engineering Evaluation Panel</span>
            <button onClick={onClose} className="px-4 py-1.5 rounded-xl glass-pill text-cyan-300">
              Close Panel
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
