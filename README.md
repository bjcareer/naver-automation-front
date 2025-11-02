# 📈 주식 뉴스 애그리게이터

20-30대 주식 투자자를 위한 뉴스 애그리게이터 플랫폼

## 🎯 주요 기능

- ✅ **주식 뉴스 피드**: 실시간 주식 관련 뉴스 리스트
- ✅ **검색 기능**: 제목/요약 기반 클라이언트 검색
- ✅ **프로모션 링크**: 백엔드 발급 추적 링크 연동
- ✅ **SEO 최적화**: Server-Side Rendering, Open Graph 메타데이터
- ✅ **반응형 디자인**: 모바일/데스크톱 모두 지원

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn
- 백엔드 API 서버 (NaverAutoResponder)

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_USER_ID=1
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 📁 프로젝트 구조

```
automation-front/
├── app/
│   ├── components/
│   │   ├── NewsFeed.tsx       # 뉴스 피드 컨테이너
│   │   ├── NewsListItem.tsx   # 개별 뉴스 아이템
│   │   └── SearchBar.tsx      # 검색 입력
│   ├── lib/
│   │   ├── api.ts             # API 클라이언트
│   │   └── types.ts           # TypeScript 타입
│   ├── layout.tsx             # 글로벌 레이아웃
│   ├── page.tsx               # 메인 페이지
│   ├── providers.tsx          # React Query Provider
│   └── globals.css            # 글로벌 스타일
├── docs/
│   └── PRODUCT_SPEC.md        # 제품 명세서
├── public/                    # 정적 파일
├── .env.local                 # 환경 변수 (git ignored)
├── next.config.ts             # Next.js 설정
├── tailwind.config.js         # Tailwind CSS 설정
└── tsconfig.json              # TypeScript 설정
```

## 🔌 백엔드 API 연동

### 엔드포인트

**뉴스 목록 조회**
```
GET /news/:userId

Response:
{
  userId: string
  total: number
  links: [
    {
      id: string
      title: string
      originalLink: string
      promotionLink: string
      summary: string
      source: string
      status: string
      createdAt: string
    }
  ]
}
```

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Data Fetching**: TanStack Query v5
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📝 개발 가이드

### 새 컴포넌트 추가

1. `app/components/` 디렉토리에 컴포넌트 파일 생성
2. 클라이언트 컴포넌트의 경우 상단에 `'use client'` 추가
3. TypeScript 타입은 `app/lib/types.ts`에 정의

### API 엔드포인트 추가

1. `app/lib/api.ts`에 API 함수 추가
2. TanStack Query의 `useQuery` 또는 `useMutation` 사용
3. 타입 정의 업데이트

### 스타일링

- Tailwind CSS 유틸리티 클래스 사용
- CSS 변수는 `app/globals.css`에 정의
- 컴포넌트별 커스텀 스타일은 인라인 또는 CSS 모듈 사용

## 🚀 배포

### Vercel (권장)

1. GitHub/GitLab 리포지토리에 푸시
2. [Vercel](https://vercel.com)에서 Import
3. 환경 변수 설정 (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_USER_ID`)
4. 자동 배포

### 기타 플랫폼

```bash
npm run build
```

생성된 `.next` 디렉토리를 배포

## 📊 성능 최적화

- **SSR**: 초기 페이지 Server-Side Rendering
- **이미지 최적화**: Next.js Image 컴포넌트 (향후 추가)
- **코드 스플리팅**: Next.js 자동 처리
- **캐싱**: TanStack Query 자동 캐싱 (staleTime: 1분)

## 🔍 SEO

- Server-Side Rendering으로 크롤러 최적화
- Open Graph 메타데이터 (SNS 공유)
- Semantic HTML 사용
- Sitemap/robots.txt (향후 추가)

## 🐛 트러블슈팅

### 백엔드 API 연결 실패

- `.env.local`의 `NEXT_PUBLIC_API_URL` 확인
- 백엔드 서버 실행 상태 확인
- CORS 설정 확인

### 빌드 에러

```bash
rm -rf .next node_modules
npm install
npm run build
```

### 타입 에러

```bash
npm run lint
```

## 📄 라이선스

MIT License

## 👥 기여

이슈 및 PR 환영합니다!

---

**문서 버전**: 1.0
**최종 업데이트**: 2025-11-02
