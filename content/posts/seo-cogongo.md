---
title: "Next.js 프로젝트의 SEO 최적화: cogonggo 개발 경험담"
date: "2025-10-10"
author: "Dawoon"
excerpt: "뷰티 업계 채용 플랫폼 cogonggo를 개발하면서 실전으로 적용한 SEO 전략과 Next.js에서의 구현 방법을 상세히 공유합니다."
tags: ["개발", "Next.js", "SEO", "cogonggo", "경험담"]
---

# Next.js 프로젝트의 SEO 최적화: cogonggo 개발 경험담

## 들어가며

뷰티 업계 채용 플랫폼인 **cogonggo**를 개발하면서 SEO(검색 엔진 최적화)는 가장 중요한 과제 중 하나였습니다. 사용자가 검색을 통해 우리 서비스를 찾을 수 있도록 만드는 것이 비즈니스 성공의 핵심이었기 때문이죠. 이 글에서는 Next.js 기반 프로젝트에서 실전으로 적용한 SEO 전략과 그 과정에서 얻은 인사이트를 공유하고자 합니다.

---

## 1. 기본 설정: next-seo와 DefaultSeo

### next-seo 라이브러리 도입

처음 SEO를 구현할 때 가장 먼저 한 일은 `next-seo` 라이브러리를 도입한 것입니다. 이 라이브러리는 Next.js에서 메타태그를 쉽게 관리할 수 있게 해줍니다.

```typescript
// libs/next-seo.config.ts
const defaultSEOConfig = {
  siteUrl: "cogonggo.co",
  title: "코공고 | 코스메틱 공고 모음",
  description: "우리가 기다려온 뷰티업계만을 위한 채용공고",
  canonical: process.env.NEXT_PUBLIC_COGONGGO,
  openGraph: {
    title: "코공고 | 코스메틱 공고 모음",
    locale: "ko_KR",
    url: process.env.NEXT_PUBLIC_COGONGGO,
    siteName: "코공고 | 코스메틱 공고 모음",
    description: "우리가 기다려온 뷰티업계만을 위한 채용공고",
    images: [
      {
        url: "/og.png",
        alt: "코공고 | 뷰티회사를 위한 채용의 시작",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "뷰티업계 채용, 뷰티 회사 채용, 화장품 회사 취업, ...",
    },
  ],
};
```

### \_app.tsx에서 DefaultSeo 적용

전체 사이트에 공통으로 적용될 SEO 설정을 `_app.tsx`에서 관리합니다:

```typescript
// pages/_app.tsx
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "libs/next-seo.config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}
```

**💡 인사이트**: DefaultSeo를 사용하면 모든 페이지에 기본 SEO 설정이 적용되고, 각 페이지에서 NextSeo를 사용해 오버라이드할 수 있습니다. 이는 중복 코드를 줄이고 일관성을 유지하는 데 큰 도움이 됩니다.

---

## 2. 페이지별 SEO 최적화

### 동적 페이지의 메타태그 관리

각 페이지마다 고유한 SEO 정보가 필요합니다. 특히 동적 라우팅을 사용하는 페이지에서는 서버에서 받은 데이터를 기반으로 메타태그를 생성해야 합니다.

```typescript
// pages/insight/dbd/[id]/index.tsx
const InSight_id = ({ data, id }: { data: insight_dbd; id: string }) => {
  return (
    <>
      <NextSeo
        {...{
          title: data.title,
          description: data.metaDescription,
          openGraph: {
            title: data.title,
            url: `${process.env.NEXT_PUBLIC_COGONGGO}insight/dbd/${id}`,
            siteName: data.title,
            description: data.metaDescription,
            images: [
              {
                url: data.ogImageUrl,
                alt: data.altText,
              },
            ],
          },
          additionalMetaTags: [
            {
              name: "keywords",
              content: data.metaKeyword || "뷰티업계 채용, ...",
            },
          ],
        }}
      />
      <Page {...{ data, copyLink }} />
    </>
  );
};
```

