# ✈️ Baggage Calculator - Frontend

Next.js(App Router) 기반 항공 수하물 무게 계산기 프론트엔드입니다.
GraphQL API를 통해 데이터를 조회하고, Redux Toolkit과 React Query를 역할 분리하여 상태를 관리합니다.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**
  - Client State: Redux Toolkit
  - Server State: React Query
- **API Communication**: GraphQL (custom gql client)
- **Styling**: CSS (inline 기반 UI 설계)
- **Architecture**: FSD 기반 계층 구조

---

## 📂 프로젝트 구조

```
src
├── app
├── entities
├── features
├── shared
└── widgets
```

---

### 상태 관리 전략

- **React Query** → 서버 데이터 캐싱/동기화
- **Redux Toolkit** → 선택된 아이템, 제한 프리셋 등 UI 상태 관리
- 역할 분리를 통해 책임을 명확히 구분

---

## 🔌 GraphQL 연동 구조

- 모든 요청은 `shared/api/gqlClient.ts`에서 처리
- queryKey는 `shared/api/queryKeys.ts`에서 상수화
- 로딩/에러는 `QueryBoundary`로 공통 처리

---

## 🚀 실행 방법

npm install
npm run dev

환경 변수 (.env.local)

NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

---

## 📦 빌드

npm run build
