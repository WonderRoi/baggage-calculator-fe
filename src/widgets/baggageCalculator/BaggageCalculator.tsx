"use client";

import { useEffect } from "react";
import { useItems } from "@/entities/item/query";
import { useLimitPresets } from "@/entities/limitPreset/query";
import { ItemGrid } from "@/features/baggage/ItemGrid";
import { LimitSwitch } from "@/features/baggage/LimitSwitch";
import { ResultPanel } from "@/features/baggage/ResultPanel";

import { useAppDispatch, useAppSelector } from "@/app/providers/storeHooks";
import { reset, setLimit } from "@/features/baggage/store";
import { selectLimitId, selectSelectedMap } from "@/features/baggage/selectors";

export default function BaggageCalculator() {
  const dispatch = useAppDispatch();
  const selectedMap = useAppSelector(selectSelectedMap);
  const limitId = useAppSelector(selectLimitId);

  const itemsQ = useItems();
  const limitsQ = useLimitPresets();

  // presets가 로드되면 limitId 유효성 체크 -> 없으면 첫 프리셋으로 자동 세팅
  useEffect(() => {
    if (!limitsQ.data?.length) return;

    const exists = limitsQ.data.some((p) => p.id === limitId);
    if (!exists) dispatch(setLimit(limitsQ.data[0].id));
  }, [limitsQ.data, limitId, dispatch]);

  if (itemsQ.isLoading || limitsQ.isLoading) return <div>로딩중...</div>;
  if (itemsQ.error) return <div>items 에러: {String(itemsQ.error)}</div>;
  if (limitsQ.error) return <div>limitPresets 에러: {String(limitsQ.error)}</div>;

  const items = itemsQ.data ?? [];
  const presets = limitsQ.data ?? [];

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1>수하물 무게 계산기</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
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
  );
}
