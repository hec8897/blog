import { useState } from "react";

import CompanySection from "./CompanySection";

export default function ProjectsSection() {
  const [expandedCompanies, setExpandedCompanies] = useState({
    coffeechat: true,
    greenlabs: false,
    bme: false,
  });

  const toggleCompany = (company: keyof typeof expandedCompanies) => {
    setExpandedCompanies((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">주요 프로젝트</h2>
      </div>

      <div className="flex flex-col gap-2">
        {/* 커피챗 프로젝트 */}
        <CompanySection
          company="커피챗"
          expanded={expandedCompanies.coffeechat}
          toggleCompany={() => toggleCompany("coffeechat")}
          period="2023.03 ~ 2025.12"
        />
        <CompanySection
          company="그린랩스"
          expanded={expandedCompanies.greenlabs}
          toggleCompany={() => toggleCompany("greenlabs")}
          period="2020.07 ~ 2023.02"
        />
        {/* 비엠 프로젝트 - 클릭 불가 */}
        <CompanySection
          company="비엠"
          expanded={expandedCompanies.bme}
          toggleCompany={() => toggleCompany("bme")}
          period="2019.03 ~ 2020.05"
        />
      </div>
    </section>
  );
}
