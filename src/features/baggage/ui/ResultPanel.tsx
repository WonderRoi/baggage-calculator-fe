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

  const remainingKg = Math.max(0, limitKg - totalKg);

  const accent = ok ? "#16a34a" : "#ef4444"; // green / red
  const accentSoft = ok ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.14)";
  const textMain = "#0f172a";
  const textSub = "#64748b";

  return (
    <div
      style={{
        borderRadius: 20,
        padding: 16,
        background:
          "radial-gradient(1200px 400px at 20% 0%, rgba(56,189,248,0.14), transparent 60%), radial-gradient(900px 380px at 80% 10%, rgba(99,102,241,0.14), transparent 55%), #ffffff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, color: textSub, fontWeight: 700, letterSpacing: 0.2 }}>현재 수하물</div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 900, color: textMain, letterSpacing: -0.6, lineHeight: 1 }}>
              {totalKg}
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: textSub }}>kg</div>
          </div>

          <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                borderRadius: 999,
                border: `1px solid ${accentSoft}`,
                background: accentSoft,
                color: accent,
                fontSize: 12,
                fontWeight: 900,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: accent,
                  boxShadow: `0 0 0 4px ${accentSoft}`,
                }}
              />
              {ok ? "적합" : `초과 +${overKg}kg`}
            </span>

            <span style={{ fontSize: 12, color: textSub, fontWeight: 700 }}>
              제한 {limitKg}kg
              {limitKg > 0 ? ` · 사용 ${percent}%` : ""}
            </span>
          </div>
        </div>

        {/* KPI mini cards */}
        <div style={{ display: "grid", gap: 10 }}>
          <div
            style={{
              borderRadius: 14,
              padding: 12,
              background: "rgba(15, 23, 42, 0.03)",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              minWidth: 150,
            }}
          >
            <div style={{ fontSize: 12, color: textSub, fontWeight: 800 }}>여유</div>
            <div style={{ marginTop: 6, fontSize: 18, fontWeight: 900, color: ok ? "#0f172a" : "#94a3b8" }}>
              {ok ? `${remainingKg}kg` : "0kg"}
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              padding: 12,
              background: ok ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)",
              border: `1px solid ${ok ? "rgba(34,197,94,0.14)" : "rgba(239,68,68,0.14)"}`,
            }}
          >
            <div style={{ fontSize: 12, color: textSub, fontWeight: 800 }}>상태</div>
            <div style={{ marginTop: 6, fontSize: 18, fontWeight: 900, color: accent }}>{ok ? "OK" : "OVER"}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: textSub, fontWeight: 800 }}>무게 사용량</div>
          <div style={{ fontSize: 12, color: textSub, fontWeight: 800 }}>
            {limitKg > 0 ? `${totalKg} / ${limitKg} kg` : "제한 선택 필요"}
          </div>
        </div>

        <div
          style={{
            height: 12,
            borderRadius: 999,
            background: "rgba(1, 9, 29, 0.06)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* subtle shine */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 20%, transparent 40%)",
              transform: "translateX(-40%)",
              opacity: 0.6,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: `${limitKg > 0 ? Math.min(100, percent) : 0}%`,
              height: "100%",
              borderRadius: 999,
              background: ok
                ? "linear-gradient(90deg, #111827 0%, #334155 100%)"
                : "linear-gradient(90deg, #ef4444 0%, #fb7185 100%)",
              boxShadow: ok ? "0 6px 16px rgba(15, 23, 42, 0.18)" : "0 6px 16px rgba(239, 68, 68, 0.18)",
              transition: "width 180ms ease",
            }}
          />
        </div>

        {/* Footer hint */}
        <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, color: textSub }}>
            {ok ? "선택을 추가해도 제한까지 여유가 있어요." : "무게를 줄이거나 제한 프리셋을 변경해보세요."}
          </div>
          <div style={{ fontSize: 12, fontWeight: 900, color: textMain }}>
            {ok ? `남은 무게 ${remainingKg}kg` : `초과 ${overKg}kg`}
          </div>
        </div>
      </div>
    </div>
  );
}
