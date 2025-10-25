import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "@/components/Layout";
import { projects } from "@/data/projects";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjectIds, getProjectData, ProjectDetail } from "@/lib/projects";
import TableOfContents, {
  extractHeadings,
} from "@/components/project/TableOfContents";

interface ProjectPageProps {
  projectData: ProjectDetail;
}

export default function ProjectPage({ projectData }: ProjectPageProps) {
  const projectInfo = projects.find((p) => p.id === projectData.id);
  const headings = extractHeadings(projectData.content);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* 뒤로 가기 */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          뒤로 가기
        </Link>

        {/* 프로젝트 헤더 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl font-bold">{projectData.title}</h1>
            {projectData.link && (
              <a
                href={projectData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                <svg
                  className="w-5 h-5"
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
          <div className="flex items-center gap-4 text-gray-600">
            <span className="text-lg">{projectData.company}</span>
            {projectData.period && (
              <>
                <span>•</span>
                <span>{projectData.period}</span>
              </>
            )}
            {projectData.role && (
              <>
                <span>•</span>
                <span>{projectData.role}</span>
              </>
            )}
          </div>
        </div>

        {/* 목차 */}
        {headings.length > 0 && <TableOfContents items={headings} />}

        {/* Markdown 콘텐츠 */}
        <article className="prose prose-lg max-w-none mb-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children, ...props }) => {
                const text = children?.toString() || "";
                const id = text
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9가-힣-]/g, "");
                return (
                  <h2 id={id} {...props}>
                    {children}
                  </h2>
                );
              },
              h3: ({ children, ...props }) => {
                const text = children?.toString() || "";
                const id = text
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9가-힣-]/g, "");
                return (
                  <h3 id={id} {...props}>
                    {children}
                  </h3>
                );
              },
            }}>
            {projectData.content}
          </ReactMarkdown>
        </article>

        {/* 기술 스택 */}
        {projectInfo && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">기술 스택</h2>
            <div className="flex flex-wrap gap-3">
              {projectInfo.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                  {tag.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
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
