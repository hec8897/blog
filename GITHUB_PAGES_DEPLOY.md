# GitHub Pages 배포 가이드

Next.js 블로그를 GitHub Pages에 자동으로 배포하는 방법입니다.

## ✅ 완료된 작업

1. **Next.js 설정 수정** (`next.config.ts`)

   - `output: "export"` 추가 (정적 HTML 생성)
   - `images.unoptimized: true` 추가 (이미지 최적화 비활성화)

2. **.nojekyll 파일 생성** (`public/.nojekyll`)

   - GitHub Pages가 Jekyll을 사용하지 않도록 설정

3. **GitHub Actions 워크플로우 생성** (`.github/workflows/deploy.yml`)
   - main 브랜치에 push 시 자동 빌드 및 배포

## 🔧 GitHub 저장소 설정 (필수)

### 1. GitHub Pages 활성화

1. GitHub 저장소 페이지로 이동 (https://github.com/hec8897/blog)
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Build and deployment** 섹션에서:
   - **Source**: "GitHub Actions" 선택 ⚠️ 중요!
   - (기본값인 "Deploy from a branch"가 아님)

### 2. 저장소 확인

- 저장소가 **public**이어야 합니다 (무료 계정의 경우)
- private 저장소는 GitHub Pro 계정 필요

## 🚀 배포 방법

### 자동 배포 (추천)

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

- main 브랜치에 push하면 자동으로 빌드 및 배포 시작
- GitHub Actions 탭에서 배포 진행 상황 확인 가능

### 배포 확인

1. GitHub 저장소 → **Actions** 탭
2. "Deploy to GitHub Pages" 워크플로우 확인
3. 완료되면 체크 표시 ✅
4. 배포된 사이트 접속:
   - `https://hec8897.github.io/blog/` (저장소명이 blog인 경우)
   - `https://hec8897.github.io/` (저장소명이 hec8897.github.io인 경우)

## 📝 중요 사항

### basePath 설정

저장소 이름에 따라 `next.config.ts`의 `basePath` 설정이 필요합니다:

**케이스 1: 저장소명이 `username.github.io`**

- `basePath` 설정 불필요
- URL: `https://hec8897.github.io/`

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  // basePath 불필요
};
```

**케이스 2: 저장소명이 `blog` 등 다른 이름**

- `basePath` 설정 필요
- URL: `https://hec8897.github.io/blog/`

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/blog", // ⚠️ 저장소명과 동일하게 설정
};
```

현재 설정에서 `basePath`가 주석 처리되어 있으므로, **저장소명에 맞게 수정**하세요!

### 이미지 경로

- 이미지는 `public` 폴더에 저장
- 참조 시: `/images/example.png` (basePath가 있어도 `/`로 시작)
- Next.js가 자동으로 basePath 추가

### 링크 처리

- Next.js의 `Link` 컴포넌트 사용 시 basePath 자동 적용
- `<a>` 태그 직접 사용 시 수동으로 basePath 추가 필요

```typescript
import Link from 'next/link';

// ✅ 올바른 방법 (basePath 자동 적용)
<Link href="/posts/example">포스트</Link>

// ❌ 피해야 할 방법
<a href="/posts/example">포스트</a>
```

## 🔍 문제 해결

### 1. 404 에러가 발생하는 경우

**원인**: `basePath` 설정이 잘못됨
**해결**: 저장소 이름과 `basePath`가 일치하는지 확인

### 2. CSS/이미지가 로드되지 않는 경우

**원인**: 경로 문제
**해결**:

- 모든 정적 파일은 `public` 폴더에 저장
- 참조 시 `/`로 시작하는 절대 경로 사용

### 3. GitHub Actions가 실행되지 않는 경우

**원인**: Pages 설정이 잘못됨
**해결**:

- Settings → Pages → Source가 "GitHub Actions"인지 확인
- 워크플로우 파일 경로 확인: `.github/workflows/deploy.yml`

### 4. 빌드 에러가 발생하는 경우

**확인 사항**:

- 로컬에서 `npm run build` 테스트
- `getServerSideProps` 사용 여부 확인 (사용 불가)
- API Routes 사용 여부 확인 (사용 불가)

```bash
# 로컬에서 빌드 테스트
npm run build

# 생성된 정적 파일 확인
ls -la out/
```

## 🎯 제약사항

GitHub Pages는 정적 사이트 호스팅이므로 다음 기능은 사용할 수 없습니다:

- ❌ `getServerSideProps` (서버사이드 렌더링)
- ❌ API Routes (`pages/api/*`)
- ❌ ISR (Incremental Static Regeneration)
- ❌ 이미지 최적화 (자동 최적화 비활성화됨)
- ✅ `getStaticProps` (정적 생성) - 사용 가능
- ✅ `getStaticPaths` (동적 라우팅) - 사용 가능

현재 블로그는 `getStaticProps`를 사용하므로 문제없습니다! ✅

## 🌟 다음 단계

1. 저장소 이름 확인 (blog 인지 username.github.io 인지)
2. `next.config.ts`에서 `basePath` 설정 (필요한 경우)
3. 변경사항 커밋 및 푸시
4. GitHub Actions에서 배포 확인
5. 배포된 사이트 접속

## 📚 참고 자료

- [Next.js Static Exports 문서](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