**💡 인사이트**:

- 서버에서 받은 데이터(`data.title`, `data.metaDescription` 등)를 직접 메타태그에 활용
- Open Graph 이미지도 동적으로 설정하여 SNS 공유 시 적절한 이미지가 표시되도록 함
- 키워드가 없을 경우 기본 키워드를 fallback으로 제공

---

## 3. 정적 생성과 ISR(Incremental Static Regeneration)

### getStaticPaths와 getStaticProps 활용

SEO를 위해서는 서버 사이드 렌더링(SSR)이나 정적 생성(SSG)이 필수입니다. cogonggo에서는 대부분의 페이지에 **ISR(Incremental Static Regeneration)**을 적용했습니다.

```typescript
// pages/insight/dbd/[id]/index.tsx
export const getStaticPaths = async () => {
  try {
    const data = await getInsightMagzine();
    const paths = data.map((data) => ({
      params: { id: data },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch {
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = context.params.id;

  try {
    const data = await getInsightMagzineDetail({ id });

    return {
      props: {
        data,
        id,
      },
      revalidate: 60, // 60초마다 재생성
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
      },
      revalidate: 60,
    };
  }
};
```

**💡 인사이트**:

- **fallback: 'blocking'**: 빌드 시점에 생성되지 않은 페이지도 요청 시 즉시 생성
- **revalidate: 60**: 60초마다 페이지를 재검증하여 최신 데이터 유지
- **에러 처리**: 데이터를 가져오지 못하면 404로 리다이렉트하여 broken page 방지

이 방식의 장점:

1. **빠른 초기 로딩**: 정적 파일로 제공되어 속도가 매우 빠름
2. **최신 데이터 유지**: revalidate로 주기적으로 업데이트
3. **SEO 최적화**: 크롤러가 완전한 HTML을 받아감

---

## 4. Sitemap과 Robots.txt 설정

### next-sitemap 라이브러리 활용

검색 엔진이 사이트 구조를 이해할 수 있도록 sitemap을 생성했습니다.

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://www.cogonggo.co",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/404"],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
```

### robots.txt 설정

```txt
# robots.txt for cogonggo.co

User-agent: *
Disallow: /register

Sitemap: https://www.cogonggo.co/sitemap.xml
```

**💡 인사이트**:

- **exclude 옵션**: 관리자 페이지나 미완성 페이지는 sitemap에서 제외
- **generateRobotsTxt: true**: sitemap 생성 시 robots.txt도 자동 생성
- **changefreq와 priority**: 검색 엔진에게 페이지 갱신 빈도와 중요도 힌트 제공

빌드 명령어에 sitemap 생성 추가:

```json
// package.json
{
  "scripts": {
    "build": "next build && next-sitemap"
  }
}
```

---

## 5. 검색 엔진 등록 및 검증

### Google Search Console과 Naver 웹마스터 도구

검색 엔진에 사이트를 등록하는 것도 중요합니다. `_document.tsx`에 검증 메타태그를 추가했습니다:

```typescript
// pages/_document.tsx
export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        {/* Google Search Console 검증 */}
        <meta
          name="google-site-verification"
          content="YOUR_GOOGLE_VERIFICATION_CODE"
        />
        {/* Naver 웹마스터 도구 검증 */}
        <meta
          name="naver-site-verification"
          content="YOUR_NAVER_VERIFICATION_CODE"
        />

        {/* 기타 메타태그 */}
        <meta name="format-detection" content="address=no, telephone=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**💡 인사이트**:

- **lang="ko"**: HTML 태그에 언어 설정으로 검색 엔진에 한국어 사이트임을 명시
- **format-detection**: 전화번호와 주소 자동 인식 비활성화 (불필요한 링크 생성 방지)

---

## 6. Analytics와 추적 설정

