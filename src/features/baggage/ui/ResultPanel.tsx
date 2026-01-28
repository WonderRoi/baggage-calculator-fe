"use client";

import { useAppSelector } from "@/store/hooks";
import { selectLimitKg, selectOverKg, selectStatus, selectTotalKg } from "@/features/baggage/model/selectors";

export function ResultPanel() {
  const total = useAppSelector(selectTotalKg);
  const limit = useAppSelector(selectLimitKg);
  const over = useAppSelector(selectOverKg);
  const status = useAppSelector(selectStatus);

  const ratio = Math.min(1, total / limit);
  const barWidth = `${Math.round(ratio * 100)}%`;

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 16, padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 14, opacity: 0.7 }}>총 무게</div>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{total.toFixed(1)} kg</div>
      </div>

      <div style={{ marginTop: 10, fontSize: 14 }}>
        제한: <b>{limit}kg</b> · 상태:{" "}
        {status === "OK" ? (
          <span style={{ color: "green" }}>적합</span>
        ) : (
          <span style={{ color: "crimson" }}>초과 +{over.toFixed(1)}kg</span>
        )}
      </div>

      <div style={{ marginTop: 12, height: 10, background: "#eee", borderRadius: 999 }}>
        <div
          style={{ width: barWidth, height: 10, background: status === "OK" ? "#111" : "crimson", borderRadius: 999 }}
        />
      </div>
    </div>
  );
}
