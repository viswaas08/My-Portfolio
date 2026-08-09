import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Code, Terminal, Sparkles, Folder, FileText, X, ArrowRight, User } from 'lucide-react';
import { Github } from './Icons';
import { projectsData } from '../../data/projects';
import { skillsData } from '../../data/skills';
import { blogsData } from '../../data/blogs';
import { audioSynth } from '../../utils/audioSynthesizer';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          audioSynth.playSuccess();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projectsData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredSkills = skillsData.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBlogs = blogsData.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    audioSynth.playClick();
    onClose();
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl glass-panel rounded-2xl border-cyan-500/40 overflow-hidden shadow-2xl shadow-cyan-950/50 z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10">
            <Search className="w-5 h-5 text-cyan-400 mr-3" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command, project name, or skill (e.g. Flutter, React, GitHub)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-sm md:text-base font-mono"
            />
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-4">
            {/* Quick Navigation Commands */}
            {!query && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest px-2">
                  Quick Navigation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleSelect('#hero')}
                    className="flex items-center justify-between p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-left text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" /> Hero & Overview
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelect('#github')}
                    className="flex items-center justify-between p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-left text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-purple-400" /> GitHub Live Dashboard
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelect('#projects')}
                    className="flex items-center justify-between p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-left text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-emerald-400" /> Featured Projects
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleSelect('https://github.com/viswaas08')}
                    className="flex items-center justify-between p-3 rounded-xl glass-pill hover:border-cyan-400/40 text-left text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-amber-400" /> Open GitHub Profile
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            )}

            {/* Projects Results */}
            {filteredProjects.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest px-2">
                  Projects ({filteredProjects.length})
                </span>
                {filteredProjects.map(project => (
                  <div
                    key={project.id}
                    onClick={() => handleSelect('#projects')}
                    className="p-3 rounded-xl glass-pill hover:border-cyan-400/50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">{project.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{project.tagline}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 rounded">
                      {project.category}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Results */}
            {filteredSkills.length > 0 && query && (
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest px-2">
                  Skills ({filteredSkills.length})
                </span>
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map(skill => (
                    <div
                      key={skill.name}
                      onClick={() => handleSelect('#skills')}
                      className="px-3 py-1.5 rounded-lg glass-pill text-xs text-slate-200 flex items-center gap-2 cursor-pointer hover:border-purple-400/40"
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: skill.color }} />
                      {skill.name} ({skill.level}%)
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-slate-950/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Navigation: ESC to exit</span>
            <span className="flex items-center gap-1 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" /> Quantum Command Line
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
