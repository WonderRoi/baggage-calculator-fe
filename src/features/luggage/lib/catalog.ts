import type { CatalogItem } from "./types";

export const CATALOG_ITEMS: CatalogItem[] = [
  { id: "carry-on", name: "기내용 캐리어", weightKg: 3.0, icon: "🧳" },
  { id: "laptop", name: "노트북", weightKg: 1.5, icon: "💻" },
  { id: "clothes", name: "옷(묶음)", weightKg: 2.0, icon: "👕" },
  { id: "shoes", name: "신발", weightKg: 1.2, icon: "👟" },
  { id: "toiletry", name: "세면도구", weightKg: 0.8, icon: "🧴" },
  { id: "charger", name: "충전기", weightKg: 0.3, icon: "🔌" },
  { id: "camera", name: "카메라", weightKg: 0.9, icon: "📷" },
  { id: "book", name: "책", weightKg: 0.6, icon: "📘" },
  { id: "jacket", name: "겉옷", weightKg: 1.0, icon: "🧥" },
  { id: "misc", name: "기타 소지품", weightKg: 0.7, icon: "📦" },
];
