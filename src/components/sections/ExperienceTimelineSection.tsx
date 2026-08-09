import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { SyncEngine, LiveSyncResult } from '../../services/syncEngine';
import { ExperienceItem } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { audioSynth } from '../../utils/audioSynthesizer';

export const ExperienceTimelineSection: React.FC = () => {
  const [syncData, setSyncData] = useState<LiveSyncResult | null>(null);

  useEffect(() => {
    SyncEngine.fetchLiveTimeline().then(res => setSyncData(res));
  }, []);

  const timelineItems: ExperienceItem[] = syncData?.timeline || [];

  return (
    <section id="timeline" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="LinkedIn Verified Profile Telemetry"
          title="Career Journey & Education Timeline"
          subtitle="Authentic education journey at Karpagam Institute of Technology, Software Engineering Internship at Rovan Software Solutions, and Google Certified credentials."
        />

        {/* Sync Controls Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border-cyan-500/30 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                LinkedIn Verified Profile Stream <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              </h4>
              <span className="text-[10px] text-slate-400 font-mono">
                Source: viswaa-s-69a49a1ba • 100% Authentic Credentials
              </span>
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/viswaa-s-69a49a1ba"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Verify on LinkedIn
          </a>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Cyan Glowing Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_12px_#00f3ff]" />

          <div className="space-y-12">
            {timelineItems.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const IconComp = item.type === 'Work'
                ? Briefcase
                : item.type === 'Education'
                ? GraduationCap
                : item.type === 'Internship'
                ? Briefcase
                : Trophy;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full glass-panel border-cyan-400/60 bg-slate-950 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.4)] z-20">
                    <IconComp className="w-4 h-4 text-cyan-300" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <GlassCard glowColor={isEven ? 'cyan' : 'emerald'} className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {item.type}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono text-slate-400">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          {item.period}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center justify-between gap-2">
                          <span>{item.role}</span>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-400 hover:text-white"
                              title="Verify on LinkedIn"
                            >
                              <ExternalLink className="w-4 h-4 shrink-0" />
                            </a>
                          )}
                        </h3>
                        <p className="text-sm text-cyan-300 font-mono flex items-center gap-2 mt-0.5">
                          {item.organization}
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-400 text-xs flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" /> {item.location}
                          </span>
                        </p>
                      </div>

                      {/* Bullet points */}
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {item.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md glass-pill text-[10px] font-mono text-slate-300 border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
