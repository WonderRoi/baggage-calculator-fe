"use client";

import type { Item } from "@/entities/item/types";
import { useAppDispatch } from "@/app/providers/storeHooks";
import { toggleItem } from "@/features/baggage/store";

export function ItemGrid({ items, selectedMap }: { items: Item[]; selectedMap: Record<string, true> }) {
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
      {items.map((item) => {
        const selected = !!selectedMap[item.id];
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
            <div style={{ fontWeight: 700 }}>{item.name}</div>
            <div>{item.weight} kg</div>
            <div style={{ opacity: 0.7 }}>{selected ? "담김 (클릭하면 제외)" : "클릭해서 담기"}</div>
          </button>
        );
      })}
    </div>
  );
}
