# AWS Amplify Gen 2 배포 가이드

## 1. AWS Amplify 콘솔 접속

1. https://console.aws.amazon.com/amplify 접속
2. 리전 확인: **ap-northeast-2 (Seoul)**

## 2. 새 앱 생성

### Step 1: Create new app
- **"Create new app"** 버튼 클릭
- **"Host web app"** 선택

### Step 2: GitHub 연결
- **"GitHub"** 선택
- GitHub 계정 인증 (이미 연결되어 있다면 스킵)
- **Repository**: `bjcareer/naver-automation-front` 선택
- **Branch**: `main` 선택
- **Next** 클릭

### Step 3: 빌드 설정 확인
자동 감지된 설정을 확인하세요:

```yaml
Framework: Next.js - SSR
Build command: npm run build
Output directory: .next
```

- **amplify.yml** 파일이 자동 감지됨
- 수정 필요 없음 → **Next** 클릭

### Step 4: 환경 변수 설정

**Environment variables** 섹션에서 **Add environment variable** 클릭:

| Key | Value | 설명 |
|-----|-------|------|
| `NEXT_PUBLIC_API_URL` | 백엔드 API URL | 예: `https://api.example.com` |
| `NEXT_PUBLIC_USER_ID` | 사용자 ID | 백엔드에서 사용하는 사용자 ID |

**Next** 클릭

### Step 5: 앱 설정 확인

- **App name**: `naver-automation-front-gen2` (또는 원하는 이름)
- **Platform**: `WEB_COMPUTE` (자동 선택됨 - 중요!)
- **Service role**: 자동 생성 또는 기존 역할 선택

**Save and deploy** 클릭

## 3. 배포 진행 상황 확인

배포는 약 3-5분 소요됩니다:

1. **Provision** - 리소스 생성
2. **Build** - Next.js 빌드
3. **Deploy** - Lambda 함수 배포
4. **Verify** - 배포 검증

## 4. 배포 완료 후 테스트

### 임시 URL 확인
- 배포 완료 후 생성된 URL 확인 (예: `https://main.dxxxxx.amplifyapp.com`)
- 브라우저에서 접속 테스트

### 테스트 체크리스트
- [ ] 홈페이지 로드 (`/`)
- [ ] OG 이미지 표시 확인
- [ ] API 라우트 작동 (`/api/og-image`)
- [ ] 환경 변수 적용 확인

## 5. 커스텀 도메인 연결

테스트 완료 후:

1. **Domain management** 메뉴 클릭
2. **Add domain** 클릭
3. `smartlifeautomation.com` 입력
4. DNS 레코드 업데이트 (자동 안내됨)
5. SSL 인증서 자동 생성 (약 10-15분)

### 기존 Gen 1 앱에서 도메인 제거

**중요**: 새 Gen 2 앱이 정상 작동한 후:
1. 기존 Gen 1 앱 (`naver-automation-front`) 선택
2. **Domain management** → 도메인 제거
3. 새 Gen 2 앱에 도메인 추가

## 6. 빌드 설정 확인 (선택사항)

**App settings → Build settings**에서 확인:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production
        - echo "NEXT_PUBLIC_USER_ID=$NEXT_PUBLIC_USER_ID" >> .env.production
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

## 7. 트러블슈팅

### 빌드 실패 시
- **Logs** 탭에서 오류 확인
- 환경 변수 설정 확인
- `amplify.yml` 파일 확인

### 404 오류 발생 시
- **Platform**이 `WEB_COMPUTE`인지 확인 (Gen 2 필수)
- Lambda 함수 생성 여부 확인 (Backend resources 탭)
- `output: 'standalone'` 설정 확인 (next.config.ts)

### API 라우트 작동 안 함
- Lambda 함수 로그 확인 (CloudWatch Logs)
- 환경 변수가 Lambda에 전달되었는지 확인

## 8. 성공 확인

✅ Gen 2 배포 성공 확인:
- URL 접속 시 페이지 정상 로드
- 개발자 도구 Network 탭에서 API 호출 확인
- OG 이미지가 표시됨
- Lambda 함수가 백엔드 리소스에 생성됨

## 참고 자료

- [AWS Amplify Gen 2 문서](https://docs.amplify.aws/nextjs/)
- [Next.js Standalone 모드](https://nextjs.org/docs/app/api-reference/next-config-js/output)
- [Amplify 환경 변수](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
