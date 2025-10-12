import { useEffect, useRef } from "react";

export default function Comments() {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentsRef.current) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "hec8897/blog"); // 예: "yourusername/blog"
    script.setAttribute("data-repo-id", "R_kgDOP-Xi4A");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOP-Xi4M4CwiB4");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentsRef.current.appendChild(script);
  }, []);

  return <div ref={commentsRef} className="giscus mt-16" />;
}
