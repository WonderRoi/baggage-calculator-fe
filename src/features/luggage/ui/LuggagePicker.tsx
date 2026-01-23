"use client";

import { LimitSwitch } from "./LimitSwitch";
import { ItemGrid } from "./ItemGrid";
import { ResultPanel } from "./ResultPanel";
import { useAppDispatch } from "@/store/hooks";
import { reset } from "@/features/luggage/model/slice";

export function LuggagePicker() {
  const dispatch = useAppDispatch();

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>항공 수하물 무게 계산기</h1>
          <p style={{ margin: "6px 0 0", opacity: 0.7 }}>
            10개 품목을 클릭해서 담고/빼면 총 무게와 초과 여부가 즉시 계산됩니다.
          </p>
        </div>
        <button
          onClick={() => dispatch(reset())}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <LimitSwitch />
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
        <ResultPanel />
        <ItemGrid />
      </div>
    </div>
  );
}
