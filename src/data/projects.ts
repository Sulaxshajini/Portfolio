export const projects = [
  {
    id: "01",
    title: "Sunnyside Dairy Management System",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    description: "Relational management system supporting product catalogue, orders, inventory and user accounts.",
    overview: "A comprehensive management system built to handle daily operations for a dairy business.",
    problem: "The business needed a centralized way to track inventory, process orders, and manage customer accounts without data inconsistency.",
    solution: "Developed a relational MySQL database integrated with a PHP backend and a responsive front-end dashboard to monitor stock and orders in real-time.",
    responsibilities: [
      "Administered the relational MySQL database.",
      "Designed the database schema and implemented data-integrity checks.",
      "Built and maintained the administrative dashboard.",
      "Diagnosed and resolved connectivity and data-consistency issues."
    ],
    highlights: ["database design", "inventory", "admin dashboard", "stock monitoring", "data integrity", "troubleshooting"],
    learning: "Gained significant experience in system monitoring and diagnosing data-consistency issues, similar to service-desk environments.",
    github: null,
    demo: null,
    type: "Web Application"
  },
  {
    id: "02",
    title: "SY Bicycle Management System",
    technologies: ["C#", "SQL"],
    description: "C# desktop application backed by a structured SQL data layer with separated Models, Services and Data layers.",
    overview: "A desktop-based management application for a bicycle business, focusing on robust data persistence.",
    problem: "Required a reliable desktop application to manage business records while keeping the business logic clean and maintainable.",
    solution: "Implemented a layered architecture (Models/Services/Data) in C# connected to a SQL data layer.",
    responsibilities: [
      "Developed and maintained the C# desktop application.",
      "Managed the structured SQL data layer.",
      "Applied layered design patterns to decouple business logic from storage."
    ],
    highlights: ["desktop application", "SQL", "layered architecture", "data persistence", "troubleshooting"],
    learning: "Mastered the separation of concerns which is highly transferable to writing clear infrastructure documentation and SOPs.",
    github: null,
    demo: null,
    type: "Desktop Application"
  },
  {
    id: "03",
    title: "Knowledge Knockout",
    technologies: ["Java", "Android Studio", "SQLite"],
    description: "Multi-category Android quiz application with local data persistence and systematic testing.",
    overview: "An educational mobile application allowing users to take quizzes across multiple categories.",
    problem: "Needed a mobile-friendly way to store quiz questions locally and maintain user progress across app sessions.",
    solution: "Built a native Android app using Java and SQLite for fast local data access and persistence.",
    responsibilities: [
      "Built the multi-category Android application.",
      "Configured local data persistence with SQLite.",
      "Performed systematic testing and debugging across the app lifecycle."
    ],
    highlights: ["mobile development", "SQLite", "systematic testing", "debugging"],
    learning: "Enhanced skills in structured mobile debugging and handling local data persistence.",
    github: null,
    demo: null,
    type: "Android App"
  },
  {
    id: "04",
    title: "Minzo",
    technologies: ["HTML", "CSS", "JavaScript"],
    description: "Responsive women's fashion e-commerce front end designed and tested across different screen sizes.",
    overview: "A front-end e-commerce interface for a women's fashion brand.",
    problem: "The UI needed to be consistent and responsive across all devices and breakpoints.",
    solution: "Developed a responsive web interface using core web technologies, applying strict testing methodologies.",
    responsibilities: [
      "Built the responsive front-end.",
      "Tested the UI across various devices and breakpoints.",
      "Verified consistent functionality."
    ],
    highlights: ["responsive UI", "cross-device testing", "front-end development"],
    learning: "Developed a strong eye for detail and first-level QA/support-style checks.",
    github: null,
    demo: null,
    type: "E-Commerce"
  },
  {
    id: "05",
    title: "Personal Portfolio",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    description: "Personal portfolio website with AI-powered interaction, deployment and ongoing technical maintenance.",
    overview: "A premium technical portfolio serving as a live demonstration of my skills and systems thinking.",
    problem: "Needed a professional online presence that goes beyond a standard CV, demonstrating technical capabilities interactively.",
    solution: "Designed and deployed a modern Next.js application featuring an AI assistant, GSAP animations, and a structured data layer.",
    responsibilities: [
      "Designed the system architecture and UI.",
      "Implemented animations and the AI assistant integration.",
      "Managed deployment configuration and ongoing maintenance."
    ],
    highlights: ["Next.js", "AI integration", "GSAP animations", "deployment"],
    learning: "Gained hands-on experience with modern React frameworks, deployment pipelines, and managing ongoing technical upkeep.",
    github: "https://github.com/Sulaxshajini",
    demo: "https://sulaxshajini.github.io/Portfolio",
    type: "Web Platform"
  }
];
