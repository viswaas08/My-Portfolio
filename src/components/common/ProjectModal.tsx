import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../types';
import { X, ExternalLink, Zap, Layers, CheckCircle2, Clock, HelpCircle, Lightbulb, AlertTriangle } from 'lucide-react';
import { Github } from './Icons';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 bg-slate-950/80 border-b border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {project.category}
                </span>
                {project.timeline && (
                  <span className="flex items-center gap-1 text-xs font-mono text-purple-300">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> {project.timeline}
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h2>
              <p className="text-slate-300 text-xs md:text-sm">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Case Study Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-300">
            {/* Banner Image */}
            <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            {/* Quick CTAs Bar */}
            <div className="flex items-center justify-between gap-4 p-4 rounded-xl glass-card">
              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs hover:bg-cyan-500/30 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-xs hover:bg-purple-500/30 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> {project.metrics[0]}
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl space-y-2 border-rose-500/30">
                <h4 className="text-xs font-mono text-rose-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <HelpCircle className="w-4 h-4 text-rose-400" /> Problem Statement
                </h4>
                <p className="leading-relaxed">{project.problemSolved}</p>
              </div>

              <div className="glass-card p-4 rounded-2xl space-y-2 border-emerald-500/30">
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Lightbulb className="w-4 h-4 text-emerald-400" /> Technical Solution
                </h4>
                <p className="leading-relaxed">{project.solution || project.description}</p>
              </div>
            </div>

            {/* System Architecture */}
            <div className="glass-card p-5 rounded-2xl space-y-2 border-cyan-500/30">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Layers className="w-4 h-4 text-cyan-400" /> System Architecture & State Pipeline
              </h4>
              <p className="font-mono text-xs text-cyan-200 bg-cyan-950/40 p-3 rounded-xl border border-cyan-500/30">
                {project.architecture}
              </p>
            </div>

            {/* Challenges Faced & Lessons Learned */}
            {project.challengesFaced && project.challengesFaced.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> Engineering Challenges
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {project.challengesFaced.map((c: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-card p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <Zap className="w-4 h-4 text-purple-400" /> Key Lessons Learned
                  </h4>
                  <ul className="space-y-1.5 text-xs">
                    {project.lessonsLearned?.map((l: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                Technologies & Tools Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg glass-pill text-xs text-slate-200 border-white/10 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Project ID: {project.id}</span>
            <button onClick={onClose} className="px-4 py-1.5 rounded-xl glass-pill text-cyan-300">
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
