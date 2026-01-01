export interface Feature {
  title: string;
  description: string;
  image?: string;
}

export interface SubSection {
  title: string;
  features: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  tags: Array<{
    name: string;
    colorClass: string;
  }>;
  link?: string;
  subSections?: SubSection[];
  features?: Feature[];
}

const commonTags = [
  { name: "React", colorClass: "" },
  { name: "TypeScript", colorClass: "" },
  { name: "Next.js", colorClass: "" },
  { name: "Recoil", colorClass: "" },
  { name: "React-Hook-Form", colorClass: "" },
  { name: "React-Query", colorClass: "" },
  { name: "Tailwind", colorClass: "" },
  { name: "SCSS", colorClass: "" },
  { name: "Vercel", colorClass: "" },
  { name: "Google Analytics", colorClass: "" },
  { name: "Monorepo", colorClass: "" },
];

export const projects: Project[] = [
  {
    id: "smartfarm",
    title: "스마트팜 클라우드 플랫폼",
    company: "그린랩스 (씨드에프아이씨)",
    description:
      "로컬 기반으로 운영되던 스마트팜 서비스를 클라우드 기반으로 개선하는 웹 전환 프로젝트입니다. IoT 장비 데이터 모니터링과 장비 제어 기능을 제공하는 웹 대시보드를 개발했습니다.",
    tags: [
      { name: "React", colorClass: "" },
      { name: "TypeScript", colorClass: "" },
      { name: "GraphQL", colorClass: "" },
      { name: "Monorepo", colorClass: "" },
      { name: "i18n", colorClass: "" },
    ],
    subSections: [
      {
        title: "주요 기능",
        features: [
          "스마트팜 개발실 내 프론트엔드 코드 파편화 해소를 위한 모노레포 구조 재구성",
          "스마트팜 장비 통제 및 데이터 시각화 대시보드 개발",
          "GraphQL을 활용한 IoT 장비 데이터 수집 및 환경 모니터링",
          "한/미 언어 지원 (i18n)",
        ],
      },
    ],
  },
  {
    id: "woosung-erp",
    title: "농약사 ERP & POS 시스템",
    company: "그린랩스 (우성소프트)",
    description:
      "농약사 ERP 및 POS 관련 웹 서비스를 개발했습니다. 다국적 기업과의 협업 프로젝트, 레거시 POS 리뉴얼, 판매관리 앱 개발 등 다양한 프로젝트를 진행했습니다.",
    tags: [
      { name: "Vue", colorClass: "" },
      { name: "Node.js", colorClass: "" },
      { name: "Express", colorClass: "" },
      { name: "Electron", colorClass: "" },
      { name: "Flutter", colorClass: "" },
      { name: "Vuex", colorClass: "" },
      { name: "Chart.js", colorClass: "" },
      { name: "i18n", colorClass: "" },
    ],
    subSections: [
      {
        title: "다국적 기업 협업 ERP 웹",
        features: [
          "일본계 다국적 기업 스미쇼 아그로와 협업",
          "Node.js·Express 기반 REST API 설계 및 구현",
          "농약·농자재 판매 데이터 집계 및 통계 대시보드 개발",
          "Chart.js를 활용한 판매·재고 시각화",
          "한·미·일 3개 언어 지원 (i18n)",
        ],
      },
      {
        title: "농약사 전용 POS 시스템",
        features: [
          "Visual Basic 레거시 POS를 Vue + Electron으로 리뉴얼",
          "농업 유통 도메인의 복잡한 세법(면세·영세·과세) 로직 구현",
          "Vuex 상태 관리를 통한 거래 데이터 안전 저장",
        ],
      },
      {
        title: "판매관리 앱 (Flutter)",
        features: [
          "농약사 POS 시스템 연동 판매관리 앱 개발",
          "Android 앱 스토어 배포",
          "POS와의 데이터 연동 플로우 설계",
        ],
      },
    ],
  },
  {
    id: "cogongo",
    title: "코공고",
    company: "커피챗",
    description:
      "코공고는 뷰티 업계 구직자와 브랜드를 연결하는 K-뷰티 특화 채용·이직 플랫폼입니다.",
    tags: commonTags,
    link: "https://cogonggo.co",
    features: [
      {
        title: "채용 공고 필터링 및 검색",
        description:
          "뷰티 업계의 다양한 채용 공고를 직무, 지역, 경력 등의 조건으로 필터링하여 원하는 공고를 빠르게 찾을 수 있는 검색 시스템을 구현했습니다.",
      },
      {
        title: "회사 정보 탐색",
        description:
          "올리브영, 아마존 TOP 랭킹 브랜드를 포함한 뷰티 기업들의 상세 정보를 제공하여 지원자가 회사를 미리 파악할 수 있도록 했습니다.",
      },
      {
        title: "뷰티 업계 맞춤 이력서",
        description:
          "뷰티 업계 특성에 맞춘 이력서 작성 및 관리 기능을 제공하여 지원자가 효과적으로 자신을 어필할 수 있도록 지원합니다.",
      },
      {
        title: "커리어 인사이트 매거진",
        description:
          "뷰티 업계의 트렌드, 커리어 팁, 인터뷰 등 다양한 콘텐츠를 제공하여 지원자의 커리어 성장을 돕습니다.",
      },
      {
        title: "양방향 매칭 시스템",
        description:
          "지원자와 채용 회사를 위한 양방향 매칭 시스템을 구현하여 효율적인 채용 프로세스를 지원합니다.",
      },
    ],
  },
  {
    id: "boltx",
    title: "볼트엑스",
    company: "커피챗",
    description:
      "볼트엑스는 연봉부터 제안을 받고 시작하는 IT·테크 직군 특화 이직 플랫폼으로, 경력·보상 데이터 기반으로 기업과 후보자를 빠르게 매칭해 주는 서비스입니다.",
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
    tags: [...commonTags, { name: "Sentry", colorClass: "" }],
  },
  {
    id: "coffeechat-lounge",
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
    id: "coffeechat-app",
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

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
