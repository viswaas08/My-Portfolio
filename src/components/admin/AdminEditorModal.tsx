import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Save, Download, Upload, RotateCcw, Check, Sparkles, User, Folder, Code2, Globe } from 'lucide-react';
import { ConfigManager, PortfolioConfig } from '../../services/configManager';
import { audioSynth } from '../../utils/audioSynthesizer';

interface AdminEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminEditorModal: React.FC<AdminEditorModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const [config, setConfig] = useState<PortfolioConfig>(ConfigManager.getConfig());
  const [activeTab, setActiveTab] = useState<'personal' | 'projects' | 'skills' | 'json'>('personal');
  const [jsonInput, setJsonInput] = useState('');

  useEffect(() => {
    if (isOpen) {
      const currentConfig = ConfigManager.getConfig();
      setConfig(currentConfig);
      setJsonInput(JSON.stringify(currentConfig, null, 2));
    }
  }, [isOpen]);

  // Keyboard shortcut listener Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          audioSynth.playSuccess();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    audioSynth.playSuccess();
    ConfigManager.saveConfig(config);
    onShowToast('Portfolio configuration saved! UI updated live.');
    onClose();
  };

  const handleExport = () => {
    audioSynth.playClick();
    ConfigManager.exportConfigJSON();
    onShowToast('Configuration JSON exported successfully.');
  };

  const handleImportJSON = () => {
    const success = ConfigManager.importConfigJSON(jsonInput);
    if (success) {
      audioSynth.playSuccess();
      onShowToast('Custom configuration imported successfully!');
      setConfig(ConfigManager.getConfig());
      onClose();
    } else {
      onShowToast('Error importing JSON. Please check JSON syntax.');
    }
  };

  const handleReset = () => {
    audioSynth.playClick();
    ConfigManager.resetToDefaults();
    setConfig(ConfigManager.getConfig());
    onShowToast('Portfolio configuration reset to default codebase settings.');
    onClose();
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

        {/* Admin Drawer Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl overflow-hidden border-cyan-500/40 shadow-2xl flex flex-col z-10"
        >
          {/* Drawer Header */}
          <div className="p-6 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center font-bold">
                <Settings className="w-5 h-5 animate-spin" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white font-mono flex items-center gap-2">
                  Portfolio Live Customizer & Content Admin <Sparkles className="w-4 h-4 text-cyan-400" />
                </h3>
                <span className="text-xs text-slate-400 font-mono">Live Edit • LocalStorage Sync • JSON Export</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
              >
                <Save className="w-4 h-4" /> Save & Apply Live
              </button>
              <button onClick={onClose} className="p-2 rounded-xl glass-pill text-slate-300 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-2 bg-slate-950/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'personal'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 inline mr-1.5" /> Personal Telemetry
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              <Folder className="w-3.5 h-3.5 inline mr-1.5" /> Projects Manager
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'skills'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 inline mr-1.5" /> Skill Matrix
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                activeTab === 'json'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/40'
                  : 'glass-pill text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 inline mr-1.5" /> JSON Import / Export
            </button>
          </div>

          {/* Form Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-300">
            {/* TAB 1: Personal Details */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-cyan-400">Full Name</label>
                    <input
                      type="text"
                      value={config.personal.name}
                      onChange={e => setConfig({ ...config, personal: { ...config.personal, name: e.target.value } })}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-cyan-400">Email Address</label>
                    <input
                      type="email"
                      value={config.personal.email}
                      onChange={e => setConfig({ ...config, personal: { ...config.personal, email: e.target.value } })}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-purple-400">GitHub Profile URL</label>
                    <input
                      type="text"
                      value={config.personal.githubUrl}
                      onChange={e => setConfig({ ...config, personal: { ...config.personal, githubUrl: e.target.value } })}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-purple-400">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={config.personal.linkedinUrl}
                      onChange={e => setConfig({ ...config, personal: { ...config.personal, linkedinUrl: e.target.value } })}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-emerald-400">Availability Banner Status</label>
                  <input
                    type="text"
                    value={config.personal.availability}
                    onChange={e => setConfig({ ...config, personal: { ...config.personal, availability: e.target.value } })}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Executive Bio Paragraph</label>
                  <textarea
                    rows={3}
                    value={config.personal.bio}
                    onChange={e => setConfig({ ...config, personal: { ...config.personal, bio: e.target.value } })}
                    className="w-full glass-input rounded-xl p-3 text-xs text-white resize-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Projects Manager */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {config.projects.map((proj, idx) => (
                  <div key={proj.id} className="glass-card p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-bold">Project #{idx + 1}: {proj.title}</span>
                      <span className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/20 text-cyan-300 rounded">
                        {proj.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={e => {
                          const updated = [...config.projects];
                          updated[idx].title = e.target.value;
                          setConfig({ ...config, projects: updated });
                        }}
                        className="glass-input rounded-xl px-3 py-1.5 text-xs text-white"
                        placeholder="Project Title"
                      />
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={e => {
                          const updated = [...config.projects];
                          updated[idx].tagline = e.target.value;
                          setConfig({ ...config, projects: updated });
                        }}
                        className="glass-input rounded-xl px-3 py-1.5 text-xs text-white"
                        placeholder="Tagline"
                      />
                    </div>

                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={e => {
                        const updated = [...config.projects];
                        updated[idx].description = e.target.value;
                        setConfig({ ...config, projects: updated });
                      }}
                      className="w-full glass-input rounded-xl p-2.5 text-xs text-white resize-none"
                      placeholder="Project Description"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Skill Matrix */}
            {activeTab === 'skills' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.skills.map((s, idx) => (
                  <div key={s.name} className="glass-card p-3 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="font-mono text-xs text-white font-bold">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={s.level}
                        onChange={e => {
                          const updated = [...config.skills];
                          updated[idx].level = Number(e.target.value);
                          setConfig({ ...config, skills: updated });
                        }}
                        className="w-16 glass-input rounded-lg px-2 py-1 text-xs text-cyan-300 font-mono text-center"
                      />
                      <span className="text-xs font-mono text-slate-400">%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: JSON Raw Editor / Backup */}
            {activeTab === 'json' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">Raw JSON Config Payload</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExport}
                      className="px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-cyan-300 flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> Export JSON
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-xl glass-pill text-xs font-mono text-rose-400 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
                    </button>
                  </div>
                </div>

                <textarea
                  rows={12}
                  value={jsonInput}
                  onChange={e => setJsonInput(e.target.value)}
                  className="w-full glass-input rounded-xl p-4 text-xs font-mono text-cyan-200 resize-none"
                />

                <button
                  onClick={handleImportJSON}
                  className="w-full py-2.5 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/40 text-xs font-mono flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Import JSON & Reload Configuration
                </button>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Shortcut: Ctrl + Shift + A to open anytime</span>
            <button onClick={onClose} className="px-4 py-1.5 rounded-xl glass-pill text-cyan-300">
              Close Editor
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
