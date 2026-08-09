import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { blogsData } from '../../data/blogs';
import { BlogPost } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { Clock, Calendar, ArrowRight, BookOpen, X, Tag } from 'lucide-react';
import { marked } from 'marked';
import { audioSynth } from '../../utils/audioSynthesizer';

export const BlogSection: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Writings"
          title="Articles & Engineering Insights"
          subtitle="Deep dives into mobile clean architecture, offline-first performance, and Quantum Glass UI design."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map(blog => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard
                glowColor="cyan"
                onClick={() => {
                  audioSynth.playClick();
                  setSelectedBlog(blog);
                }}
                className="flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  {/* Cover Image */}
                  <div className="relative h-48 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-mono bg-slate-950/80 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                      {blog.category}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" /> {blog.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {blog.readingTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-slate-300 text-xs md:text-sm mt-2 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-xs font-mono text-slate-300">{blog.author.name}</span>
                  </div>

                  <button className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Article Drawer / Modal */}
        <AnimatePresence>
          {selectedBlog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBlog(null)}
                className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
              >
                {/* Header */}
                <div className="p-6 bg-slate-950/60 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <BookOpen className="w-4 h-4" /> Technical Article
                  </div>
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Article Body */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {selectedBlog.title}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mt-2">
                      <span>{selectedBlog.date}</span>
                      <span>•</span>
                      <span>{selectedBlog.readingTime}</span>
                    </div>
                  </div>

                  {/* Rendered Markdown */}
                  <div
                    className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: marked.parse(selectedBlog.content) as string }}
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
