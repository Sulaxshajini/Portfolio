import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import CaseStudy from "@/components/project/CaseStudy";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Project not found" };
  const title = `${p.title} — Case Study`;
  return {
    title,
    description: p.overview,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${title} | ${profile.name}`, description: p.tagline, type: "article", url: `/projects/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const adjacent = getAdjacentProjects(slug);
  if (!project || !adjacent) notFound();
  return <CaseStudy project={project} prev={adjacent.prev} next={adjacent.next} />;
}
