"use client";

import type { Item, LimitPreset } from "@/features/baggage/lib/types";
import { calcTotalWeight, calcLimitWeight } from "@/features/baggage/lib/calc";

export function ResultPanel({
  items,
  presets,
  selectedMap,
  limitId,
}: {
  items: Item[];
  presets: LimitPreset[];
  selectedMap: Record<string, true>;
  limitId: string;
}) {
  // ✅ kg 정수 기준: Item.weight, LimitPreset.maxWeight 모두 "kg" Int라고 가정
  const totalKg = calcTotalWeight(items, selectedMap);
  const limitKg = calcLimitWeight(presets, limitId);

  const overKg = Math.max(0, totalKg - limitKg);
  const ok = totalKg <= limitKg;

  // limitKg가 0일 수 있으니 방어
  const ratio = limitKg > 0 ? Math.min(1, totalKg / limitKg) : 0;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 14, padding: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ opacity: 0.7 }}>총 무게</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{totalKg}kg</div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ opacity: 0.7 }}>제한</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{limitKg}kg</div>
        </div>
      </div>

      <div style={{ marginTop: 10, opacity: 0.85 }}>상태: {ok ? "적합" : `초과 +${overKg}kg`}</div>

      <div style={{ marginTop: 10, height: 10, background: "#eee", borderRadius: 999 }}>
        <div
          style={{
            width: `${Math.round(ratio * 100)}%`,
            height: "100%",
            background: "#111",
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  );
}
