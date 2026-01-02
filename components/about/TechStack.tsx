export default function TechStack() {
  const currentTech = [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "Vue",
        "Flutter",
        "TypeScript",
        "Tailwind CSS",
        "SCSS",
        "Recoil",
        "Tanstack Query",
        "React-Hook-Form",
        "JQuery",
      ],
    },
    { category: "Backend", items: ["Node.js", "Express", "PHP"] },
    { category: "Database", items: ["MySql"] },
    { category: "AI", items: ["Cursor", "perplexity", "ChatGPT"] },
    {
      category: "Tool",
      items: ["Figma", "Notion", "Slack", "Jira", "Google Analytics"],
    },
    { category: "DevOps", items: ["AWS", "Vercel", "Sentry"] },
  ];

  const learningTech = [
    { category: "Frontend", items: ["Zustand", "Emotion", "Jest"] },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">기술 스택</h2>

        {/* 사용하는 기술 */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Experience
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {currentTech.map((tech) => (
              <div key={tech.category}>
                <span className="font-medium text-gray-800 block mb-2">
                  {tech.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 학습중인 기술 */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Learning</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {learningTech.map((tech) => (
              <div key={tech.category}>
                <span className="font-medium text-gray-800 block mb-2">
                  {tech.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
