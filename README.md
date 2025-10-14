# 네이버 지식iN 자동 답변 플랫폼 - Frontend

React + TypeScript + Shadcn/ui로 구현된 네이버 자동 답변 시스템의 프론트엔드입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에서 VITE_LAMBDA_URL을 실제 Lambda URL로 변경
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 으로 접속

### 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── ui/                      # Shadcn/ui 기본 컴포넌트
│   ├── AutomationForm.tsx       # 메인 입력 폼
│   └── ResultDisplay.tsx        # 결과 표시
├── services/
│   └── lambdaApi.ts             # Lambda API 클라이언트
├── types/
│   └── index.ts                 # TypeScript 타입 정의
├── lib/
│   └── utils.ts                 # 유틸리티 함수
├── App.tsx                      # 메인 앱 컴포넌트
└── main.tsx                     # 엔트리 포인트
```

## 🔧 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **Shadcn/ui** - UI 컴포넌트 라이브러리
- **Tailwind CSS** - 스타일링
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증
- **Axios** - HTTP 클라이언트

## 🎨 주요 기능

- 네이버 계정 정보 입력 (ID/비밀번호)
- 검색 모드 선택 (키워드 기반 / 최신순)
- 최대 답변 수 설정
- 실시간 로딩 상태 표시
- 성공/실패 결과 표시

## 🔒 보안

- 비밀번호는 메모리에만 저장 (localStorage 사용 안 함)
- HTTPS 통신 권장
- Lambda API URL은 환경 변수로 관리

## 📝 환경 변수

`.env` 파일에 다음 변수를 설정하세요:

```env
# 질문 검색 Lambda URL (로그인 불필요)
VITE_SEARCH_API_URL=https://your-search-lambda-url.amazonaws.com

# 답변 등록 Lambda URL (로그인 필요)
VITE_ANSWER_API_URL=https://your-answer-lambda-url.amazonaws.com
```

## 🔗 관련 프로젝트

- [NaverAutoResponder](../NaverAutoResponder) - 백엔드 자동화 로직

## 📄 라이선스

MIT
