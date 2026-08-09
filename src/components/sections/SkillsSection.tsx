import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { skillsData } from '../../data/skills';
import { SkillCategory } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { audioSynth } from '../../utils/audioSynthesizer';
import {
  Smartphone, Code2, Layers, Database, Atom, FileCode, Globe, Palette,
  Sparkles, Box, Server, Cpu, Network, Zap, Terminal, BrainCircuit, Flame,
  Container, Cloud, GitBranch, Workflow, Layout, Users
} from 'lucide-react';

const CATEGORIES: Array<'All' | SkillCategory> = [
  'All', 'Mobile', 'Frontend', 'Backend', 'Databases', 'Programming', 'Cloud', 'AI', 'DevOps', 'Soft Skills'
];

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Smartphone, Code2, Layers, Database, Atom, FileCode, Globe, Palette,
  Sparkles, Box, Server, Cpu, Network, Zap, Terminal, BrainCircuit, Flame,
  Container, Cloud, GitBranch, Workflow, Layout, Users
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | SkillCategory>('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData
    : skillsData.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tech Stack & Matrix"
          title="Mastered Technologies & Frameworks"
          subtitle="A comprehensive overview of tools, languages, and architectures I leverage to ship production software."
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => {
                audioSynth.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
                  : 'glass-pill text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Badges Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map(skill => {
              const IconComp = ICON_MAP[skill.iconName] || Code2;

              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard glowColor="cyan" className="p-4 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                          style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-white font-mono">{skill.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono">{skill.category}</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-cyan-300 font-bold">{skill.level}%</span>
                    </div>

                    {/* Level Progress Bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
