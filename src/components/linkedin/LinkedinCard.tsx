import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../common/GlassCard';
import { MagneticButton } from '../common/MagneticButton';
import { Linkedin } from '../common/Icons';
import { ExternalLink, CheckCircle2, UserPlus, Briefcase, Award } from 'lucide-react';
import { personalData } from '../../data/personal';

export const LinkedinCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-12"
    >
      <GlassCard
        glowColor="cyan"
        className="p-6 md:p-8 relative overflow-hidden border-cyan-500/40 bg-gradient-to-br from-slate-950/80 via-slate-900/60 to-cyan-950/30"
        enableTilt={false}
      >
        {/* Ambient radial glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* LinkedIn Avatar Badge */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-2xl">
                <Linkedin className="w-8 h-8" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                  {personalData.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  LinkedIn Verified
                </span>
              </div>
              <p className="text-cyan-300 font-mono text-xs md:text-sm">
                Senior Staff Developer • Flutter, React, MERN & AI Systems
              </p>
              <p className="text-slate-300 text-xs md:text-sm max-w-xl leading-relaxed">
                Connect on LinkedIn for technical discussions, engineering advisory, enterprise consulting, and full-time hiring opportunities.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <MagneticButton
              href={personalData.linkedinUrl}
              target="_blank"
              variant="primary"
              className="glow-cyan"
            >
              <UserPlus className="w-4 h-4" />
              Connect on LinkedIn
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </MagneticButton>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Open for Staff / Lead Roles</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
            <span>3+ Years Production Mobile & Web</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Top National Hackathon Winner</span>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};
