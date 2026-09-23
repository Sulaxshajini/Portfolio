import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import ProblemSolving from '@/components/sections/ProblemSolving';
import SystemMap from '@/components/sections/SystemMap';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import EducationTimeline from '@/components/sections/EducationTimeline';

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <Stats />
      <About />
      <ProblemSolving />
      <SystemMap />
      <Skills />
      <Projects />
      <EducationTimeline />
    </main>
  );
}
