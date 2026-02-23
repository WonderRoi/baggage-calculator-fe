"use client";

import type { LimitPreset } from "@/features/baggage/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLimit } from "@/features/baggage/model/slice";
import { selectLimitId } from "@/features/baggage/model/selectors";

export function LimitSwitch({ presets }: { presets: LimitPreset[] }) {
  const dispatch = useAppDispatch();
  const limitId = useAppSelector(selectLimitId);

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => dispatch(setLimit(p.id))}
          style={{
            padding: "8px 12px",
            borderRadius: 10,
            border: "1px solid #ddd",
            background: p.id === limitId ? "#111" : "#fff",
            color: p.id === limitId ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          {p.name} ({p.maxWeight}kg)
        </button>
      ))}
    </div>
  );
}
