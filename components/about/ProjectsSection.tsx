import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const projects = [
    {
      title: "코공고",
      company: "커피챗",
      description:
        "코딩 공부를 함께하는 커뮤니티 플랫폼입니다. 사용자들이 스터디를 개설하고 참여하며, 프로젝트를 공유하고 피드백을 주고받을 수 있는 공간을 제공합니다.",
      tags: [
        { name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { name: "TypeScript", colorClass: "bg-blue-100 text-blue-800" },
        { name: "Next.js", colorClass: "bg-blue-100 text-blue-800" },
      ],
      link: "https://cogongo.com",
    },
    {
      title: "볼트엑스",
      company: "커피챗",
      description:
        "실시간 거래 및 차트 분석 기능을 제공하는 암호화폐 거래 플랫폼입니다. 사용자 친화적인 UI/UX와 빠른 거래 처리 속도가 특징입니다.",
      tags: [
        { name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { name: "TypeScript", colorClass: "bg-blue-100 text-blue-800" },
        { name: "WebSocket", colorClass: "bg-blue-100 text-blue-800" },
      ],
    },
    {
      title: "커피챗 라운지",
      company: "커피챗",
      description:
        "직장인들을 위한 네트워킹 플랫폼입니다. 관심사가 비슷한 사람들과 커피챗을 통해 연결되고 인사이트를 나눌 수 있습니다.",
      tags: [
        { name: "React", colorClass: "bg-blue-100 text-blue-800" },
        { name: "TypeScript", colorClass: "bg-blue-100 text-blue-800" },
        { name: "Next.js", colorClass: "bg-blue-100 text-blue-800" },
      ],
    },
    {
      title: "커피챗 앱",
      company: "커피챗",
      description:
        "모바일 환경에 최적화된 커피챗 네이티브 앱입니다. 푸시 알림, 채팅, 일정 관리 등의 기능을 제공하여 더욱 편리한 네트워킹 경험을 제공합니다.",
      tags: [
        { name: "React Native", colorClass: "bg-green-100 text-green-800" },
        { name: "TypeScript", colorClass: "bg-green-100 text-green-800" },
        { name: "Firebase", colorClass: "bg-green-100 text-green-800" },
      ],
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">주요 프로젝트</h2>
      <p className="text-gray-600 mb-6">커피챗에서 진행한 프로젝트</p>
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
