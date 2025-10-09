import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold mb-8">소개</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">블로그에 대하여</h2>
            <p className="text-gray-700 leading-relaxed">
              안녕하세요! 이 블로그는 개발과 일상, 그리고 배움에 대한 이야기를
              나누는 공간입니다. 새로운 기술을 배우고, 경험을 공유하며, 함께
              성장하는 것을 목표로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">다루는 주제</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>웹 개발 (React, Next.js, TypeScript 등)</li>
              <li>프로그래밍 팁과 베스트 프랙티스</li>
              <li>프로젝트 개발 과정과 회고</li>
              <li>기술 트렌드와 새로운 도구들</li>
              <li>개발자로서의 일상과 생각</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">연락처</h2>
            <p className="text-gray-700">
              궁금한 점이나 함께 나누고 싶은 이야기가 있다면 언제든 연락 주세요!
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600">Email: your.email@example.com</p>
              <p className="text-gray-600">GitHub: github.com/yourusername</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
