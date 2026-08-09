import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GithubRepo } from '../../types/github';
import { Star, GitFork, ExternalLink, Copy, Check, Share2, Eye, HardDrive } from 'lucide-react';
import { Github } from '../common/Icons';
import { GlassCard } from '../common/GlassCard';
import { LANGUAGE_COLORS } from '../../services/githubService';
import { audioSynth } from '../../utils/audioSynthesizer';

interface GithubRepositoryCardProps {
  repo: GithubRepo;
  onOpenDetails: (repo: GithubRepo) => void;
  onShowToast: (msg: string) => void;
}

export const GithubRepositoryCard: React.FC<GithubRepositoryCardProps> = ({
  repo,
  onOpenDetails,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  const langColor = repo.language ? LANGUAGE_COLORS[repo.language] || '#00F3FF' : '#94A3B8';

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.playClick();
    navigator.clipboard.writeText(repo.html_url);
    setCopied(true);
    onShowToast(`Repository URL copied: ${repo.html_url}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareRepo = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioSynth.playClick();
    if (navigator.share) {
      navigator.share({
        title: repo.name,
        text: repo.description || 'Check out this repository by Viswaas',
        url: repo.html_url
      }).catch(() => {});
    } else {
      copyUrl(e);
    }
  };

  const formattedSize = repo.size > 1024 ? `${(repo.size / 1024).toFixed(1)} MB` : `${repo.size} KB`;
  const lastUpdatedStr = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <GlassCard
      glowColor="cyan"
      onClick={() => onOpenDetails(repo)}
      className="flex flex-col justify-between h-full group"
    >
      <div>
        {/* Header: Title & Language Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-cyan-400 shrink-0" />
            <h3 className="text-lg font-extrabold text-white font-mono tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
              {repo.name}
            </h3>
          </div>
          {repo.language && (
            <span
              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border border-white/10 shrink-0 flex items-center gap-1.5"
              style={{ backgroundColor: `${langColor}15`, color: langColor, borderColor: `${langColor}40` }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: langColor }} />
              {repo.language}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-xs md:text-sm line-clamp-3 mb-4 leading-relaxed">
          {repo.description || 'No description provided for this repository.'}
        </p>

        {/* Topic Badges */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic: string) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded-md glass-pill text-[10px] font-mono text-slate-300 border-white/10"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Statistics & Meta info */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 py-3 border-t border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-300/30" /> {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <GitFork className="w-3.5 h-3.5" /> {repo.forks_count}
            </span>
            <span className="flex items-center gap-1 text-slate-400 hidden sm:flex">
              <HardDrive className="w-3.5 h-3.5" /> {formattedSize}
            </span>
          </div>
          <span className="text-[10px] text-slate-500">Updated {lastUpdatedStr}</span>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400" /> Repo
            </a>

            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={copyUrl}
              className="p-2 rounded-lg glass-pill text-slate-400 hover:text-cyan-300"
              title="Copy Repository Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={shareRepo}
              className="p-2 rounded-lg glass-pill text-slate-400 hover:text-purple-300"
              title="Share Repository"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onOpenDetails(repo);
              }}
              className="p-2 rounded-lg glass-pill text-cyan-400 hover:text-white"
              title="View Full README Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
