interface ProjectCardProps {
  title: string;
  company: string;
  description: string;
  tags: Array<{
    name: string;
    colorClass: string;
  }>;
  link?: string;
}

export default function ProjectCard({
  title,
  company,
  description,
  tags,
  link,
}: ProjectCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">{company}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className={`px-3 py-1 ${tag.colorClass} text-sm rounded-full`}>
            {tag.name}
          </span>
        ))}
      </div>
      {link && (
        <div className="flex gap-4 text-sm">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            방문하기 →
          </a>
        </div>
      )}
    </div>
  );
}
