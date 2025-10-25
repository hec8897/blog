interface Tag {
  name: string;
  colorClass: string;
}

interface ProjectTechStackProps {
  tags: Tag[];
}

export default function ProjectTechStack({ tags }: ProjectTechStackProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
            {tag.name}
          </span>
        ))}
      </div>
    </section>
  );
}
