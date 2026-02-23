import type { Item, LimitPreset } from "@/features/baggage/lib/types";

/**
 * 선택된 아이템들의 총 무게 계산 (kg 기준)
 */
export function calcTotalWeight(items: Item[], selectedMap: Record<string, true>): number {
  return items.reduce((sum, item) => (selectedMap[item.id] ? sum + item.weight : sum), 0);
}

/**
 * 선택된 제한 프리셋의 최대 무게 조회 (kg 기준)
 */
export function calcLimitWeight(presets: LimitPreset[], limitId: string): number {
  return presets.find((p) => p.id === limitId)?.maxWeight ?? 0;
}

/**
 * 초과 무게 계산
 */
export function calcOverWeight(totalKg: number, limitKg: number): number {
  return Math.max(0, totalKg - limitKg);
}

/**
 * 상태 판별
 */
export function calcStatus(totalKg: number, limitKg: number): "OK" | "OVER" {
  return totalKg <= limitKg ? "OK" : "OVER";
}

/**
 * 진행률 계산 (0 ~ 1)
 */
export function calcRatio(totalKg: number, limitKg: number): number {
  if (limitKg <= 0) return 0;
  return Math.min(1, totalKg / limitKg);
}
