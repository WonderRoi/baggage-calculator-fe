"use client";

import type { Item, LimitPreset } from "@/features/baggage/lib/types";
import { calcTotalWeight, calcLimitWeight, calcOverWeight, calcRatio, calcStatus } from "@/features/baggage/lib/calc";

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
  const totalKg = calcTotalWeight(items, selectedMap);
  const limitKg = calcLimitWeight(presets, limitId);

  const overKg = calcOverWeight(totalKg, limitKg);
  const status = calcStatus(totalKg, limitKg); // "OK" | "OVER"
  const ok = status === "OK";

  const ratio = calcRatio(totalKg, limitKg);
  const percent = limitKg > 0 ? Math.round(ratio * 100) : 0;

  const remainKg = Math.max(0, limitKg - totalKg);

  return (
    <div
      style={{
        borderRadius: 16,
        padding: 16,
        background: "#ffffff",
        border: "1px solid rgba(15, 23, 42, 0.10)",
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>총 무게</div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", letterSpacing: -0.4, lineHeight: 1 }}>
              {totalKg}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#64748b" }}>kg</div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>제한</div>
          <div style={{ marginTop: 6, display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: 6 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: -0.2 }}>{limitKg}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#64748b" }}>kg</div>
          </div>

          {/* Status badge */}
          <div
            style={{
              marginTop: 10,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 900,
              border: ok ? "1px solid rgba(34,197,94,0.20)" : "1px solid rgba(239,68,68,0.22)",
              background: ok ? "rgba(34,197,94,0.10)" : "rgba(239,68,68,0.10)",
              color: ok ? "#166534" : "#991b1b",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: ok ? "#22c55e" : "#ef4444",
              }}
            />
            {ok ? "적합" : "초과"}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ marginTop: 14, height: 1, background: "rgba(15, 23, 42, 0.06)" }} />

      {/* Detail row */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 13, color: "#334155", fontWeight: 800 }}>
          {ok ? (
            <>
              남은 무게 <span style={{ color: "#0f172a" }}>{remainKg}kg</span>
            </>
          ) : (
            <>
              초과 무게 <span style={{ color: "#0f172a" }}>{overKg}kg</span>
            </>
          )}
        </div>

        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 800 }}>
          {limitKg > 0 ? `${totalKg} / ${limitKg}kg · ${percent}%` : "제한을 선택하세요"}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 10, height: 10, borderRadius: 999, background: "rgba(15, 23, 42, 0.06)" }}>
        <div
          style={{
            width: `${limitKg > 0 ? Math.min(100, percent) : 0}%`,
            height: "100%",
            borderRadius: 999,
            background: ok ? "#0f172a" : "#ef4444",
          }}
        />
      </div>
    </div>
  );
}
