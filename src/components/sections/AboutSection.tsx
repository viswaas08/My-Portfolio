import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { GlassCard } from '../common/GlassCard';
import { personalData } from '../../data/personal';
import { Code, Compass, Zap, ShieldCheck, Heart, Terminal, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Story & Philosophy"
          title="Engineering Purpose-Driven Software"
          subtitle="Combining mathematical precision, high-performance architecture, and Quantum Glass design aesthetics to build world-class products."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Story Panel (7 cols) */}
          <GlassCard className="lg:col-span-7 flex flex-col justify-between space-y-6" glowColor="cyan" enableTilt={false}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest">
                <Terminal className="w-4 h-4" /> Personal Manifesto
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                From Raw Algorithms to Production Platforms
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                I am a passionate Staff Software Engineer & Full Stack Builder. Over the past 3+ years, I have architected offline-first cross-platform mobile apps in **Flutter**, cloud-native microservices in **MERN**, and privacy-focused local **AI agents**.
              </p>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                My engineering approach is simple: software should feel instantaneous (&lt;10ms UI latency), resilient against network drops, and visually breathtaking.
              </p>
            </div>

            {/* Quote Box */}
            <div className="p-4 rounded-xl glass-panel border-cyan-500/30 bg-cyan-950/20 italic text-cyan-200 text-xs md:text-sm">
              "{personalData.quote}" — <span className="font-semibold font-mono not-italic text-white">{personalData.quoteAuthor}</span>
            </div>
          </GlassCard>

          {/* Core Values & Metrics (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassCard className="space-y-2" glowColor="violet">
              <Zap className="w-6 h-6 text-purple-400" />
              <h4 className="text-lg font-extrabold text-white font-mono">Zero Latency</h4>
              <p className="text-xs text-slate-300">
                Optimized state management and local storage caching for sub-10ms UI renders.
              </p>
            </GlassCard>

            <GlassCard className="space-y-2" glowColor="cyan">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
              <h4 className="text-lg font-extrabold text-white font-mono">Clean Architecture</h4>
              <p className="text-xs text-slate-300">
                Strict separation of concerns (Domain, Data, Presentation) for scalability.
              </p>
            </GlassCard>

            <GlassCard className="space-y-2" glowColor="emerald">
              <Compass className="w-6 h-6 text-emerald-400" />
              <h4 className="text-lg font-extrabold text-white font-mono">Offline First</h4>
              <p className="text-xs text-slate-300">
                Encrypted Hive/SQLite storage guaranteeing uninterrupted mobile experience.
              </p>
            </GlassCard>

            <GlassCard className="space-y-2" glowColor="rose">
              <Heart className="w-6 h-6 text-rose-400" />
              <h4 className="text-lg font-extrabold text-white font-mono">User Delight</h4>
              <p className="text-xs text-slate-300">
                Fluid motion, 3D visualizers, micro-interactions, and accessible UI.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
