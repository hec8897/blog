interface Project {
  name: string;
  link?: string;
}

interface CareerItemProps {
  company: string;
  period: string;
  description?: string;
  projects: Project[];
  borderColor: string;
  subsidiary?: string;
}

function CareerItem({
  company,
  period,
  description,
  projects,
  borderColor,
  subsidiary,
}: CareerItemProps) {
  return (
    <div className="group relative bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${borderColor.replace(
          "border-",
          "bg-"
        )}`}></div>
      <div className="flex items-baseline gap-2 flex-wrap mb-2">
        <div className="text-lg font-bold text-gray-900 m-0">{company}</div>
        {subsidiary && (
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
            {subsidiary}
          </span>
        )}
        <span className="text-sm text-gray-500 ml-auto">{period}</span>
      </div>
      {description && (
        <p className="text-sm text-gray-600 leading-relaxed mb-2">
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {projects.map((project) =>
          project.link ? (
            <a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 bg-gray-50 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors">
              {project.name}
              <svg
                className="w-3 h-3"
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
          ) : (
            <span
              key={project.name}
              className="text-xs px-3 py-1 bg-gray-50 text-gray-700 rounded-full border border-gray-200">
              {project.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default function CareerSection() {
  const careers = [
    {
      company: "커피챗",
      period: "2023.03 - 현재",
      description:
        "회사와 후보자를 연결하는 서비스를 개발하는 인사 매칭 스타트업",
      projects: [
        { name: "코공고", link: "https://www.cogonggo.co/" },
        { name: "볼트엑스", link: "https://boltx.co/" },
        { name: "커피챗 라운지", link: "https://lounge.coffeechat.kr/" },
        { name: "커피챗 앱" },
      ],
      borderColor: "border-blue-500",
    },
    {
      company: "그린랩스",
      period: "2020.07 - 2023.02",
      description:
        '"지속 가능한 방법으로 인류의 먹는 것을 혁신한다"는 비전을 가지고, "좋은 품질의 먹거리 생산"과 "안정적인 공급"에서 발생하는 문제를 해결하고자 하는 농업 관계자를 위한 모든 솔루션',
      projects: [{ name: "FAAS 프로젝트" }, { name: "농약사 Flutter 앱" }],
      borderColor: "border-green-500",
    },
    {
      company: "우성 소프트",
      subsidiary: "그린랩스 자회사",
      period: "2020.07 - 2023.02",
      projects: [{ name: "농약사 판매 ERP 프로그램" }],
      borderColor: "border-purple-500",
    },
    {
      company: "비엠",
      period: "2019.03 - 2020.05",
      projects: [{ name: "보험사 DB 관리 어드민" }],
      borderColor: "border-orange-500",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">경력</h2>
      <div className="space-y-4">
        {careers.map((career) => (
          <CareerItem key={career.company} {...career} />
        ))}
      </div>
    </section>
  );
}
