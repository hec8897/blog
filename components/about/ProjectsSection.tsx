import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  // 회사별로 프로젝트 그룹화
  const greenlabsProjects = projects.filter((project) =>
    project.company.includes("그린랩스")
  );
  const coffeechatProjects = projects.filter(
    (project) => project.company === "커피챗"
  );

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">주요 프로젝트</h2>
      </div>

      {/* 커피챗 프로젝트 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <b className="text-xl font-semibold text-gray-900">커피챗</b>
          <span className="text-sm text-gray-500">23.03 ~ 25.12</span>
        </div>
        <div className="space-y-4">
          {coffeechatProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block">
              <ProjectCard {...project} isClickable />
            </Link>
          ))}
        </div>
      </div>

      {/* 그린랩스 프로젝트 - 클릭 불가 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <b className="text-xl font-semibold text-gray-900">그린랩스</b>
          <span className="text-sm text-gray-500">20.07 ~ 23.02</span>
        </div>
        <div className="space-y-4">
          {greenlabsProjects.map((project) => (
            <div key={project.id}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
