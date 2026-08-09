import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Mail, Briefcase, GraduationCap } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalData } from '../../data/personal';
import { experienceData } from '../../data/experience';
import { skillsData } from '../../data/skills';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onShowToast }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    audioSynth.playClick();
    onShowToast('Resume downloading... (Viswaas_Developer_Resume.pdf)');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
        >
          {/* Modal Header */}
          <div className="p-6 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white font-mono">{personalData.name} — Curriculum Vitae</h3>
                <span className="text-xs text-cyan-400 font-mono">Senior Full Stack & Mobile Engineer</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-mono font-medium flex items-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
              <button onClick={onClose} className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-300">
            {/* Header info */}
            <div className="glass-card p-5 rounded-2xl space-y-2">
              <h2 className="text-2xl font-black text-white">{personalData.name}</h2>
              <p className="text-cyan-300 font-mono text-xs">{personalData.titles.join(' • ')}</p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-cyan-400" /> {personalData.email}</span>
                <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-purple-400" /> github.com/viswaas08</span>
                <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-emerald-400" /> linkedin.com/in/viswaas08</span>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                Executive Summary
              </h4>
              <p className="leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                {personalData.bio} Specialized in Clean Architecture for Flutter apps (sub-10ms UI execution), high-throughput MERN cloud platforms, and local privacy-first AI integrations.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                Core Competencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsData.slice(0, 14).map(skill => (
                  <span key={skill.name} className="px-3 py-1 rounded-lg glass-pill text-xs text-slate-200 border-white/10 font-mono">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Work & Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" /> Experience & Education
              </h4>
              {experienceData.map(exp => (
                <div key={exp.id} className="glass-card p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-white">{exp.role} — <span className="text-cyan-300 font-mono text-xs">{exp.organization}</span></h5>
                    <span className="text-xs font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="space-y-1 text-xs">
                    {exp.description.map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
