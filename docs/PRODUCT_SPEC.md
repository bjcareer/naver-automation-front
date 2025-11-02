# 주식 뉴스 애그리게이터 - 제품 명세서

## 📋 프로젝트 개요

### 핵심 가치 제안
개별 뉴스 링크 홍보가 아닌, **자체 뉴스 애그리게이터 사이트를 허브화**하여 사용자 트래픽을 집중시키고, 백엔드에서 발급한 프로모션 링크를 통해 뉴스 접근을 추적/수익화하는 플랫폼

### 타겟 사용자
- **연령대**: 20-30대
- **관심사**: 주식 투자
- **행동 패턴**: 빠른 정보 소비, 모바일/데스크톱 병행

### 비즈니스 플로우
```
[SEO/SNS 유입] → [사이트 방문] → [주식 뉴스 피드] → [프로모션 링크 클릭] → [원본 뉴스]
                                      ↑ 무한 스크롤            ↑ 추적/수익화
```

---

## 🎯 핵심 요구사항

### 필수 기능 (MVP)
1. ✅ **주식 뉴스 피드 리스트**
   - 리스트형 레이아웃 (카드형 X)
   - 무한 스크롤
   - 뉴스 제목, 요약, 출처, 날짜 표시

2. ✅ **클라이언트 필터링**
   - 검색 기능 (제목, 요약)
   - 정렬 (최신순 기본)

3. ✅ **SEO 최적화**
   - Server-Side Rendering
   - Open Graph 메타데이터 (SNS 공유)
   - Sitemap, robots.txt

4. ✅ **프로모션 링크 연동**
   - 백엔드 발급 링크 사용
   - 클릭 시 원본 뉴스로 이동

### 제외 기능 (MVP 외)
- ❌ 유저 로그인/회원가입 (단일 운영자)
- ❌ 댓글/커뮤니티 기능
- ❌ 북마크/저장 기능 (향후 추가)
- ❌ 다크모드 (향후 추가)
- ❌ 유머 카테고리 (주식만 집중)

---

## 🔌 백엔드 API 연동

### 기존 백엔드 (NaverAutoResponder)

#### 엔드포인트
```typescript
GET /news/:userId

Response:
{
  userId: string
  total: number
  links: NewsLinkDto[]
}

NewsLinkDto {
  id: string
  title: string
  originalLink: string      // 원본 뉴스 URL
  promotionLink: string      // 발급된 프로모션 링크
  summary: string
  source: SourceType         // 'STOCK'
  status: LinkStatus
  createdAt: string          // ISO 8601
}
```

### 프론트엔드 요구사항
#### 페이징 API 필요 (백엔드 수정 요청)
무한 스크롤을 위해 페이징 파라미터 추가 필요:
```typescript
GET /news/:userId?limit=30&cursor=lastId

Response:
{
  userId: string
  total: number
  links: NewsLinkDto[]
  nextCursor: string | null  // 다음 페이지 커서
  hasMore: boolean           // 추가 데이터 존재 여부
}
```

**대안** (백엔드 수정 불가 시):
- 전체 데이터 로드 후 프론트에서 가상 스크롤 구현
- 단, 데이터가 수백 개 이하일 때만 권장

---

## 🏗️ 기술 스택

### Frontend
```yaml
Framework: Next.js 15 App Router
  Why: SSR + SEO + 무한 스크롤 최적화

Language: TypeScript
  Why: 타입 안정성, 백엔드 DTO와 인터페이스 공유

Styling: Tailwind CSS + Radix UI
  Why: 빠른 개발, 접근성, 기존 자산 재사용

Data Fetching: TanStack Query v5
  Why:
    - 무한 스크롤 (useInfiniteQuery)
    - 자동 캐싱 및 리페칭
    - 로딩/에러 상태 관리

State Management: Zustand (optional)
  Why: 검색/필터 상태 관리 (필요시)

HTTP Client: Axios
  Why: 기존 프로젝트에서 사용 중

Icons: Lucide React
  Why: 기존 프로젝트에서 사용 중
```

### Backend (기존)
- NestJS
- Prisma ORM
- PostgreSQL

### Deployment
```yaml
Frontend: Vercel
  Why: Next.js 최적화, 자동 배포, 엣지 네트워크

Backend: 기존 인프라 사용
```

---

## 🎨 UI/UX 설계

### 레이아웃 구조
```
┌─────────────────────────────────┐
│  Header                         │
│  - 로고/사이트명                 │
│  - 검색바                        │
├─────────────────────────────────┤
│  News Feed (List View)          │
│  ┌───────────────────────────┐  │
│  │ [아이콘] 제목              │  │
│  │ 요약 텍스트 (1-2줄)       │  │
│  │ 출처 · 날짜               │  │
│  └───────────────────────────┘  │
│  ┌───────────────────────────┐  │
│  │ [아이콘] 제목              │  │
│  │ 요약 텍스트               │  │
│  │ 출처 · 날짜               │  │
│  └───────────────────────────┘  │
│  ...                            │
│  [Loading Spinner] ← 무한스크롤 │
└─────────────────────────────────┘
```

