Frontend + Backend + Database를 모두 포함한 **미니 풀스택 데모 프로젝트**입니다.  
항공 수하물 규정을 가정하여, 사용자가 수하물 품목을 선택하면 **총 무게 계산**과 **무게 제한 초과 여부를 실시간으로 시각화**합니다.

---

## 📌 프로젝트 목표

- 수하물 품목 선택/해제 UX 구현
- 선택된 품목 무게 합산
- 무게 제한 프리셋 기반 상태 계산
- 상태 변화에 따른 즉각적인 UI 피드백
- Frontend / Backend / DB 구조 분리 및 연동 경험

---

## 🎯 핵심 기능

### 🎒 수하물 선택

- 총 10개 품목 (아이콘 또는 이미지 카드)
- 카드 클릭으로 담기 / 제외 토글

### ⚖️ 무게 계산

- 선택된 품목들의 무게를 실시간 합산

### 📏 무게 제한 프리셋

- 3가지 무게 제한 제공
  - 예: 7kg / 10kg / 15kg
- 제한 변경 시 즉시 기준 반영

### 🚦 상태 표시

- 총 무게 vs 제한 무게 비교
- 상태에 따라 UI 즉시 변경
  - OK / OVER
- 배지, 색상, 게이지 등 시각적 피드백

---

## 🧩 기술 스택

### Frontend

- Next.js (App Router)
- React
- TypeScript

### State Management

- Redux Toolkit
  - 도메인 상태 관리
  - 파생 상태 계산 (selectors)
- React Query
  - GraphQL 데이터 패칭
  - 캐싱 및 동기화
- Zustand (예정)
  - 경량 UI 상태 관리

### Backend

- Node.js
- GraphQL (Apollo Server)

### Database

- MySQL
- 초기 데이터 seed 구성

---

## 🖥 Frontend 설계 (핵심)

### Redux State

```ts
selectedItemIds: number[]
selectedLimitPresetId: number
```
