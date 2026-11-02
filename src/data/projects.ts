import type { Project } from "./types";

/**
 * Single source of truth for every project and case-study page.
 *
 * To add real screenshots: drop images into /public/projects/<slug>/ and list them
 * in the `screenshots` array (src, alt, caption, width, height). The gallery,
 * lightbox and "Visual Showcase" section appear automatically once the array is
 * non-empty. Sections without data (objective, outcome, design/development
 * process) are hidden rather than invented.
 */
export const projects: Project[] = [
  {
    id: "01",
    slug: "sunnyside-dairy-management-system",
    title: "Sunnyside Dairy Management System",
    category: "Web Application",
    role: "Database administration & development",
    tagline: "A relational system that keeps a dairy's stock, orders and accounts consistent.",
    overview:
      "A comprehensive management system built to handle the daily operations of a dairy business — product catalogue, orders, inventory and user accounts — on a relational MySQL database.",
    challenge:
      "The business needed a centralized way to track inventory, process orders, and manage customer accounts without data inconsistency.",
    solution:
      "Developed a relational MySQL database integrated with a PHP backend and a responsive front-end dashboard to monitor stock and orders in real-time.",
    responsibilities: [
      "Administered the relational MySQL database.",
      "Designed the database schema and implemented data-integrity checks.",
      "Built and maintained the administrative dashboard.",
      "Diagnosed and resolved connectivity and data-consistency issues.",
    ],
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    features: ["Database design", "Inventory tracking", "Admin dashboard", "Stock monitoring", "Data integrity", "Troubleshooting"],
    learnings:
      "Gained significant experience in system monitoring and diagnosing data-consistency issues, similar to service-desk environments.",
    screenshots: [],
    links: {},
    theme: { from: "#7c3aed", to: "#c084fc", glow: "#a78bfa" },
  },
  {
    id: "02",
    slug: "sy-bicycle-management-system",
    title: "SY Bicycle Management System",
    category: "Desktop Application",
    role: "Developer",
    tagline: "A layered C# desktop application with a structured SQL data layer.",
    overview:
      "A desktop-based management application for a bicycle business, focusing on robust data persistence and clean separation between models, services and data access.",
    challenge:
      "Required a reliable desktop application to manage business records while keeping the business logic clean and maintainable.",
    solution:
      "Implemented a layered architecture (Models / Services / Data) in C# connected to a SQL data layer.",
    responsibilities: [
      "Developed and maintained the C# desktop application.",
      "Managed the structured SQL data layer.",
      "Applied layered design patterns to decouple business logic from storage.",
    ],
    technologies: ["C#", "SQL"],
    features: ["Desktop application", "SQL data layer", "Layered architecture", "Data persistence", "Troubleshooting"],
    learnings:
      "Mastered the separation of concerns, which is highly transferable to writing clear infrastructure documentation and SOPs.",
    screenshots: [],
    links: {},
    theme: { from: "#6d28d9", to: "#f0abfc", glow: "#e879f9" },
  },
  {
    id: "03",
    slug: "knowledge-knockout",
    title: "Knowledge Knockout",
    category: "Android App",
    role: "Android developer",
    tagline: "A multi-category quiz app that remembers progress offline.",
    overview:
      "An educational mobile application that lets users take quizzes across multiple categories, with questions and progress stored locally on the device.",
    challenge:
      "Needed a mobile-friendly way to store quiz questions locally and maintain user progress across app sessions.",
    solution:
      "Built a native Android app using Java and SQLite for fast local data access and persistence.",
    responsibilities: [
      "Built the multi-category Android application.",
      "Configured local data persistence with SQLite.",
      "Performed systematic testing and debugging across the app lifecycle.",
    ],
    technologies: ["Java", "Android Studio", "SQLite"],
    features: ["Mobile development", "SQLite persistence", "Systematic testing", "Debugging"],
    learnings: "Enhanced skills in structured mobile debugging and handling local data persistence.",
    screenshots: [],
    links: {},
    theme: { from: "#4f46e5", to: "#a5b4fc", glow: "#818cf8" },
  },
  {
    id: "04",
    slug: "minzo",
    title: "Minzo",
    category: "E-Commerce",
    role: "Front-end developer",
    tagline: "A responsive women's fashion storefront, tested across screen sizes.",
    overview:
      "A front-end e-commerce interface for a women's fashion brand, designed and tested to behave consistently from phone to desktop.",
    challenge: "The UI needed to be consistent and responsive across all devices and breakpoints.",
    solution:
      "Developed a responsive web interface using core web technologies, applying strict testing methodologies.",
    responsibilities: [
      "Built the responsive front-end.",
      "Tested the UI across various devices and breakpoints.",
      "Verified consistent functionality.",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    features: ["Responsive UI", "Cross-device testing", "Front-end development"],
    learnings: "Developed a strong eye for detail and first-level QA/support-style checks.",
    screenshots: [],
    links: {},
    theme: { from: "#be185d", to: "#f9a8d4", glow: "#f472b6" },
  },
  {
    id: "05",
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Web Platform",
    role: "Designer & developer",
    tagline: "This site — an interactive portfolio with its own AI companion.",
    overview:
      "A premium technical portfolio that doubles as a live demonstration of skills and systems thinking, featuring an AI assistant, cinematic motion and a structured data layer.",
    challenge:
      "Needed a professional online presence that goes beyond a standard CV, demonstrating technical capabilities interactively.",
    solution:
      "Designed and deployed a modern Next.js application featuring an AI assistant, animation and a structured data layer that feeds every page.",
    responsibilities: [
      "Designed the system architecture and UI.",
      "Implemented animations and the AI assistant integration.",
      "Managed deployment configuration and ongoing maintenance.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: ["Next.js", "AI integration", "GSAP animations", "Deployment"],
    learnings:
      "Gained hands-on experience with modern React frameworks, deployment pipelines, and managing ongoing technical upkeep.",
    screenshots: [],
    links: {
      github: "https://github.com/Sulaxshajini",
      live: "https://sulaxshajini.github.io/Portfolio",
    },
    theme: { from: "#8b5cf6", to: "#fbcfe8", glow: "#c4b5fd" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
