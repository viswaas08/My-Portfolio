import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubRepo, GithubCommit } from '../../types/github';
import { GithubService } from '../../services/githubService';
import { X, ExternalLink, Star, GitFork, Copy, Check, Terminal, FileText, Calendar, Code2 } from 'lucide-react';
import { Github } from '../common/Icons';
import { marked } from 'marked';
import { audioSynth } from '../../utils/audioSynthesizer';

interface GithubRepoModalProps {
  repo: GithubRepo | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const GithubRepoModal: React.FC<GithubRepoModalProps> = ({ repo, onClose, onShowToast }) => {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [commits, setCommits] = useState<GithubCommit[]>([]);
  const [loadingReadme, setLoadingReadme] = useState<boolean>(false);
  const [copiedClone, setCopiedClone] = useState<boolean>(false);

  useEffect(() => {
    if (!repo) return;
    setLoadingReadme(true);

    GithubService.fetchRepoReadme(repo.name).then((text: string) => {
      try {
        const html = marked.parse(text) as string;
        setReadmeContent(html);
      } catch (e) {
        setReadmeContent(`<p>${text}</p>`);
      }
      setLoadingReadme(false);
    });

    GithubService.fetchRepoCommits(repo.name).then((list: GithubCommit[]) => {
      setCommits(list);
    });
  }, [repo]);

  if (!repo) return null;

  const cloneCommand = `git clone ${repo.html_url}.git`;

  const copyCloneSnippet = () => {
    audioSynth.playClick();
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    onShowToast(`Clone command copied to clipboard!`);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
        >
          {/* Header */}
          <div className="p-6 bg-slate-950/60 border-b border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Github className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl md:text-2xl font-extrabold text-white font-mono tracking-tight">
                  {repo.name}
                </h2>
                {repo.language && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {repo.language}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-xs md:text-sm">{repo.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* Quick Metrics Bar & Clone Snippet */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star className="w-4 h-4" /> {repo.stargazers_count} Stars
                  </span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <GitFork className="w-4 h-4" /> {repo.forks_count} Forks
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30 flex items-center gap-1"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono hover:bg-emerald-500/30 flex items-center gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Clone Command Snippet */}
              <div className="glass-card p-4 rounded-xl flex items-center justify-between font-mono text-xs text-slate-300">
                <span className="flex items-center gap-2 truncate">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <code className="text-cyan-200 truncate">{cloneCommand}</code>
                </span>
                <button
                  onClick={copyCloneSnippet}
                  className="ml-2 p-1.5 rounded-lg glass-pill text-cyan-400 hover:text-white shrink-0"
                >
                  {copiedClone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Commits History Preview */}
            {commits.length > 0 && (
              <div className="glass-card p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Recent Commit Activity
                </h4>
                <div className="space-y-2">
                  {commits.map((c: GithubCommit) => (
                    <div key={c.sha} className="flex items-center justify-between text-xs text-slate-300 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="truncate max-w-md font-mono">{c.commit.message}</span>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {new Date(c.commit.author.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* README Content Parser */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <FileText className="w-4 h-4" /> README Documentation Preview
              </h4>
              {loadingReadme ? (
                <div className="p-8 text-center text-slate-400 font-mono text-xs">
                  Loading README documentation...
                </div>
              ) : (
                <div
                  className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed overflow-x-auto"
                  dangerouslySetInnerHTML={{ __html: readmeContent }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Repo ID: {repo.id}</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl glass-pill text-cyan-300 hover:border-cyan-400"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
