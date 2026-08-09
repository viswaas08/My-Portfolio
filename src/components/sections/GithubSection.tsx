import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { useGithubData } from '../../hooks/useGithubData';
import { GithubHeroCard } from '../github/GithubHeroCard';
import { GithubAnalyticsDashboard } from '../github/GithubAnalyticsDashboard';
import { GithubRepositoryCard } from '../github/GithubRepositoryCard';
import { GithubRepoModal } from '../github/GithubRepoModal';
import { SkeletonLoader } from '../common/SkeletonLoader';
import { GithubRepo } from '../../types/github';
import { Search, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { Github } from '../common/Icons';
import { audioSynth } from '../../utils/audioSynthesizer';

interface GithubSectionProps {
  onShowToast: (msg: string) => void;
}

const REPO_FILTER_TAGS = [
  'All', 'Flutter', 'React', 'MERN', 'AI', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'Other'
];

export const GithubSection: React.FC<GithubSectionProps> = ({ onShowToast }) => {
  const {
    profile,
    repos,
    events,
    topLanguages,
    totalStars,
    totalForks,
    isLoading,
    isError,
    refetch
  } = useGithubData();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRepoModal, setSelectedRepoModal] = useState<GithubRepo | null>(null);

  // Filter repositories
  const filteredRepos = repos.filter(repo => {
    const matchesFilter = activeFilter === 'All'
      ? true
      : activeFilter === 'Other'
      ? !['Flutter', 'React', 'MERN', 'AI', 'Node.js', 'Python', 'JavaScript', 'TypeScript'].some(f =>
          repo.language?.toLowerCase() === f.toLowerCase() ||
          repo.topics?.some(t => t.toLowerCase() === f.toLowerCase())
        )
      : (repo.language?.toLowerCase() === activeFilter.toLowerCase() ||
         repo.topics?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())) ||
         repo.name.toLowerCase().includes(activeFilter.toLowerCase()));

    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section id="github" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live REST API Telemetry"
          title="GitHub Engineering Hub (@viswaas08)"
          subtitle="Direct REST API integration dynamically fetching real-time repositories, stars, commit telemetry, and language metrics with 6-hour caching."
        />

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="space-y-8">
            <SkeletonLoader count={1} type="profile" />
            <SkeletonLoader count={6} type="card" />
          </div>
        )}

        {/* Error Fallback Notice */}
        {isError && !profile && (
          <div className="glass-panel p-6 rounded-2xl border-rose-500/40 text-center space-y-4 my-8">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <h4 className="text-lg font-extrabold text-white">GitHub API Rate Limit / Network Notice</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Unable to reach GitHub REST API directly. Cached profile data loaded.
            </p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retry Sync
            </button>
          </div>
        )}

        {/* Profile Card & Analytics */}
        {profile && (
          <>
            <GithubHeroCard profile={profile} topLanguages={topLanguages} />

            <GithubAnalyticsDashboard
              repos={repos}
              events={events}
              topLanguages={topLanguages}
              totalStars={totalStars}
              totalForks={totalForks}
            />

            {/* Repositories Search & Filters */}
            <div className="mt-16 mb-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-xl font-extrabold text-white font-mono">
                    Public Repositories ({filteredRepos.length})
                  </h3>
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search viswaas08 repos..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Tag Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {REPO_FILTER_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      audioSynth.playClick();
                      setActiveFilter(tag);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                      activeFilter === tag
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                        : 'glass-pill text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Repositories Grid */}
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredRepos.map(repo => (
                    <motion.div
                      key={repo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <GithubRepositoryCard
                        repo={repo}
                        onOpenDetails={r => {
                          audioSynth.playClick();
                          setSelectedRepoModal(r);
                        }}
                        onShowToast={onShowToast}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="glass-panel p-12 text-center rounded-3xl space-y-3">
                <Github className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-slate-400 font-mono text-sm">
                  No repositories match "{searchQuery || activeFilter}". Try adjusting your search query.
                </p>
              </div>
            )}

            {/* Repository Details Popup Modal */}
            <GithubRepoModal
              repo={selectedRepoModal}
              onClose={() => setSelectedRepoModal(null)}
              onShowToast={onShowToast}
            />
          </>
        )}
      </div>
    </section>
  );
};
