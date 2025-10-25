import Layout from "@/components/Layout";
import Introduction from "@/components/about/Introduction";
import CareerSection from "@/components/about/CareerSection";
import ProjectsSection from "@/components/about/ProjectsSection";
import Contact from "@/components/about/Contact";

export default function About() {
  return (
    <Layout>
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold mb-8">소개</h1>
        <div className="space-y-6">
          <Introduction />
          <CareerSection />
          <ProjectsSection />
          <Contact />
        </div>
      </div>
    </Layout>
  );
}
