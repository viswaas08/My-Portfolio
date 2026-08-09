export interface PersonalInfo {
  name: string;
  titles: string[];
  bio: string;
  location: string;
  email: string;
  phone?: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl?: string;
  resumeUrl: string;
  quote: string;
  quoteAuthor: string;
  availability: string;
  experienceYears: string;
  projectsCompleted: number;
  satisfiedClients: number;
}

export type SkillCategory = 
  | 'Frontend'
  | 'Backend'
  | 'Databases'
  | 'Mobile'
  | 'Programming'
  | 'Cloud'
  | 'AI'
  | 'DevOps'
  | 'Tools'
  | 'Soft Skills';

export interface SkillItem {
  name: string;
  category: SkillCategory;
  level: number; // 0 - 100
  iconName: string;
  color: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSolved: string;
  solution?: string;
  architecture: string;
  features: string[];
  metrics: string[];
  challengesFaced?: string[];
  lessonsLearned?: string[];
  timeline?: string;
  screenshots?: string[];
  category: 'Flutter' | 'React' | 'MERN' | 'AI' | 'Full Stack' | 'Open Source';
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  image: string;
  featured: boolean;
  stars?: number;
  forks?: number;
}

export interface ExperienceItem {
  id: string;
  type: 'Work' | 'Education' | 'Hackathon' | 'Internship';
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  link?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  category: 'Competition' | 'Open Source' | 'Metric' | 'Recognition';
  value: string;
  metricLabel: string;
  description: string;
  date: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown content
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
