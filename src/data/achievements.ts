import { AchievementItem } from '../types';

export const achievementsData: AchievementItem[] = [
  {
    id: "ach-1",
    title: "National Hackathon Winner",
    category: "Competition",
    value: "1st Place",
    metricLabel: "Out of 150+ teams",
    description: "Awarded top honor for engineering an offline-first high-speed Flutter AI mobile solution.",
    date: "2024",
    icon: "Trophy"
  },
  {
    id: "ach-2",
    title: "GitHub Contributions",
    category: "Open Source",
    value: "1,200+",
    metricLabel: "Commits in 2024",
    description: "Consistent daily coding streak contributing across personal repositories and open-source packages.",
    date: "2024",
    icon: "GitCommit"
  },
  {
    id: "ach-3",
    title: "Projects Delivered",
    category: "Metric",
    value: "24+",
    metricLabel: "Production Apps",
    description: "Shipped enterprise web & mobile applications with zero critical post-release crashes.",
    date: "2023 - 2026",
    icon: "Rocket"
  },
  {
    id: "ach-4",
    title: "Code Performance Score",
    category: "Metric",
    value: "99+",
    metricLabel: "Lighthouse Score",
    description: "Built web applications adhering strictly to WCAG 2.1 AA accessibility & sub-second render times.",
    date: "2026",
    icon: "Zap"
  }
];
