"use client";

import { LIMIT_PRESETS } from "@/features/baggage/lib/limits";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLimit } from "@/features/baggage/model/slice";
import { selectLimitId } from "@/features/baggage/model/selectors";

export function LimitSwitch() {
  const dispatch = useAppDispatch();
  const limitId = useAppSelector(selectLimitId);

  return (
    <div style={{ display: "flex", gap: 8 }}>
      {LIMIT_PRESETS.map((p) => (
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
          {p.label}
        </button>
      ))}
    </div>
  );
}
