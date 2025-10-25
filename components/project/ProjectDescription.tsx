interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">프로젝트 소개</h2>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </section>
  );
}
