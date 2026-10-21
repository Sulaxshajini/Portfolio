<p align="center">
  <strong>S U L A X S H A J I N I</strong><br/>
  <em>IT Support & Infrastructure — Portfolio</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-13-E91E63?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock&logoColor=white" alt="GSAP" />
</p>

---

## ✨ Overview

A premium, interactive personal portfolio for **Sulaxshajini Kumarakulasingam**, built around the concept of **"SYSTEM ONLINE"** — a sophisticated technical system interface. The site is designed to communicate IT support expertise, systems thinking, and technical troubleshooting through purposeful animation and data-driven components.

> **Live:** [sulaxshajini.github.io/Portfolio](https://portfolio-sulaxshajini.onrender.com/)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animation (~90%)** | Framer Motion 13 |
| **Scroll Storytelling** | GSAP 3 + ScrollTrigger |
| **Smooth Scrolling** | Lenis |
| **Icons** | Lucide React |
| **Fonts** | Inter (primary) · JetBrains Mono (technical) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — fonts, providers, global components
│   ├── page.tsx                # Main page — assembles all sections
│   ├── globals.css             # @theme tokens, custom palette, grid background
│   └── api/
│       └── chat/
│           └── route.ts        # AI chatbot API route (fallback + OpenAI-ready)
│
├── components/
│   ├── Navbar.tsx              # Floating glass nav bar with mobile menu
│   ├── Chatbot.tsx             # AI assistant panel (floating FAB → chat panel)
│   ├── providers/
│   │   └── SmoothScrollProvider.tsx
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Subtle cyan dot cursor (desktop only)
│   │   └── ScrollProgress.tsx  # Thin scroll progress indicator
│   └── sections/
│       ├── Hero.tsx            # Hero + interactive system visualization
│       ├── Stats.tsx           # 4 qualitative metric cards
│       ├── About.tsx           # "Behind the Systems" + profile card
│       ├── ProblemSolving.tsx  # GSAP horizontal scroll 6-step pipeline
│       ├── SystemMap.tsx       # "How Everything Connects" node network
│       ├── Skills.tsx          # Interactive skill cards (6 categories)
│       ├── Projects.tsx        # Large project cards
│       ├── ProjectModal.tsx    # Project detail overlay
│       ├── EducationTimeline.tsx # Vertical timeline + languages
│       └── Footer.tsx          # Contact form, info, system status bar
│
├── data/                       # ← All content lives here, not in components
│   ├── profile.ts              # Personal info, strengths, contact
│   ├── projects.ts             # 5 projects with full detail
│   ├── skills.ts               # 6 categories of technical skills
│   └── education.ts            # Education history + languages
│
└── lib/
    └── utils.ts                # cn() helper (clsx + tailwind-merge)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Sulaxshajini/portfolio-sulaxshajini.git
cd portfolio-sulaxshajini

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

---

## 🎨 Dynamic Theme Engine (New Theme On Every Refresh)

On every page load or refresh, the website picks a **new color theme at random** (intelligently avoiding the previous theme). A synchronous inline script in `<head>` sets the active theme attributes before the first render, ensuring **zero flash of unstyled theme (FOUC)** and **zero hydration errors**.

### The 8 Color Themes

| ID | Name | Background | Accent | Mood / Identity |
|---|---|---|---|---|
| `midnight-cyan` | **Midnight Cyan** | `#07111F` (Navy) | `#38BDF8` (Sky Blue) | Default technical SaaS aesthetic |
| `neon-lime` | **Neon Lime** | `#0B1020` (Dark Terminal) | `#C6FF4D` (Neon Lime) | Cyber / terminal developer vibe |
| `magenta-luxe` | **Magenta Luxe** | `#101014` (Obsidian) | `#FF3CAC` (Vivid Magenta) | High-contrast premium luxe |
| `forest-ivory` | **Forest Ivory** | `#102820` (Forest Green) | `#C3F584` (Ivory Lime) | Modern organic engineering |
| `cream-cobalt` | **Cream Cobalt** | `#FAF7F0` (Studio Cream) | `#1839C8` (Royal Cobalt) | Editorial studio light mode |
| `deep-space` | **Deep Space** | `#080D1A` (Deep Void) | `#42E8E0` (Cyan Teal) | High-tech infrastructure & cloud |
| `burgundy-blush` | **Burgundy Blush** | `#3B1025` (Deep Wine) | `#F1A7C2` (Blush Pink) | Elegant gallery tone |
| `midnight-peach` | **Midnight Peach** | `#111827` (Midnight Slate) | `#FFBFA3` (Sunset Peach) | Warm & welcoming modern tech |

### Testing or Forcing a Specific Theme

You can preview any theme by adding a URL query parameter:

- `http://localhost:3000/?theme=1` or `/?theme=neon-lime`
- `http://localhost:3000/?theme=5` or `/?theme=cream-cobalt` (Light theme)
- `http://localhost:3000/?theme=random` (Reset to random on each refresh)

You can also click the **`THEME: [Name] ⟳`** button in the footer's system status bar anytime to live-shuffle themes without reloading!

---

## 🤖 AI Chatbot

The portfolio includes a floating AI assistant (**Sulaxshajini AI**) that answers visitor questions using only the structured data from `src/data/`.

### How It Works

1. **Default mode (no API key):** Keyword-based fallback matching — works out of the box.
2. **Enhanced mode (with API key):** Set `OPENAI_API_KEY` in `.env.local` and update `src/app/api/chat/route.ts` to use the OpenAI SDK.

```bash
# .env.local
OPENAI_API_KEY=sk-...
```

> [!IMPORTANT]
> The chatbot **never invents information**. It only uses the portfolio knowledge base. API keys are **never exposed client-side** — all AI calls go through the server-side API route.

---

## 📬 Contact Form

The contact form in the footer is UI-ready. To connect it to an email service:

1. Install a provider SDK (e.g., `npm install resend`)
2. Create an API route at `src/app/api/contact/route.ts`
3. Wire up the form's `onSubmit` handler in `Footer.tsx`

---

## ♿ Accessibility

- Semantic HTML throughout
- Keyboard-navigable (all interactive elements)
- Visible focus states
- `aria-label` on icon-only buttons
- `prefers-reduced-motion` respected by Lenis
- Custom cursor disabled on touch devices
- GSAP horizontal scroll falls back to vertical on mobile

---

## ⚡ Performance

- Server Components by default — client components only where interactivity is needed
- Framer Motion for lightweight UI animation
- GSAP used sparingly for scroll-driven storytelling only
- Lenis respects touch scrolling and mobile performance
- Static generation for the main page
- Dynamic rendering only for the `/api/chat` route

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Other Platforms

```bash
npm run build    # Generates .next/
npm run start    # Starts production server on port 3000
```

Set environment variables on your hosting platform:

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Optional | Enables AI-powered chatbot responses |

---

## 📝 Updating Content

All portfolio content is centralized in `src/data/`. To update:

| File | What to Edit |
|---|---|
| `data/profile.ts` | Name, contact info, focus areas, strengths |
| `data/projects.ts` | Project details, technologies, descriptions |
| `data/skills.ts` | Technical skill categories and items |
| `data/education.ts` | Education history and languages |

No component code changes needed for content updates.

---

## 📜 License (MIT)

© 2026 Sulaxshajini Kumarakulasingam. All rights reserved.

---

<p align="center">
  <sub>Built with ❤️ using Next.js, Framer Motion, GSAP & Tailwind CSS</sub>
</p>
