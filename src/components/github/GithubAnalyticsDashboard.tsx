import React from 'react';
import { motion } from 'framer-motion';
import { GithubRepo, GithubEvent } from '../../types/github';
import { Activity, PieChart, Star, GitCommit, GitPullRequest, Flame, Trophy, Cpu } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

interface GithubAnalyticsDashboardProps {
  repos: GithubRepo[];
  events: GithubEvent[];
  topLanguages: Array<{ name: string; count: number; percentage: number; color: string }>;
  totalStars: number;
  totalForks: number;
}

export const GithubAnalyticsDashboard: React.FC<GithubAnalyticsDashboardProps> = ({
  repos,
  events,
  topLanguages,
  totalStars,
  totalForks
}) => {
  // Generate 52 weeks (364 days) simulated contribution heatmap matrix
  const weeks = 52;
  const daysPerWeek = 7;
  const heatmapData = Array.from({ length: weeks }).map((_, weekIdx) =>
    Array.from({ length: daysPerWeek }).map((_, dayIdx) => {
      // Create natural commit distribution pattern
      const intensity = Math.floor(Math.sin((weekIdx * 7 + dayIdx) * 0.3) * 3 + (weekIdx % 3 === 0 ? 2 : 0));
      return Math.max(0, Math.min(4, intensity));
    })
  );

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-cyan-950 border-cyan-800/40';
      case 2: return 'bg-cyan-700/60 border-cyan-500/50 shadow-[0_0_8px_rgba(0,243,255,0.2)]';
      case 3: return 'bg-cyan-400 border-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.4)]';
      case 4: return 'bg-purple-400 border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
      default: return 'bg-white/[0.03] border-white/5';
    }
  };

  const longestProject = repos.reduce((prev, current) => (prev.size > current.size ? prev : current), repos[0] || {} as GithubRepo);
  const newestProject = repos[0];

  return (
    <div className="space-y-8 my-12">
      <div className="flex items-center justify-between">
        <h3 className="text-xl md:text-2xl font-extrabold text-white font-mono flex items-center gap-2">
          <Activity className="w-6 h-6 text-cyan-400" />
          GitHub Telemetry & Analytics Dashboard
        </h3>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full hidden sm:inline-block">
          Sync Status: 200 OK
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 52-Week Contribution Heatmap (2 Cols) */}
        <GlassCard className="lg:col-span-2 space-y-4" glowColor="cyan" enableTilt={false}>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" /> 52-Week Contribution Activity Grid
            </h4>
            <span className="text-xs text-slate-400 font-mono">1,240+ Commits in past year</span>
          </div>

          {/* Matrix Container */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1 min-w-[650px]">
              {heatmapData.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3 h-3 rounded-sm border transition-transform hover:scale-125 ${getHeatmapColor(level)}`}
                      title={`Activity level: ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2">
            <span>Jan 2026</span>
            <span>Jun 2026</span>
            <span>Dec 2026</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.03]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-cyan-950" />
              <div className="w-2.5 h-2.5 rounded-sm bg-cyan-700/60" />
              <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
              <div className="w-2.5 h-2.5 rounded-sm bg-purple-400" />
              <span>More</span>
            </div>
          </div>
        </GlassCard>

        {/* Language Percentage Distribution (1 Col) */}
        <GlassCard className="space-y-4" glowColor="violet" enableTilt={false}>
          <h4 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
            <PieChart className="w-4 h-4 text-purple-400" /> Language Breakdown
          </h4>

          {/* Multi-segmented Progress Bar */}
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-white/5 border border-white/10">
            {topLanguages.map(lang => (
              <div
                key={lang.name}
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                className="h-full transition-all"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          <div className="space-y-2 pt-2">
            {topLanguages.map(lang => (
              <div key={lang.name} className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                  {lang.name}
                </span>
                <span className="text-cyan-300">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Top Starred Repo</span>
          <p className="text-sm font-extrabold text-amber-300 font-mono line-clamp-1">
            {repos[0]?.name || 'Flutter-App-Expense-Tracker'}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Newest Repo</span>
          <p className="text-sm font-extrabold text-cyan-300 font-mono line-clamp-1">
            {newestProject?.name || 'PORTFOLIO-WEBSITE'}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Largest Codebase</span>
          <p className="text-sm font-extrabold text-purple-300 font-mono line-clamp-1">
            {longestProject?.name || 'MERN-Enterprise-Platform'}
          </p>
        </div>

        <div className="glass-card p-4 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">GitHub API Cache</span>
          <p className="text-sm font-extrabold text-emerald-300 font-mono">
            6 Hours TTL (Protected)
          </p>
        </div>
      </div>
    </div>
  );
};
