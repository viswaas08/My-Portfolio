import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { ExternalLink, Search, Zap, CheckCircle, ArrowRight, Star, GitFork, Sparkles, RefreshCw } from 'lucide-react';
import { Github } from '../common/Icons';
import { useGithubData } from '../../hooks/useGithubData';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES = ['All', 'Flutter', 'React', 'TypeScript', 'Python', 'Full Stack'];

const PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80"
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { repos, isLoading, isError, refetch } = useGithubData();

  // Convert live GitHub repos into ProjectItem structures
  const githubProjects: ProjectItem[] = repos.map((repo, index) => {
    const isFlutter = repo.name.toLowerCase().includes('flutter') || repo.language === 'Dart';
    const isReact = repo.name.toLowerCase().includes('react') || repo.name.toLowerCase().includes('portfolio') || repo.language === 'TypeScript' || repo.language === 'JavaScript';
    const isPython = repo.language === 'Python';

    const category: 'Flutter' | 'React' | 'MERN' | 'AI' | 'Full Stack' | 'Open Source' = isFlutter
      ? 'Flutter'
      : isReact
      ? 'React'
      : isPython
      ? 'AI'
      : 'Full Stack';

    const existingMatch = projectsData.find(p => p.id === repo.name || p.githubUrl.endsWith(repo.name));
    const repoTopics = repo.topics || [];

    return {
      id: repo.name,
      title: repo.name.replace(/-/g, ' '),
      tagline: repo.description || `Public GitHub repository ${repo.full_name}`,
      description: repo.description || `Open source project hosted on GitHub @viswaas08. Language: ${repo.language || 'Software'}`,
      problemSolved: existingMatch?.problemSolved || `Architected public repository ${repo.name} with clean code and version control.`,
      solution: existingMatch?.solution || repo.description || 'Public GitHub open-source code codebase.',
      architecture: existingMatch?.architecture || `GitHub Repository • Primary Language: ${repo.language || 'Multi-language'} • Default Branch: ${repo.default_branch}`,
      features: existingMatch?.features || (repoTopics.length > 0 ? repoTopics : [repo.language || 'Git', 'Open Source', 'GitHub API']),
      metrics: existingMatch?.metrics || [
        `${repo.stargazers_count} GitHub Stars`,
        `${repo.forks_count} Forks`,
        `Last Updated: ${new Date(repo.updated_at).toLocaleDateString()}`
      ],
      challengesFaced: existingMatch?.challengesFaced,
      lessonsLearned: existingMatch?.lessonsLearned,
      timeline: existingMatch?.timeline || `Created ${new Date(repo.created_at).getFullYear()}`,
      screenshots: existingMatch?.screenshots,
      category,
      techStack: repoTopics.length > 0 ? repoTopics : [repo.language || 'Codebase', 'Git', 'GitHub'],
      githubUrl: repo.html_url,
      liveDemoUrl: repo.homepage || repo.html_url,
      image: existingMatch?.image || PROJECT_IMAGES[index % PROJECT_IMAGES.length],
      featured: true,
      stars: repo.stargazers_count,
      forks: repo.forks_count
    };
  });

  // Combine live GitHub repos with custom curated projects (filtering duplicates)
  const combinedProjects = [...githubProjects];
  projectsData.forEach(p => {
    if (!combinedProjects.some(gp => gp.id === p.id || gp.title.toLowerCase() === p.title.toLowerCase())) {
      combinedProjects.push(p);
    }
  });

  const filteredProjects = combinedProjects.filter(project => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category === selectedCategory ||
      (selectedCategory === 'TypeScript' && project.techStack.some(t => t.toLowerCase() === 'typescript' || t.toLowerCase() === 'ts')) ||
      (selectedCategory === 'Python' && project.techStack.some(t => t.toLowerCase() === 'python'));

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Live GitHub API Ingestion"
          title="GitHub Repositories & Engineering Case Studies"
          subtitle="Explore public software repositories dynamically scraped from GitHub (@viswaas08) with live stars, forks, and code architecture details."
        />

        {/* Live GitHub Sync Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border-cyan-500/30 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                GitHub REST API Live Stream Active <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                Scraping account: @viswaas08 • Auto-detects newly created public repositories
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick();
              refetch();
            }}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Scraping Repos...' : 'Refetch GitHub Repos'}
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  audioSynth.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                    : 'glass-pill text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack or title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full glass-input rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard
                  glowColor="cyan"
                  onClick={() => onSelectProject(project)}
                  className="flex flex-col justify-between h-full group"
                >
                  <div className="space-y-4">
                    {/* Project Image Banner */}
                    <div className="relative h-48 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors capitalize">
                          {project.title}
                        </h3>
                        {project.stars !== undefined && (
                          <div className="flex items-center gap-3 text-xs font-mono text-amber-400">
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400" /> {project.stars}
                            </span>
                            <span className="flex items-center gap-1 text-purple-400">
                              <GitFork className="w-3.5 h-3.5" /> {project.forks || 0}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-slate-300 text-xs md:text-sm mt-1 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Key Feature Highlight */}
                    <div className="p-3 rounded-xl glass-panel bg-white/[0.02] border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" /> Open Source Codebase
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {project.problemSolved}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md glass-pill text-[10px] font-mono text-slate-300 border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Metrics Footer */}
                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{project.metrics[0]}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="p-2 rounded-lg glass-pill text-slate-300 hover:text-cyan-300"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1 cursor-pointer"
                      >
                        Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
