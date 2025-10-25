interface SubSection {
  title: string;
  features: string[];
  link?: string;
}

interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  tags: Array<{
    name: string;
    colorClass: string;
  }>;
  link?: string;
  subSections?: SubSection[];
}

export default function ProjectCard({
  title,
  company,
  description,
  tags,
  link,
  subSections,
}: ProjectCardProps) {
  return (
    <div className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-400 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="text-xl font-bold text-gray-900 mb-1">{title}</div>
          <p className="text-sm text-gray-500">{company}</p>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <span>방문</span>
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

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {subSections && subSections.length > 0 && (
        <div className="mb-4 space-y-3">
          {subSections.map((section) => (
            <div
              key={section.title}
              className="pl-4 border-l-2 border-gray-200">
              <div className="flex items-center gap-2 mb-1.5">
                <h4 className="text-sm font-semibold text-gray-800">
                  {section.title}
                </h4>
                {section.link && (
                  <a
                    href={section.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-xs text-gray-500 hover:text-gray-900 transition-colors">
                    <svg
                      className="w-3 h-3"
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
              <ul className="space-y-1">
                {section.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-xs text-gray-600 flex items-start gap-1.5">
                    <span className="text-gray-400 mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}
