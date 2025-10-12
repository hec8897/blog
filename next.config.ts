import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export", // GitHub Pages를 위한 정적 HTML 생성
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화 서버가 없으므로 비활성화
  },
  // 저장소 이름이 username.github.io가 아니라면 basePath 추가
  // basePath: "/blog", // 저장소명이 blog인 경우
};

export default nextConfig;
