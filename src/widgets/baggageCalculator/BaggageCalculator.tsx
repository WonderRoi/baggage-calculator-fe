"use client";

import { useEffect } from "react";
import { useItems } from "@/entities/item/query";
import { useLimitPresets } from "@/entities/limitPreset/query";
import { ItemGrid } from "@/features/baggage/ItemGrid";
import { LimitSwitch } from "@/features/baggage/LimitSwitch";
import { ResultPanel } from "@/features/baggage/ResultPanel";

import { useAppDispatch, useAppSelector } from "@/app/providers/storeHooks";
import { reset, setLimit } from "@/features/baggage/slice";
import { selectLimitId, selectSelectedMap } from "@/features/baggage/selectors";
import { QueryBoundary } from "@/shared/ui/QueryBoundary";

export default function BaggageCalculator() {
  const dispatch = useAppDispatch();
  const selectedMap = useAppSelector(selectSelectedMap);
  const limitId = useAppSelector(selectLimitId);

  const itemsQ = useItems();
  const limitsQ = useLimitPresets();

  useEffect(() => {
    const presets = limitsQ.data;
    if (!presets?.length) return;

    const exists = presets.some((p) => p.id === limitId);
    if (!exists) dispatch(setLimit(presets[0].id));
  }, [limitsQ.data, limitId, dispatch]);

  const items = itemsQ.data ?? [];
  const presets = limitsQ.data ?? [];

  return (
    <QueryBoundary isLoading={itemsQ.isLoading || limitsQ.isLoading} error={itemsQ.error ?? limitsQ.error}>
      <div style={{ display: "grid", gap: 16 }}>
        <h1>수하물 무게 계산기</h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <LimitSwitch presets={presets} />

          <button
            onClick={() => dispatch(reset())}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #000000",
              background: "#000000",
              cursor: "pointer",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            초기화
          </button>
        </div>

        <ItemGrid items={items} selectedMap={selectedMap} />

        <ResultPanel items={items} presets={presets} selectedMap={selectedMap} limitId={limitId} />
      </div>
    </QueryBoundary>
  );
}
