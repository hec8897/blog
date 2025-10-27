import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectMetadata {
  title: string;
  company: string;
  description: string;
  link?: string;
  period?: string;
  role?: string;
  team?: string;
}

export interface ProjectDetail extends ProjectMetadata {
  id: string;
  content: string;
}

export function getProjectIds() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return fileName.replace(/\.md$/, "");
  });
}

export function getProjectData(id: string): ProjectDetail {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    id,
    content,
    ...(data as ProjectMetadata),
  };
}

export function getAllProjects(): ProjectDetail[] {
  const ids = getProjectIds();
  return ids.map((id) => getProjectData(id));
}
