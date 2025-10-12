import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export", // GitHub Pages를 위한 정적 HTML 생성
  images: {
    unoptimized: true, // GitHub Pages는 이미지 최적화 서버가 없으므로 비활성화
  },
  basePath: "/blog", // 저장소명이 blog이므로 필수
};

export default nextConfig;
