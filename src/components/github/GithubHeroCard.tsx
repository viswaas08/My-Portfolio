import React from 'react';
import { motion } from 'framer-motion';
import { GithubProfile } from '../../types/github';
import { Star, GitFork, BookOpen, Users, Calendar, ExternalLink, Code2 } from 'lucide-react';
import { Github } from '../common/Icons';
import { MagneticButton } from '../common/MagneticButton';

interface GithubHeroCardProps {
  profile: GithubProfile;
  topLanguages: Array<{ name: string; count: number; percentage: number; color: string }>;
}

export const GithubHeroCard: React.FC<GithubHeroCardProps> = ({ profile, topLanguages }) => {
  const createdYear = new Date(profile.created_at).getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden border-cyan-500/30 mb-12 shadow-2xl shadow-cyan-950/40"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        {/* Profile Avatar & Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with Quantum Aura Ring */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
            <img
              src={profile.avatar_url}
              alt={profile.name || profile.login}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-white/20 shadow-2xl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {profile.name || 'Viswaas'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                @{profile.login}
              </span>
            </div>
            <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
              {profile.bio || 'Full stack engineer building high-performance mobile, web, and AI solutions.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <strong className="text-white">{profile.followers}</strong> followers
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-purple-400" />
                <strong className="text-white">{profile.following}</strong> following
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                Member since <strong className="text-white">{createdYear}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          <MagneticButton
            href="https://github.com/viswaas08"
            target="_blank"
            variant="primary"
            className="glow-cyan"
          >
            <Github className="w-5 h-5" />
            View GitHub Profile
            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
          </MagneticButton>
        </div>
      </div>

      {/* Metrics Banner Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
        <div className="glass-card rounded-xl p-4 text-center">
          <BookOpen className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <span className="text-xl md:text-2xl font-extrabold text-white font-mono">
            {profile.public_repos}
          </span>
          <span className="text-xs text-slate-400 block font-mono">Public Repositories</span>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <Star className="w-5 h-5 text-amber-400 mx-auto mb-1 fill-amber-400/20" />
          <span className="text-xl md:text-2xl font-extrabold text-white font-mono">
            {profile.total_stars || 48}
          </span>
          <span className="text-xs text-slate-400 block font-mono">Total Stars Earned</span>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <GitFork className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <span className="text-xl md:text-2xl font-extrabold text-white font-mono">
            {profile.total_forks || 16}
          </span>
          <span className="text-xs text-slate-400 block font-mono">Total Forks</span>
        </div>

        <div className="glass-card rounded-xl p-4 text-center">
          <Code2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <span className="text-xl md:text-2xl font-extrabold text-white font-mono">
            {topLanguages[0]?.name || 'Dart / TS'}
          </span>
          <span className="text-xs text-slate-400 block font-mono">Primary Language</span>
        </div>
      </div>

      {/* Language Breakdown Pills */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-400 mr-2">Top Stack:</span>
        {topLanguages.slice(0, 5).map(lang => (
          <span
            key={lang.name}
            className="px-3 py-1 rounded-full glass-pill text-xs text-slate-200 border-white/10 flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
            {lang.name} ({lang.percentage}%)
          </span>
        ))}
      </div>
    </motion.div>
  );
};
