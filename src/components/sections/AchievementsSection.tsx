import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { achievementsData } from '../../data/achievements';
import { GlassCard } from '../common/GlassCard';
import { Trophy, GitCommit, Rocket, Zap, Award, Star } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Trophy, GitCommit, Rocket, Zap, Award, Star
};

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Honors & Metrics"
          title="Key Engineering Achievements"
          subtitle="Measurable outcomes, competition accolades, and open-source milestones."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsData.map(ach => {
            const IconComp = ICON_MAP[ach.icon] || Trophy;

            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard glowColor="cyan" className="text-center space-y-3 p-6">
                  <div className="w-12 h-12 rounded-2xl glass-panel border-cyan-400/40 bg-cyan-950/40 flex items-center justify-center text-cyan-300 mx-auto shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                    <IconComp className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-emerald-300 font-mono">
                      {ach.value}
                    </span>
                    <span className="text-xs text-cyan-400 font-mono block mt-0.5 font-semibold">
                      {ach.metricLabel}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white">{ach.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
