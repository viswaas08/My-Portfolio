export interface TechnicalProject {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  technology: string[];
  features: string[];
  liveDemoUrl: string;
  githubUrl: string;
  image: string;
  notice?: string;
}

export const technicalProjects: TechnicalProject[] = [
  {
    id: "erp-student-management",
    title: "ERP-Based Student Management System",
    category: "Full-Stack Web Application",
    problem: "Colleges and educational institutions struggle with disjointed spreadsheets, manual attendance logging, and paper-based internal marks distribution, leading to errors and delays.",
    solution: "Architected a comprehensive role-based ERP web platform providing synchronized portals for administrators, professors, and students with real-time academic records.",
    technology: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT Auth"],
    features: [
      "Role-based authentication & permissions (Admin, Faculty, Student)",
      "Automated attendance calculator with low-attendance alerts",
      "Internal assessments and GPA examination result publishing",
      "Digital student profiles with document storage and verification",
      "Analytics dashboard showing class trends and semester performance"
    ],
    liveDemoUrl: "https://github.com/viswaas08/Student-Management-System",
    githubUrl: "https://github.com/viswaas08/Student-Management-System",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    notice: "Full-Stack Academic Engineering Project"
  },
  {
    id: "menu-planner",
    title: "Smart Menu Planner & Kitchen Inventory",
    category: "Web Application / Productivity Tool",
    problem: "Food service managers and home chefs lose hours every week manually calculating ingredient procurement, balancing dietary macros, and preventing perishable food waste.",
    solution: "Built an intelligent digital menu planner that dynamically calculates weekly grocery lists, monitors portion recipes, and automatically categorizes ingredients by fresh vs pantry goods.",
    technology: ["React", "TypeScript", "Tailwind CSS", "Local Storage API", "Lucide Icons"],
    features: [
      "Drag-and-drop weekly meal scheduler across breakfast, lunch, dinner",
      "Dynamic automatic grocery list generator with quantity aggregation",
      "Nutritional breakdown and dietary preference filtering (Veg, Vegan, High-Protein)",
      "Recipe card builder with prep time, step instructions, and serving scaling",
      "Offline-first local persistence so plans never vanish"
    ],
    liveDemoUrl: "https://github.com/viswaas08/Menu-Planner",
    githubUrl: "https://github.com/viswaas08/Menu-Planner",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
    notice: "Interactive Kitchen Utility Project"
  },
  {
    id: "civicsync",
    title: "CivicSync — Community Issue Reporting Platform",
    category: "Civic Tech / Community Portal",
    problem: "Citizens face bureaucratic friction when reporting civic infrastructure issues (potholes, streetlights, waste overflow), while municipal teams lack geo-tagged dispatch data.",
    solution: "Engineered a transparent community grievance dashboard where citizens can capture, geo-tag, and track public utility reports with status notifications.",
    technology: ["React", "Tailwind CSS", "Leaflet Maps API", "REST API", "Framer Motion"],
    features: [
      "Geo-tagged civic issue submission with photo upload preview",
      "Interactive municipal status tracker (Reported → In Review → Resolved)",
      "Public community feed allowing upvoting to highlight critical repairs",
      "Municipal authority admin view with priority sorting and department dispatch",
      "Clean mobile-first UI optimized for rapid field reporting"
    ],
    liveDemoUrl: "https://github.com/viswaas08/CivicSync",
    githubUrl: "https://github.com/viswaas08/CivicSync",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
    notice: "Civic Tech Prototype / Previous Work"
  }
];

export const projectsData = technicalProjects;

