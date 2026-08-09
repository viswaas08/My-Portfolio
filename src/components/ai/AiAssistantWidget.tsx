import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, User, X, Send, ChevronRight, CheckCircle2 } from 'lucide-react';
import { personalData } from '../../data/personal';
import { audioSynth } from '../../utils/audioSynthesizer';

interface AiAssistantWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  "What is Viswaas's primary tech stack?",
  "Summarize top Flutter experience",
  "Is Viswaas open for full-time engineering roles?",
  "Tell me about the MERN & AI capabilities",
  "How to contact Viswaas?"
];

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Greetings! I am Quantum AI, Viswaas's virtual assistant. Ask me anything about his Flutter, React, MERN, or AI engineering background!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    audioSynth.playClick();

    const userMsg: Message = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI logic synthesis response generator
    setTimeout(() => {
      let replyText = "";
      const lower = text.toLowerCase();

      if (lower.includes('flutter') || lower.includes('mobile')) {
        replyText = "Viswaas is a Senior Flutter Developer specializing in Clean Architecture, BLoC/Riverpod state management, offline-first local Hive vaults, and responsive cross-platform mobile apps.";
      } else if (lower.includes('mern') || lower.includes('react') || lower.includes('stack')) {
        replyText = "Viswaas builds scalable web platforms with React 18, TypeScript, TailwindCSS, Node.js, Express.js, MongoDB aggregation pipelines, and Redis caching.";
      } else if (lower.includes('role') || lower.includes('open') || lower.includes('hire') || lower.includes('job')) {
        replyText = `Yes! Viswaas is currently: ${personalData.availability}. Feel free to drop an email at ${personalData.email}!`;
      } else if (lower.includes('ai') || lower.includes('ollama') || lower.includes('llm')) {
        replyText = "Viswaas integrates local LLM engines (like Qwen2.5-Coder & Ollama), vector search, and custom AI bridges directly into web and mobile workflows.";
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
        replyText = `You can directly reach out via email at ${personalData.email} or LinkedIn at ${personalData.linkedinUrl}.`;
      } else {
        replyText = `Viswaas brings ${personalData.experienceYears} of full-stack engineering expertise across Flutter, React, MERN, and AI integrations. Check out the Projects section below for live demos!`;
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      audioSynth.playSuccess();
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 right-6 z-50 w-full max-w-md px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="glass-panel rounded-3xl overflow-hidden border-purple-500/40 shadow-2xl shadow-purple-950/60"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 p-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5 font-mono">
                  Quantum AI Assistant <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready to answer recruiter queries
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl glass-pill text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-80 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 rounded-tr-none'
                      : 'glass-panel border-white/10 text-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] text-slate-400 font-mono mt-1 block text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-purple-400 text-xs font-mono">
                <Bot className="w-4 h-4 animate-spin" /> Thinking...
              </div>
            )}
          </div>

          {/* Presets */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 overflow-x-auto flex gap-2">
            {PRESET_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full glass-pill text-[10px] text-cyan-300 border-cyan-500/30 hover:bg-cyan-950/50 flex items-center gap-1 shrink-0"
              >
                <ChevronRight className="w-3 h-3" /> {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about Viswaas..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
