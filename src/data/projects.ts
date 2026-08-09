import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: "flutter-expense-tracker",
    title: "Flutter Expense Tracker & Financial Vault",
    tagline: "Ultra-fast offline-first expense manager powered by Hive database and Flutter Clean Architecture.",
    description: "A production-grade mobile app for intelligent budgeting, recurring subscription tracking, real-time analytics, local backup export/import, and instant notifications.",
    problemSolved: "Traditional financial apps are bloated, slow, and send sensitive bank data to cloud servers. Built an offline-first high-speed vault that processes transactions in <10ms.",
    solution: "Architected a local binary Hive key-value store with reactive BLoC state streams and automated CSV/JSON encryption backups.",
    architecture: "Clean Architecture + BLoC State Management + Hive Local Storage + Automated Unit/Widget Testing Suite",
    features: [
      "Offline-first zero-latency Hive database storage",
      "Interactive pie charts and spending trend heatmaps",
      "Automated recurring subscription tracker",
      "CSV & JSON encryption data export/import",
      "Custom Quantum Glass dark theme UI with smooth page transitions"
    ],
    metrics: [
      "<10ms transaction write latency",
      "100% offline privacy guarantee",
      "99.8% test coverage across core controllers"
    ],
    challengesFaced: [
      "Handling complex reactive stream synchronization across nested BLoC controllers during batch CSV imports.",
      "Optimizing Hive binary serialization for high-frequency recurring expense generation without freezing UI thread."
    ],
    lessonsLearned: [
      "Strict separation of Data and Domain layers prevents state leakage across cross-platform Flutter modules.",
      "Isolating heavy serialization workloads into Dart Isolates maintains fluid 60fps rendering."
    ],
    timeline: "3 Months (2026)",
    screenshots: [
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80"
    ],
    category: "Flutter",
    techStack: ["Flutter", "Dart", "Hive", "BLoC", "Clean Architecture", "Local Notifications"],
    githubUrl: "https://github.com/viswaas08/Flutter-App-Expense-Tracker",
    liveDemoUrl: "https://github.com/viswaas08/Flutter-App-Expense-Tracker",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "quantum-ai-portfolio",
    title: "Quantum Glass AI Developer Portfolio",
    tagline: "Apple-Linear inspired futuristic portfolio with dynamic GitHub REST API integration & AI recruiter assistant.",
    description: "An ultra-premium web app with frosted glass depth, 3D R3F visualizers, native Web Audio API chimes, Lenis smooth scrolling, Command Palette, and live README previews.",
    problemSolved: "Replaces traditional static resume websites with an interactive high-velocity engineering platform that showcases live GitHub telemetry.",
    solution: "Integrated a client-side localStorage 6-hour TTL cache layer with TanStack Query and WebGL canvas particle fields.",
    architecture: "React 18 + Vite + TypeScript + TailwindCSS + Framer Motion + Three.js / R3F + GitHub REST API",
    features: [
      "Dynamic GitHub API live sync for viswaas08 with 6-hour caching",
      "Interactive AI Recruiter Assistant widget",
      "Global Command Palette (Cmd + K) navigation",
      "Synthesized Web Audio ambient chimes",
      "52-Week GitHub contribution heatmap and language distribution breakdown"
    ],
    metrics: [
      "100/100 Lighthouse Performance score target",
      "<50ms interactive state transition response time",
      "6-hour cache protection against API rate limits"
    ],
    challengesFaced: [
      "Preventing GitHub API 403 rate-limit errors during high traffic volume without forcing personal access tokens.",
      "Achieving smooth 60fps WebGL particle rendering alongside Lenis smooth scrolling on lower-end mobile devices."
    ],
    lessonsLearned: [
      "Client-side caching with graceful fallback datasets guarantees 100% uptime regardless of external API outages.",
      "Utilizing Web Audio API oscillators eliminates external MP3 asset download latencies."
    ],
    timeline: "1 Month (2026)",
    screenshots: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
    ],
    category: "React",
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion", "Three.js", "GitHub API"],
    githubUrl: "https://github.com/viswaas08/PORTFOLIO-WEBSITE",
    liveDemoUrl: "https://github.com/viswaas08/PORTFOLIO-WEBSITE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    featured: true
  }
];