### Google Analytics와 GTM 통합

SEO 효과를 측정하기 위해 GA4와 Google Tag Manager를 설정했습니다:

```typescript
// pages/_document.tsx
<Script
  id="gtag-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
        page_path: window.location.pathname,
      });
    `,
  }}
/>

<Script
  id="gtm-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`,
  }}
/>

{/* Facebook Pixel */}
<Script
  id="fb-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
      fbq('track', 'PageView');
    `,
  }}
/>
```

### 페이지 뷰 추적

```typescript
// pages/_app.tsx
useEffect(() => {
  const handleRouteChange = (url: URL) => {
    gtag.pageview(url);
  };

  Router.events.on("routeChangeComplete", handleRouteChange);
  Router.events.on("hashChangeComplete", handleRouteChange);

  return () => {
    Router.events.off("routeChangeComplete", handleRouteChange);
    Router.events.off("hashChangeComplete", handleRouteChange);
  };
}, [Router.events]);
```

**💡 인사이트**:

- **strategy="afterInteractive"**: 페이지가 상호작용 가능해진 후 스크립트 로드 (성능 최적화)
- **Router.events로 SPA 페이지 뷰 추적**: Next.js의 클라이언트 사이드 라우팅에서도 페이지 뷰 정확히 추적

---

## 7. Open Graph 이미지 최적화

### 페이지별 맞춤 OG 이미지

각 페이지의 특성에 맞는 Open Graph 이미지를 설정하여 SNS 공유 시 클릭률을 높였습니다:

```typescript
// 일반 페이지
openGraph: {
  images: [
    {
      url: '/og.png',
      alt: '코공고 | 뷰티회사를 위한 채용의 시작',
    },
  ],
}

// 회사 페이지 (회사 로고 사용)
openGraph: {
  images: [
    {
      url: data.mainbrandImages.length > 0
        ? data.mainbrandImages[0]
        : '/og.png',
      alt: `코공고 | ${data.name}의 채용페이지`,
    },
  ],
}

// 인사이트 페이지 (컨텐츠별 이미지)
openGraph: {
  images: [
    {
      url: data.ogImageUrl,
      alt: data.altText,
    },
  ],
}
```

**💡 인사이트**:

- **동적 OG 이미지**: 페이지 콘텐츠에 맞는 이미지로 클릭률 상승
- **fallback 이미지**: 이미지가 없을 경우 기본 이미지 사용
- **alt 텍스트**: 접근성과 SEO를 위해 모든 이미지에 alt 설정

---

## 8. 키워드 전략

### 타겟 키워드 설정

뷰티 업계 채용이라는 니치 시장에 맞춰 키워드를 세밀하게 설정했습니다:

```typescript
// 기본 키워드
content: '뷰티업계 채용, 뷰티 회사 채용, 화장품 회사 취업,
          뷰티 브랜드 구인, 뷰티업계 인재 채용, ...'

// 페이지별 특화 키워드
// 연봉어택 페이지
content: '경력직 이직, 뷰티 업계 채용, 연봉 제안, 뷰티 이직 추천,
          코공고, 연봉어택, 커리어 제안, 아누아 연봉, 비나우 연봉, ...'

// 이력서 페이지
content: '이력서, 코공고 이력서, 이력서 만들기, 포트폴리오,
          뷰티 업계, 경력 이력서, 뷰티마케터 이력서, ...'
```

**💡 인사이트**:

- **롱테일 키워드**: "뷰티마케터 이력서", "아누아 연봉" 등 구체적인 키워드 타겟팅
- **서비스명 포함**: "코공고 이력서"처럼 브랜드 키워드 결합
- **페이지 맥락 고려**: 각 페이지의 목적에 맞는 키워드 선정

---

## 9. URL 구조 최적화

### 의미 있는 URL 설계

