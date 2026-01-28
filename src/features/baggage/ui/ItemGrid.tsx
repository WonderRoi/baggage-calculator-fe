"use client";

import { CATALOG_ITEMS } from "@/features/baggage/lib/catalog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleItem } from "@/features/baggage/model/slice";
import { selectSelectedIds } from "@/features/baggage/model/selectors";

export function ItemGrid() {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector(selectSelectedIds);
  const selectedSet = new Set(selectedIds);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
      {CATALOG_ITEMS.map((item) => {
        const selected = selectedSet.has(item.id);
        return (
          <button
            key={item.id}
            onClick={() => dispatch(toggleItem(item.id))}
            style={{
              textAlign: "left",
              padding: 14,
              borderRadius: 14,
              border: selected ? "2px solid #111" : "1px solid #ddd",
              background: selected ? "#f4f4f5" : "#fff",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 22 }}>{item.icon}</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>{item.name}</div>
            <div style={{ opacity: 0.7, marginTop: 2 }}>{item.weightKg.toFixed(1)} kg</div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
              {selected ? "담김 (클릭하면 제외)" : "클릭해서 담기"}
            </div>
          </button>
        );
      })}
    </div>
  );
}
