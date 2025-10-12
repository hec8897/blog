# Giscus 댓글 시스템 설정 가이드

## 완료된 작업 ✅

- Comments 컴포넌트 생성 (`components/Comments.tsx`)
- 포스트 페이지에 댓글 섹션 추가 (`pages/posts/[id].tsx`)

## 설정이 필요한 작업 🔧

### 1. GitHub 저장소에서 Discussions 활성화

1. GitHub 저장소로 이동 (예: `github.com/dawoon/blog`)
2. **Settings** 탭 클릭
3. **General** 메뉴에서 Features 섹션 찾기
4. **Discussions** 체크박스 활성화 ✅

### 2. Giscus 앱 설치

1. https://github.com/apps/giscus 방문
2. **Install** 버튼 클릭
3. 블로그 저장소 선택하여 설치

### 3. Giscus 설정 정보 가져오기

1. https://giscus.app/ko 방문
2. **저장소** 필드에 `사용자명/저장소명` 입력

   - 예: `dawoon/blog`
   - ✅ "저장소가 공개되어 있고..." 메시지 확인

3. **페이지 ↔️ Discussions 매핑** 섹션:

   - "pathname" 선택 (기본값, 추천)

4. **Discussion 카테고리** 섹션:

   - "General" 또는 원하는 카테고리 선택
   - 또는 새 카테고리 생성 (예: "Blog Comments")

5. **기능** 섹션:

   - 원하는 기능 선택 (기본 설정 추천)

6. **테마** 섹션:

   - "light" 또는 "preferred_color_scheme" 선택

7. **giscus 활성화** 섹션에서 생성된 설정 값 복사:
   ```
   data-repo="..."
   data-repo-id="..."
   data-category="..."
   data-category-id="..."
   ```

### 4. 설정 값 적용

1. `components/Comments.tsx` 파일 열기
2. 다음 부분을 Giscus에서 받은 값으로 수정:

```typescript
script.setAttribute("data-repo", "dawoon/blog"); // 본인의 저장소로 수정
script.setAttribute("data-repo-id", "[여기에 repo-id 입력]");
script.setAttribute("data-category", "General"); // 선택한 카테고리
script.setAttribute("data-category-id", "[여기에 category-id 입력]");
```

### 5. 테스트

1. 개발 서버 실행: `npm run dev` 또는 `yarn dev`
2. 블로그 포스트 페이지 접속
3. 하단에 Giscus 댓글 위젯이 표시되는지 확인
4. GitHub 계정으로 로그인하여 댓글 작성 테스트

## 완료 후 결과 🎉

- ✅ GitHub 계정으로 댓글 작성 가능
- ✅ GitHub Discussions에 댓글이 자동으로 저장됨
- ✅ 리액션(👍 ❤️ 등) 추가 가능
- ✅ 무료이고 광고 없음
- ✅ 한국어 지원

## 추가 커스터마이징 (선택사항)

### 다크모드 지원

`components/Comments.tsx`에서 테마 동적 변경:

```typescript
script.setAttribute("data-theme", isDark ? "dark" : "light");
```

### 댓글 입력창 위치 변경

```typescript
script.setAttribute("data-input-position", "top"); // 상단으로 이동
```

### 언어 변경

```typescript
script.setAttribute("data-lang", "en"); // 영어로 변경
```

## 문제 해결

### 댓글 위젯이 표시되지 않는 경우

1. 저장소가 **public**인지 확인
2. Discussions가 활성화되어 있는지 확인
3. Giscus 앱이 저장소에 설치되어 있는지 확인
4. 브라우저 콘솔에서 에러 메시지 확인

### 댓글을 달 수 없는 경우

1. GitHub 계정으로 로그인했는지 확인
2. 저장소에 대한 권한이 있는지 확인

## 참고 자료

- [Giscus 공식 사이트](https://giscus.app/ko)
- [Giscus GitHub](https://github.com/giscus/giscus)
