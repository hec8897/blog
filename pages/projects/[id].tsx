import { GetStaticPaths, GetStaticProps } from "next";

import { getProjectIds, getProjectData, ProjectDetail } from "@/lib/projects";
import Layout from "@/components/Layout";
import ProjectId from "@/components/project_id";

interface ProjectPageProps {
  projectData: ProjectDetail;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = getProjectIds();
  const paths = ids.map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const projectData = getProjectData(params?.id as string);

  return {
    props: {
      projectData,
    },
  };
};

export default function ProjectPage({ projectData }: ProjectPageProps) {
  return (
    <Layout>
      <ProjectId projectId={projectData.id} projectData={projectData} />
    </Layout>
  );
}
