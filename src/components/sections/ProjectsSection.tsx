import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { ExternalLink, Search, Layers, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { Github } from '../common/Icons';
import { audioSynth } from '../../utils/audioSynthesizer';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES = ['All', 'Flutter', 'React', 'MERN', 'AI'];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
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
          badge="Featured Engineering"
          title="Production Projects & Architectures"
          subtitle="Explore flagship mobile applications, full-stack cloud dashboards, and local AI solutions."
        />

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
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-xs md:text-sm mt-1 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Problem Solved Highlight */}
                    <div className="p-3 rounded-xl glass-panel bg-white/[0.02] border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" /> Key Innovation
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
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1"
                      >
                        Details <ArrowRight className="w-3.5 h-3.5" />
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
