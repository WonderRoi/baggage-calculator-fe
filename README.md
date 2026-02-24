# ✈️ Baggage Calculator - Frontend

Next.js(App Router) 기반 항공 수하물 무게 계산기 프론트엔드입니다.
GraphQL API를 통해 데이터를 조회하고, Redux Toolkit과 React Query를 역할 분리하여 상태를 관리합니다.

---

## 🛠 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Redux Toolkit (Client State)
- React Query (Server State)
- GraphQL (Custom gql client)
- FSD 기반 계층 구조

---

## 📂 프로젝트 구조

src
├── app
├── entities
├── features
├── shared
└── widgets

---

## 🚀 실행 방법

npm install
npm run dev

환경 변수 (.env.local)

NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql

---

## 📦 빌드

npm run build

