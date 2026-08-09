import { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    type: "Work",
    role: "Full Stack & Flutter Software Engineer",
    organization: "Independent Engineering / Open Source",
    period: "2024 - Present",
    location: "India",
    description: [
      "Engineered cross-platform mobile apps with Flutter & Dart, implementing Clean Architecture and reactive state management.",
      "Built MERN stack applications powering real-time web interfaces and backend REST services.",
      "Optimized client-side rendering pipeline, achieving 60fps smooth scrolling performance.",
      "Integrated local LLM tools and automated CI/CD pipelines with GitHub Actions."
    ],
    technologies: ["Flutter", "Dart", "React", "TypeScript", "Node.js", "MongoDB", "TailwindCSS"]
  },
  {
    id: "exp-2",
    type: "Education",
    role: "Bachelor of Technology in Computer Science & Engineering",
    organization: "University Institute of Technology",
    period: "2020 - 2024",
    location: "India",
    description: [
      "Graduated with distinction in Computer Science & Engineering.",
      "Specialized in Data Structures & Algorithms, Software Architecture, Operating Systems, and Database Management Systems.",
      "Active contributor in developer communities and hackathons."
    ],
    technologies: ["Data Structures", "Algorithms", "C++", "Java", "DBMS", "Software Engineering"]
  },
  {
    id: "exp-3",
    type: "Hackathon",
    role: "1st Place Winner - AI & Mobile Hackathon",
    organization: "National Level Tech Hackathon",
    period: "2024",
    location: "India",
    description: [
      "Won 1st place by architecting an offline-first AI mobile solution in 36 continuous hours.",
      "Recognized by judges for UI polish, performance metrics, and clean code architecture."
    ],
    technologies: ["Flutter", "Dart", "Hive", "Python", "Local AI"]
  }
];
