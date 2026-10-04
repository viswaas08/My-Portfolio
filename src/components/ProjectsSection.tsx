import React from 'react';
import { 
  ExternalLink, 
  Code2, 
  Layers, 
  Check, 
  Terminal, 
  Cpu 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { technicalProjects } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Complex Systems & Engineering Work
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            In addition to local business websites, I build full-stack web applications, databases, and custom workflows. These showcase my technical depth and architecture capabilities.
          </p>
          <div className="inline-block p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 font-medium">
            * Note: These are independent engineering systems and previous development work, separate from local client demo websites.
          </div>
        </div>

        {/* Technical Projects List */}
        <div className="space-y-12">
          {technicalProjects.map((project, idx) => (
            <div
              key={project.id}
              className="rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10">
                {/* Visual / Screenshot Preview */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                      {project.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      System #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                      {project.notice}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Problem & Solution Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                      <strong className="text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[11px] block">
                        Problem Solved
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                      <strong className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[11px] block">
                        Technical Solution
                      </strong>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Technical Features:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                          <Check className="w-3.5 h-3.5 text-sky-500 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technology.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40 text-xs font-medium font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs sm:text-sm font-semibold transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View GitHub Code</span>
                    </a>

                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold transition"
                    >
                      <ExternalLink className="w-4 h-4 text-sky-500" />
                      <span>Live Project Link</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
