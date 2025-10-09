import { Post } from "@/types/post";

export const posts: Post[] = [
  {
    id: "1",
    title: "블로그를 시작하며",
    excerpt:
      "새로운 블로그를 시작합니다. 개발, 일상, 그리고 배운 것들을 기록하려고 합니다.",
    content: `
# 블로그를 시작하며

안녕하세요! 새로운 블로그를 시작하게 되었습니다.

## 블로그의 목적

이 블로그에서는 다음과 같은 내용들을 다룰 예정입니다:

- 개발 관련 지식과 경험
- 프로젝트 진행 과정
- 배운 것들에 대한 정리
- 일상과 생각들

앞으로 좋은 글들로 채워나가겠습니다. 감사합니다!
    `,
    date: "2025-10-09",
    author: "블로그 주인",
    tags: ["일상", "시작"],
  },
  {
    id: "2",
    title: "Next.js로 블로그 만들기",
    excerpt: "Next.js를 활용하여 간단한 블로그를 만드는 방법을 소개합니다.",
    content: `
# Next.js로 블로그 만들기

Next.js는 React 기반의 강력한 프레임워크입니다.

## Next.js의 장점

1. **서버 사이드 렌더링(SSR)**: SEO에 유리합니다
2. **정적 사이트 생성(SSG)**: 빠른 로딩 속도
3. **파일 기반 라우팅**: 직관적인 페이지 구조
4. **API Routes**: 백엔드 API를 쉽게 구현

## 블로그 구현하기

블로그를 만들 때는 다음과 같은 요소들이 필요합니다:

- 포스트 목록 페이지
- 개별 포스트 상세 페이지
- 마크다운 렌더링
- 태그 및 카테고리 분류

Next.js를 사용하면 이 모든 것을 쉽게 구현할 수 있습니다!
    `,
    date: "2025-10-08",
    author: "블로그 주인",
    tags: ["개발", "Next.js", "React"],
  },
  {
    id: "3",
    title: "TypeScript 활용하기",
    excerpt:
      "TypeScript를 사용하면 더 안전하고 유지보수하기 좋은 코드를 작성할 수 있습니다.",
    content: `
# TypeScript 활용하기

TypeScript는 JavaScript에 타입을 추가한 언어입니다.

## TypeScript를 사용해야 하는 이유

### 1. 타입 안정성
컴파일 시점에 오류를 발견할 수 있어 런타임 에러를 줄일 수 있습니다.

### 2. 더 나은 개발 경험
자동완성, 리팩토링 등 IDE의 지원을 최대한 활용할 수 있습니다.

### 3. 코드 가독성
타입 정의를 통해 코드의 의도를 명확하게 전달할 수 있습니다.

## 실무에서의 활용

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`안녕하세요, \${user.name}님!\`;
}
\`\`\`

TypeScript를 활용하여 더 나은 코드를 작성해보세요!
    `,
    date: "2025-10-07",
    author: "블로그 주인",
    tags: ["개발", "TypeScript", "프로그래밍"],
  },
];