```
# 좋은 예
/company/[identifier]          # 회사 페이지
/cg/[gongoId]                  # 채용공고 상세
/insight/dbd/[id]              # 인사이트 아티클
/global/[countryId]            # 국가별 채용공고

# 나쁜 예 (피한 사례)
/page?id=123
/detail/[...params]
```

**💡 인사이트**:

- **의미 있는 경로**: URL만 봐도 페이지 내용을 유추 가능
- **짧고 간결**: 불필요하게 깊은 depth 피하기
- **동적 라우팅 활용**: Next.js의 동적 라우팅으로 깔끔한 URL 구조 유지

---

## 10. 성능 최적화 = SEO 최적화

### Core Web Vitals 개선

Google의 Core Web Vitals는 이제 검색 순위 요소입니다. cogonggo에서 적용한 최적화 전략:

1. **이미지 최적화**

```typescript
// next.config.js
images: {
  domains: [
    'your-bucket.s3.ap-northeast-2.amazonaws.com',
    'cdn.yourdomain.com',
    'images.yourdomain.com',
  ],
}
```

2. **폰트 최적화**

```typescript
// _document.tsx
<link
  rel="stylesheet"
  as="style"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
  crossOrigin="anonymous"
/>
```

3. **리다이렉트 최적화**

```typescript
// next.config.js
async redirects() {
  return [
    {
      source: '/register/company/:path*',
      destination: '/hr/admin/postings',
      permanent: false,
    },
  ];
}
```

**💡 인사이트**:

- **Next.js Image 컴포넌트**: 자동 최적화 및 lazy loading
- **폰트 preload**: 중요한 폰트는 미리 로드
- **permanent: false**: 임시 리다이렉트는 false로 설정 (SEO 안전)

---

## 11. SEO 최적화 결과

위에서 소개한 전략들을 실제로 적용한 결과, 의미 있는 성과를 얻을 수 있었습니다.

### 검색 엔진 색인 확대

**네이버 검색 색인 대폭 증가**

SEO 최적화를 적용한 후, 네이버 검색 엔진에 다수의 페이지가 성공적으로 색인되었습니다.

- sitemap.xml과 robots.txt 설정으로 크롤러가 사이트 구조를 효율적으로 파악
- ISR(Incremental Static Regeneration)을 통해 동적 페이지도 검색 엔진에 노출
- 각 페이지별 고유한 메타태그 설정으로 색인 품질 향상

### 롱테일 키워드 검색 노출

**특정 회사명 + 채용 키워드 검색 시 상위 노출**

더 의미 있는 성과는 **롱테일 키워드**에서의 검색 노출입니다. 예를 들어:

- **"아누아 채용"** 검색 시 코공고 페이지 노출
- **"비나우 채용"** 검색 시 코공고 페이지 노출
- 기타 뷰티 브랜드명 + "채용" 조합 키워드에서 지속적인 노출

**💡 인사이트**:

이는 다음과 같은 전략이 효과를 발휘한 결과입니다:

1. **페이지별 맞춤 키워드**: 각 회사 페이지에 해당 회사명을 포함한 키워드 설정

```typescript
// 예: 아누아 회사 페이지
additionalMetaTags: [
  {
    name: "keywords",
    content: "아누아 채용, 아누아 연봉, 아누아 취업, 뷰티업계 채용, ...",
  },
];
```

2. **의미 있는 URL 구조**: `/company/anua`처럼 회사명이 URL에 포함
3. **동적 메타태그**: 회사별 고유한 title, description 설정
4. **컨텐츠 품질**: 실제 채용 정보를 포함한 유의미한 콘텐츠 제공

### 검색 결과 캐러셀(Carousel) 표기

**채용공고 리스트가 캐러셀 형태로 노출**

가장 눈에 띄는 성과 중 하나는 검색 결과에서 코공고의 채용공고들이 **캐러셀(carousel) 형태**로 표기되는 것입니다. 이는 일반 검색 결과보다 훨씬 더 많은 시각적 공간을 차지하며, 사용자의 눈길을 끌어 클릭률을 크게 향상시킵니다.

