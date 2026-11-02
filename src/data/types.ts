export interface Screenshot {
  src: string; // path under /public, e.g. /projects/minzo/home.png
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  demo?: string;
  docs?: string;
}

export interface ProjectTheme {
  from: string;
  to: string;
  glow: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  year?: string;
  role: string;
  tagline: string;
  overview: string;
  challenge: string;
  objective?: string;
  solution: string;
  responsibilities: string[];
  designProcess?: string[];
  developmentProcess?: string[];
  technologies: string[];
  features: string[];
  learnings: string;
  outcome?: string;
  screenshots: Screenshot[];
  links: ProjectLinks;
  theme: ProjectTheme;
}

export interface SkillItem {
  name: string;
  description: string;
}
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}
