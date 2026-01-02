import { useMemo } from "react";

import { useRouter } from "next/router";
import { projects } from "@/data/projects";

import ProjectCard from "./ProjectCard";

export default function CompanySection({
  company,
  expanded,
  toggleCompany,
  period,
}: {
  company: string;
  expanded: boolean;
  toggleCompany: (company: string) => void;
  period: string;
}) {
  const { push } = useRouter();

  const projectsData = useMemo(() => {
    return projects.filter((project) => project.company.includes(company));
  }, [company]);

  return (
    <div>
      <button
        onClick={() => toggleCompany("coffeechat")}
        className="flex items-center gap-2 mb-4 w-full text-left hover:opacity-70 transition-opacity  cursor-pointer">
        <svg
          className={`w-5 h-5 transition-transform flex-shrink-0 ${
            expanded ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <b className="text-xl font-semibold text-gray-900">{company}</b>
        <span className="text-sm text-gray-500">{period}</span>
      </button>
      {expanded && (
        <div className="space-y-4">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                if (project.isDetailPage) {
                  push(`/projects/${project.id}`);
                }
              }}>
              <ProjectCard {...project} isClickable={project.isDetailPage} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
