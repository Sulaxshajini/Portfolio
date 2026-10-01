'use client';

import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { profile } from '@/data/profile';
import { education, languages } from '@/data/education';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-primary-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto relative z-10">
        <div className="mb-16">
          <TextReveal text="Behind the Systems" className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-text-primary mb-2" />
          <Reveal variant="line" delay={0.35} className="w-20 h-1 bg-gradient-to-r from-accent-primary to-mauve rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Introduction */}
          <Stagger stagger={0.12} className="space-y-6 text-text-secondary leading-relaxed text-lg">
            <StaggerItem><p>
              I am a <strong className="text-accent-primary font-medium">Final-year Bachelor of Information Technology undergraduate</strong> at the University of Moratuwa with hands-on, end-to-end experience across databases, application systems, and technical troubleshooting.
            </p></StaggerItem>
            <StaggerItem><p>
              My practical exposure includes designing, administering, and maintaining relational databases (<span className="text-text-primary">MySQL, SQL Server basics, SQLite</span>), diagnosing and resolving application and connectivity issues, and documenting technical workflows.
            </p></StaggerItem>
            <StaggerItem><p>
              I work comfortably with Git, REST APIs and cross-platform tools, and I debug methodically. As a fast, self-directed learner with strong written and spoken communication, I am looking for a <strong className="text-accent-primary font-medium">full stack developer internship</strong> where I can ship real features and grow with an engineering team.
            </p></StaggerItem>
          </Stagger>

          {/* Right: Profile Card */}
          <Reveal
            variant="right"
            distance={40}
            delay={0.15}
            className="p-8 rounded-2xl bg-card-bg/80 backdrop-blur-md border border-border-subtle shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">EDUCATION</h4>
                <p className="text-text-primary font-medium">{education[0].institution}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">FIELD</h4>
                <p className="text-text-primary font-medium">{education[0].degree}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">LOCATION</h4>
                <p className="text-text-primary font-medium">{profile.location}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">LANGUAGES</h4>
                <p className="text-text-primary font-medium">{languages.map(l => l.name).join(' • ')}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-2">FOCUS</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.focus.map((f, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono rounded bg-card-elevated border border-border-subtle text-accent-primary">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-primary/50 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-primary/50 rounded-br-xl" />
          </Reveal>

        </div>
      </div>
    </section>
  );
}
