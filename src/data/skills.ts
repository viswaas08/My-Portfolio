import { SkillItem } from '../types';

export const skillsData: SkillItem[] = [
  // Mobile / Flutter
  { name: 'Flutter', category: 'Mobile', level: 95, iconName: 'Smartphone', color: '#02569B', featured: true },
  { name: 'Dart', category: 'Programming', level: 92, iconName: 'Code2', color: '#0175C2', featured: true },
  { name: 'Bloc / Riverpod', category: 'Mobile', level: 90, iconName: 'Layers', color: '#00D2FF', featured: true },
  { name: 'Hive / SQLite', category: 'Databases', level: 88, iconName: 'Database', color: '#FFCA28', featured: false },
  
  // Frontend
  { name: 'React', category: 'Frontend', level: 94, iconName: 'Atom', color: '#61DAFB', featured: true },
  { name: 'TypeScript', category: 'Programming', level: 92, iconName: 'FileCode', color: '#3178C6', featured: true },
  { name: 'Next.js', category: 'Frontend', level: 88, iconName: 'Globe', color: '#FFFFFF', featured: true },
  { name: 'TailwindCSS', category: 'Frontend', level: 95, iconName: 'Palette', color: '#38BDF8', featured: true },
  { name: 'Framer Motion', category: 'Frontend', level: 90, iconName: 'Sparkles', color: '#E10098', featured: true },
  { name: 'Three.js / R3F', category: 'Frontend', level: 82, iconName: 'Box', color: '#00F3FF', featured: true },

  // Backend & MERN
  { name: 'Node.js', category: 'Backend', level: 90, iconName: 'Server', color: '#339933', featured: true },
  { name: 'Express.js', category: 'Backend', level: 92, iconName: 'Cpu', color: '#999999', featured: false },
  { name: 'MongoDB', category: 'Databases', level: 88, iconName: 'Database', color: '#47A248', featured: true },
  { name: 'PostgreSQL', category: 'Databases', level: 85, iconName: 'Database', color: '#4169E1', featured: true },
  { name: 'REST & GraphQL APIs', category: 'Backend', level: 92, iconName: 'Network', color: '#E535AB', featured: false },
  { name: 'Redis', category: 'Databases', level: 80, iconName: 'Zap', color: '#DC382D', featured: false },

  // AI & Cloud
  { name: 'Python', category: 'Programming', level: 88, iconName: 'Terminal', color: '#3776AB', featured: true },
  { name: 'Ollama / LLMs Integration', category: 'AI', level: 86, iconName: 'BrainCircuit', color: '#A855F7', featured: true },
  { name: 'Firebase', category: 'Cloud', level: 90, iconName: 'Flame', color: '#FFCA28', featured: true },
  { name: 'Docker', category: 'DevOps', level: 82, iconName: 'Container', color: '#2496ED', featured: true },
  { name: 'AWS / Vercel', category: 'Cloud', level: 85, iconName: 'Cloud', color: '#FF9900', featured: false },
  { name: 'Git & GitHub Actions', category: 'DevOps', level: 92, iconName: 'GitBranch', color: '#F05032', featured: false },

  // Soft Skills
  { name: 'System Architecture', category: 'Soft Skills', level: 90, iconName: 'Workflow', color: '#10B981', featured: true },
  { name: 'UI/UX Design Systems', category: 'Soft Skills', level: 92, iconName: 'Layout', color: '#EC4899', featured: true },
  { name: 'Agile & Team Leadership', category: 'Soft Skills', level: 88, iconName: 'Users', color: '#6366F1', featured: false }
];
