import { NextResponse } from 'next/server';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { education } from '@/data/education';

// Basic fallback logic since we don't have an API key configured by default
export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = message.toLowerCase();

    // Small delay to simulate AI typing
    await new Promise(resolve => setTimeout(resolve, 800));

    let reply = "I don't have that information in Sulaxshajini's portfolio. You can contact her directly at " + profile.email + " for more details.";

    if (query.includes('who is') || query.includes('tell me about')) {
      reply = `${profile.name} is a ${profile.shortDescription} She specializes in ${profile.focus.join(', ')}.`;
    } else if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('reach')) {
      reply = `You can contact her via email at ${profile.email}, phone at ${profile.phone}, or connect on LinkedIn: ${profile.linkedin}.`;
    } else if (query.includes('project') || query.includes('build') || query.includes('work')) {
      const projNames = projects.map(p => p.title).join(', ');
      reply = `She has built several projects including: ${projNames}. Her projects involve technologies like PHP, MySQL, C#, Java, and Next.js. You can see more details in the Projects section.`;
    } else if (query.includes('skill') || query.includes('technology') || query.includes('tech stack') || query.includes('know')) {
      reply = `Her technical skills include Operating Systems (Windows, Android), Databases (MySQL, SQLite), Networking, Programming (C#, Java, PHP, React), and strong IT Support & Troubleshooting capabilities.`;
    } else if (query.includes('mysql') || query.includes('database')) {
      reply = "Yes. She has hands-on experience with MySQL and SQLite, including relational database design, CRUD operations, inventory/order data and data-integrity checks.";
    } else if (query.includes('education') || query.includes('degree') || query.includes('university') || query.includes('study')) {
      reply = `She is pursuing a ${education[0].degree} at ${education[0].institution}, expected to graduate in 2027. She also holds a Diploma in English.`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
