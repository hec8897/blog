"use client";

import { useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 헤더 높이만큼 오프셋
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-3 mb-8 border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full hover:opacity-70 transition-opacity">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            📑 목차 ({items.length})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <nav className="space-y-0.5 mt-3 pt-3 border-t border-gray-200">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                block w-full text-left px-2 py-1.5 rounded transition-colors
                hover:bg-gray-100
                ${
                  item.level === 2
                    ? "text-gray-900 text-sm font-medium"
                    : "text-gray-600 text-xs pl-4"
                }
              `}>
              {item.title}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

// 마크다운 내용에서 헤딩 추출하는 유틸 함수
export function extractHeadings(markdown: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    // 한글 제목을 URL 친화적인 ID로 변환
    const id = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9가-힣-]/g, "");

    headings.push({ id, title, level });
  }

  return headings;
}
