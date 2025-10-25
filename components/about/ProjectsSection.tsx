import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const commonTags = [
    { name: "React", colorClass: "" },
    { name: "TypeScript", colorClass: "" },
    { name: "Next.js", colorClass: "" },
    { name: "Recoil", colorClass: "" },
    { name: "React-Hook-Form", colorClass: "" },
    { name: "React-Query", colorClass: "" },
    { name: "Tailwind", colorClass: "" },
    { name: "SCSS", colorClass: "" },
  ];

  const projects = [
    {
      title: "코공고",
      company: "커피챗",
      description:
        "뷰티 업계 채용 공고를 한 곳에서 모아보는 플랫폼입니다. 채용 공고 필터링 및 검색, 회사 정보 탐색, 뷰티 업계 맞춤 이력서 작성 및 관리, 커리어 인사이트 매거진, 지원자와 채용 회사를 위한 양방향 매칭 시스템을 구현했습니다.",
      tags: commonTags,
      link: "https://cogonggo.co",
    },
    {
      title: "볼트엑스",
      company: "커피챗",
      description: "연봉부터 제안받는 이직 플랫폼입니다.",
      subSections: [
        {
          title: "유저용 페이지",
          features: [
            "건강보험 기반 경력 & 연봉 인증",
            "후보자 정보 입력",
            "유저 가입 플로우 트래킹 시스템",
          ],
          link: "https://boltx.co/",
        },
        {
          title: "어드민 페이지",
          features: [
            "후보자 둘러보기",
            "에이전트 (헤드헌팅 전용 기능)",
            "포지션 관리 (후보자 관리)",
          ],
        },
        {
          title: "비즈니스 페이지",
          features: ["B2B 랜딩 페이지", "희망 기업 신청폼"],
          link: "https://biz.boltx.co/",
        },
      ],
      tags: commonTags,
    },
    {
      title: "커피챗 라운지",
      company: "커피챗",
      description:
        "회사와 후보자를 연결하는 커피챗 매칭 플랫폼입니다. 기업 프로필 관리, 후보자 검색 및 필터링, 커피챗 요청 및 수락 시스템, 일정 조율 및 알림, 채팅 및 화상 미팅 연동, 매칭 히스토리 관리 기능을 구현했습니다.",
      tags: [
        ...commonTags,
        { name: "WebView", colorClass: "" },
        { name: "iOS/Android Bridge", colorClass: "" },
      ],
      link: "https://lounge.coffeechat.kr/",
    },
    {
      title: "커피챗 앱",
      company: "커피챗",
      description:
        "사람과 사람을 연결하는 모바일 네트워킹 앱입니다. 웹뷰 환경에서 커피챗 매칭 사용자 간 일정 조정 기능, 인기 검색 순위 기능을 구현했습니다. Android/iOS 개발자와 긴밀히 협업하여 네이티브-웹 간 통신 인터페이스를 설계하고 개발했습니다. (서비스 종료)",
      tags: [
        { name: "React", colorClass: "" },
        { name: "TypeScript", colorClass: "" },
        { name: "WebView", colorClass: "" },
        { name: "iOS/Android Bridge", colorClass: "" },
      ],
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">주요 프로젝트</h2>
        <p className="text-gray-600">커피챗에서 진행한 프로젝트</p>
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
}
