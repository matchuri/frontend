## 1. 기술스택

### Framework

* Next.js
* React
* TypeScript

### State Management

* Jotai

### Styling

* Tailwind CSS

### API & Network

* Fetch API
* Server-Sent Events (SSE)

### Map

* Kakao Map API

### Development Tools

* ESLint
* Prettier

---

## 2. 프로젝트 구조

```text
src
├── app                          # App Router 페이지
│
├── features                     # 기능(도메인) 단위 모듈
│   ├── auth
│   ├── group
│   ├── groupRecommendation
│   ├── home
│   ├── locationSetting
│   ├── personalRecommendation
│   ├── settings
│   └── ...
│
├── infrastructure               # 공통 인프라
│   ├── config
│   ├── http
│   └── sse
│
└── ui                           # 공통 UI
    ├── components
    └── styles

```

### Feature 구조

```text
features/{feature}
│
├── application
│   ├── atoms
│   ├── hooks
│   ├── selectors
│   ├── store
│   └── usecase
│
├── domain
│   ├── model
│   └──  state
│
├── infrastructure
│   ├── api
│   ├── mapper
│   └── sse
│
└── ui
    ├── components
    └── config
```

---

## 3. 실행환경

| 항목      | 버전      |
| -------  | -------  |
| Node.js  | 22.x 이상 |
| npm      | 10.x 이상 |

### 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성합니다.

```env
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_KAKAO_MAP_APP_KEY=
```

---

## 4. 로컬 실행 방법

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```
http://localhost:3000
```

### Production Build

```bash
npm run build
```

### Production 실행

```bash
npm run start
```
