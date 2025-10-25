import { SubSection } from "@/data/projects";

interface ProjectSubSectionsProps {
  subSections: SubSection[];
}

export default function ProjectSubSections({
  subSections,
}: ProjectSubSectionsProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">페이지별 기능</h2>
      <div className="space-y-6">
        {subSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold">{section.title}</h3>
              {section.link && (
                <a
                  href={section.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
            <ul className="space-y-2">
              {section.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-gray-700">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