![검색 결과 캐러셀 예시](/images/cogongo-carousel-example.png)
_실제 네이버 검색 결과에서 코공고의 채용공고들이 캐러셀 형태로 노출되는 모습_

**캐러셀 표기를 위한 핵심 요소:**

1. **일관된 페이지 구조**: 모든 채용공고 페이지가 동일한 구조와 메타데이터 패턴 유지

```typescript
// 모든 채용공고 페이지에 일관된 SEO 설정
<NextSeo
  title={`${data.position} - ${data.companyName} | 코공고`}
  description={data.jobDescription}
  openGraph={{
    type: "website",
    url: `${process.env.NEXT_PUBLIC_COGONGGO}cg/${id}`,
    title: `${data.position} - ${data.companyName}`,
    images: [{ url: data.companyLogo }],
  }}
/>
```

2. **sitemap을 통한 명확한 URL 구조**: 검색 엔진이 관련 페이지들을 그룹으로 인식
3. **고품질 컨텐츠**: 각 채용공고가 충분한 정보와 고유한 콘텐츠 포함
4. **빠른 페이지 로딩**: Core Web Vitals 최적화로 사용자 경험 개선

**캐러셀 표기의 장점:**

- **높은 가시성**: 일반 검색 결과 대비 3-5배 더 큰 영역 차지
- **클릭률(CTR) 향상**: 여러 옵션을 한 번에 보여줘 사용자 관심 유도
- **브랜드 권위 강화**: 캐러셀 형태로 노출되는 것 자체가 신뢰도 향상

### 비즈니스 임팩트

이러한 SEO 성과는 실제 비즈니스 지표로 연결되었습니다:

- **자연 유입(Organic Traffic) 증가**: 검색을 통한 사이트 방문 증가
- **타겟 유저 확보**: "회사명 + 채용" 검색은 채용 의도가 명확한 고품질 유저
- **브랜드 인지도 향상**: 다양한 키워드에서 노출되며 코공고 브랜드 인지도 상승

---

## 마치며: SEO는 지속적인 과정

cogonggo를 개발하면서 배운 가장 중요한 교훈은 **SEO는 한 번 설정하고 끝나는 게 아니라는 것**입니다.

### 체크리스트

프로젝트에 SEO를 적용할 때 참고할 수 있는 체크리스트입니다:

- [ ] next-seo 설정 완료
- [ ] DefaultSeo와 페이지별 NextSeo 적용
- [ ] sitemap.xml 생성 (next-sitemap)
- [ ] robots.txt 설정
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터 도구 등록
- [ ] Open Graph 이미지 설정
- [ ] 키워드 리서치 및 적용
- [ ] getStaticProps/getStaticPaths 또는 getServerSideProps 적용
- [ ] Analytics 설정 (GA4, GTM)
- [ ] Core Web Vitals 모니터링
- [ ] 모바일 최적화 확인
- [ ] HTTPS 적용
- [ ] 정기적인 SEO 점검

### 지속적인 개선

1. **Google Search Console 모니터링**: 검색 성능, 크롤링 에러 정기 확인
2. **Analytics 분석**: 유입 키워드, 이탈률 등 지표 분석
3. **컨텐츠 업데이트**: 검색 의도에 맞는 콘텐츠 지속 개선
4. **기술적 SEO**: Core Web Vitals, 구조화된 데이터 등 최신 트렌드 반영

---

## 참고 자료

- [Next.js SEO 공식 문서](https://nextjs.org/learn/seo/introduction-to-seo)
- [next-seo 라이브러리](https://github.com/garmeeh/next-seo)
- [next-sitemap 라이브러리](https://github.com/iamvishnusankar/next-sitemap)
- [Google Search Console](https://search.google.com/search-console)
- [Core Web Vitals](https://web.dev/vitals/)

---