### 컴포넌트 구조
```
app/
├─ layout.tsx           # 글로벌 레이아웃
├─ page.tsx             # 메인 피드 (SSR)
├─ components/
│  ├─ NewsFeed.tsx      # 뉴스 피드 컨테이너
│  ├─ NewsListItem.tsx  # 개별 뉴스 아이템
│  ├─ SearchBar.tsx     # 검색 입력
│  ├─ LoadingSpinner.tsx
│  └─ InfiniteScrollTrigger.tsx
└─ lib/
   ├─ api.ts            # API 클라이언트
   └─ types.ts          # TypeScript 타입
```

### 반응형 디자인
- **모바일 우선** (Mobile-first)
- Breakpoints:
  - `sm`: 640px (모바일)
  - `md`: 768px (태블릿)
  - `lg`: 1024px (데스크톱)

---

## 🚀 구현 계획

### Phase 1: 기본 구조 (1주)
- [x] Next.js 15 프로젝트 셋업
- [ ] Tailwind + Radix UI 마이그레이션
- [ ] 백엔드 API 연동 (TanStack Query)
- [ ] 리스트형 뉴스 피드 UI
- [ ] 무한 스크롤 구현

### Phase 2: 기능 완성 (1주)
- [ ] 검색 기능
- [ ] 클라이언트 필터링/정렬
- [ ] SEO 최적화 (메타태그, OG)
- [ ] 로딩/에러 상태 UI
- [ ] 반응형 디자인 완성

### Phase 3: 최적화 (1주)
- [ ] 성능 최적화 (이미지 lazy loading, 가상 스크롤)
- [ ] 접근성 개선 (ARIA, 키보드 네비게이션)
- [ ] Analytics 연동 (Google Analytics)
- [ ] 배포 및 도메인 연결

---

## 📊 성능 목표

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 최적화 전략
1. **SSR로 초기 30개 뉴스 렌더** (SEO + 빠른 FCP)
2. **이미지 lazy loading** (뉴스 썸네일)
3. **TanStack Query 캐싱** (네트워크 요청 최소화)
4. **코드 스플리팅** (Next.js 자동)
5. **CDN 활용** (Vercel Edge Network)

---

## 🔒 SEO 전략

### On-Page SEO
```html
<!-- 메타 태그 -->
<title>주식 뉴스 모음 - 실시간 주식 정보</title>
<meta name="description" content="20-30대를 위한 주식 뉴스 애그리게이터. 실시간 급등주, 투자 정보, 시장 분석을 한눈에." />

<!-- Open Graph (SNS 공유) -->
<meta property="og:title" content="주식 뉴스 모음" />
<meta property="og:description" content="실시간 주식 뉴스와 투자 정보" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

### Technical SEO
- ✅ Sitemap.xml 자동 생성
- ✅ robots.txt 설정
- ✅ 구조화된 데이터 (JSON-LD)
- ✅ 모바일 친화적
- ✅ 페이지 속도 최적화

### Content SEO
- **타겟 키워드**: "주식 뉴스", "실시간 주식", "급등주", "투자 정보"
- **롱테일 키워드**: "20대 주식 투자", "주식 뉴스 모음", "실시간 증시"

---

## 🎯 KPI 및 측정

### 사용자 지표
- **일일 방문자 수** (DAU)
- **페이지뷰** (총 뉴스 조회 수)
- **평균 세션 시간**
- **이탈률** (Bounce Rate)

### 비즈니스 지표
- **프로모션 링크 클릭률** (CTR)
- **사용자당 클릭 수**
- **검색 유입 비율**
- **SNS 공유 수**

### 기술 지표
- **페이지 로드 시간**
- **무한 스크롤 성능**
- **API 응답 속도**
- **에러율**

---

## 🚨 리스크 및 대응

### 기술 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| 백엔드 API 페이징 미지원 | 중 | 전체 로드 후 가상 스크롤 구현 |
| 대량 데이터 성능 저하 | 중 | React Virtual 적용 |
| SEO 크롤링 이슈 | 고 | SSR 철저히 구현, 테스트 |

### 비즈니스 리스크
| 리스크 | 영향도 | 대응 방안 |
|--------|--------|-----------|
| 초기 트래픽 부족 | 고 | SNS 바이럴, 키워드 광고 |
| 뉴스 콘텐츠 저작권 | 중 | 요약만 표시, 원문 링크 제공 |
| 프로모션 링크 차단 | 중 | 링크 형식 최적화 |

---

## 📝 추가 고려사항

### 향후 확장 기능
- [ ] 유머 카테고리 추가
- [ ] 사용자 북마크/저장 기능
- [ ] 댓글/커뮤니티
- [ ] 푸시 알림 (급등주, 이슈)
- [ ] 개인화 추천 알고리즘
- [ ] 다크모드

### 기술 부채 관리
- 정기적인 리팩토링 (월 1회)
- 성능 모니터링 (주 1회)
- 의존성 업데이트 (월 1회)
- 코드 리뷰 프로세스

---

## ✅ 최종 승인 체크리스트

### 요구사항 확인
- [x] 리스트형 레이아웃
- [x] 무한 스크롤
- [x] 클라이언트 필터링
- [x] SEO 최적화
- [x] 주식 뉴스만 (단일 카테고리)
- [x] 단일 유저 (로그인 불필요)
- [x] 백엔드 링크 발급 시스템 연동

### 기술 스택 확인
- [x] Next.js 15 App Router
- [x] TypeScript
- [x] Tailwind CSS + Radix UI
- [x] TanStack Query
- [x] 기존 백엔드 API 활용

---

**문서 버전**: 1.0
**작성일**: 2025-11-02
**상태**: 승인 대기
