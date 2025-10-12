# Dawoon's Blog

Next.js 기반의 간단하고 깔끔한 블로그 템플릿입니다.

🌐 **배포된 사이트**: [https://hec8897.github.io/blog/](https://hec8897.github.io/blog/)

## 🚀 기능

- ✅ 마크다운 기반 포스트 작성
- ✅ Frontmatter로 메타데이터 관리
- ✅ 반응형 디자인 (모바일/데스크톱)
- ✅ SCSS 스타일링
- ✅ SEO 최적화 (next-seo)
- ✅ 정적 사이트 생성 (SSG)
- ✅ 태그 시스템
- ✅ GitHub Pages 자동 배포
- ✅ Giscus 댓글 시스템 (GitHub 계정 연동)

## 📁 프로젝트 구조

```
blog/
├── content/
│   └── posts/              # 마크다운 포스트 파일들
│       ├── start.md        # /posts/start
│       ├── nextjs-blog.md  # /posts/nextjs-blog
│       ├── typescript.md   # /posts/typescript
│       └── seo-cogongo.md  # /posts/seo-cogongo
├── components/
│   ├── Layout.tsx          # 공통 레이아웃
│   └── PostCard.tsx        # 포스트 카드 컴포넌트
├── lib/
│   └── posts.ts            # 포스트 읽기 유틸리티
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx           # 메인 페이지
│   ├── about.tsx           # 소개 페이지
│   └── posts/
│       └── [id].tsx        # 포스트 상세 페이지
├── styles/
│   └── globals.scss        # 전역 스타일
└── types/
    └── post.ts             # Post 타입 정의
```

## 📝 새 포스트 작성하기

1. `content/posts/` 디렉토리에 새 마크다운 파일을 생성합니다.

   - **파일명이 곧 URL 경로**입니다! (예: `react-hooks.md` → `/posts/react-hooks`)
   - 파일명은 URL에 적합한 형식으로 작성하세요 (소문자, 하이픈 사용)

2. Frontmatter를 추가합니다:

```markdown
---
title: "포스트 제목"
date: "2025-10-11"
author: "작성자 이름"
excerpt: "포스트 요약 (150자 이내)"
tags: ["태그1", "태그2", "태그3"]
---

# 포스트 내용

여기에 마크다운으로 작성합니다...
```

3. 저장하면 자동으로 블로그에 표시됩니다!

## 💡 파일명 규칙

**중요**: 파일명이 곧 URL 경로가 됩니다!

- `my-post.md` → `/posts/my-post`
- `react-hooks.md` → `/posts/react-hooks`
- `seo-cogongo.md` → `/posts/seo-cogongo`

**권장 파일명 형식**

- 소문자 사용
- 단어 사이에 하이픈(`-`) 사용
- 특수문자 사용 금지
- 한글보다는 영문 권장 (URL 가독성)

## 🎨 지원되는 마크다운 기능

- 제목 (H1, H2, H3, ...)
- **볼드**, _이탤릭_
- 리스트 (순서 있는/없는)
- 링크
- 인라인 `코드`
- 코드 블록 (구문 강조)
- 인용구
- 수평선
- 체크리스트
- 테이블 (remark-gfm)

## 🛠️ 설치 및 실행

### 패키지 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 빌드

```bash
yarn build
```

### 프로덕션 실행

```bash
yarn start
```

## 📦 사용된 주요 라이브러리

- **Next.js 15** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS 4** - 유틸리티 기반 CSS
- **SCSS/Sass** - CSS 전처리기
- **react-markdown** - 마크다운 렌더링
- **remark-gfm** - GitHub Flavored Markdown 지원
- **gray-matter** - Frontmatter 파싱
- **next-seo** - SEO 최적화

## 🎯 커스터마이징

### 블로그 제목 변경

`components/Layout.tsx`에서 블로그 제목을 수정할 수 있습니다.

### 색상 테마 변경

`styles/globals.scss`에서 색상 변수를 수정할 수 있습니다:

```scss
$background-light: #ffffff;
$foreground-light: #171717;
$background-dark: #0a0a0a;
$foreground-dark: #ededed;
```

### SEO 설정

`pages/_app.tsx`에서 DefaultSeo 설정을 수정할 수 있습니다.

## 📄 라이선스

MIT License

## 🙏 만든이

Dawoon
