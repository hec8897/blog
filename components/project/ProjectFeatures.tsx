import Image from "next/image";
import { Feature } from "@/data/projects";

interface ProjectFeaturesProps {
  features: Feature[];
}

export default function ProjectFeatures({ features }: ProjectFeaturesProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6">주요 기능</h2>
      <div className="space-y-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-xl p-6 border border-gray-200">
            {feature.image && (
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 relative w-full h-64">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-gray-700 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
