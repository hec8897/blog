import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">주요 프로젝트</h2>
        <p className="text-gray-600">커피챗에서 진행한 프로젝트</p>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block">
            <ProjectCard {...project} />
          </Link>
        ))}
      </div>
    </section>
  );
}
