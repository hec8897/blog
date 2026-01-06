import { useState } from "react";

const titleStyle = "font-semibold text-gray-900 mb-2";

const ListWrap = ({ list }: { list: string[] }) => {
  return (
    <>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default function Introduction() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="space-y-6">
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-4">
          <svg
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-medium">자세히 보기</span>
        </button>

        <p className="text-gray-700">
          개발 경력은 총 7년이며, 이 중 5년은 프론트엔드로 웹 개발을 메인으로
          경험해 왔습니다. <br />
          초기 서비스 팀에서 웹 서비스를 전담하며 개발 생태를 익혔고, 이후 더 큰
          규모의 팀에 합류해서는 프론트엔드 개발을 전문으로 맡으며 여러 팀원과의
          협업을 경험했습니다.
        </p>
      </div>

      {isExpanded && (
        <div className="space-y-5">
          <div>
            <h3 className={titleStyle}>1. zero to one 신규 서비스 런칭 경험</h3>
            <p className="text-gray-700 mb-2">
              제로 베이스 환경에서 시작해 하나의 완성된 웹 서비스를 기획부터
              개발까지 주도해 성공적으로 런칭한 경험이 있습니다. 그 과정에서
              기획·디자인·마케팅·운영 등 다양한 직군과 긴밀히 협업하며 제품의 전
              과정을 함께 고민했습니다.
            </p>
            <ListWrap
              list={[
                "백엔드 개발자와 협업: API 요구사항과 설계를 함께 논의하며 데이터 구조와 응답 형태를 프론트엔드 관점에서 조율하였습니다.",
                "마케팅·프로덕트 디자이너와 협업: 퍼널 전환율 개선을 위해 CAC 지표를 참고해, 어떤 구간을 개선할 때 효과가 클지 함께 분석하고 보다 효과적인 유저 플로우를 제안했습니다.",
              ]}
            />
          </div>

          <div>
            <h3 className={titleStyle}>
              2. 새로운 기술과 도구를 빠르게 학습해 서비스에 적용하는 개발자
            </h3>

            <ListWrap
              list={[
                "서비스를 구현하기 위해 필요한 기술이나 도구를 빠르게 익히고 적용합니다.",
                "개발자 관점에서 AI를 적극 활용해 개발 생산성과 제품 품질을 높이고, 새로운 시대에 맞는 개발 방식을 지속적으로 고민하고 실험하고 있습니다.",
              ]}
            />
          </div>

          <div>
            <h3 className={titleStyle}>
              3. 핵심지표 기준으로 유저 친화적인 서비스를 만들 수 있는 개발자
            </h3>
            <ListWrap
              list={[
                "조직의 핵심 지표를 기준으로 사용자 친화적인 화면을 설계하고, 전환율과 이탈률을 개선하는 UI/UX에 관심이 많습니다.",
                "사용자들이 작은 편의부터 눈에 띄는 변화까지 변화와 혁신을 명확히 체감할 수 있는 제품을 지향합니다.",
              ]}
            />
          </div>

          <div>
            <h3 className={titleStyle}>
              4. 팀에 실질적 기여를 중시하는 개발자
            </h3>
            <ListWrap
              list={[
                "팀이 나아가고자 하는 목표 달성을 우선에 두고, 무엇이 실질적인 도움이 되는 개발인지 먼저 고민합니다.",
                "문제를 정의하고 해결 과정을 논리적으로 공유하는 문제 해결형 프론트엔드 개발자입니다.",
                "개인의 기술 성장보다 팀의 성공이 오히려 더 큰 개인의 성장을 이끌고 있다고 믿습니다.",
              ]}
            />
          </div>
        </div>
      )}
    </section>
  );
}
