"use client";

import { useEffect } from "react";
import { useItems, useLimitPresets } from "@/features/api/queries";
import { ItemGrid } from "./ItemGrid";
import { LimitSwitch } from "./LimitSwitch";
import { ResultPanel } from "./ResultPanel";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { reset, setLimit } from "@/features/baggage/model/slice";
import { selectLimitId, selectSelectedMap } from "@/features/baggage/model/selectors";

export function BaggagePicker() {
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
      <h1>항공 수하물 무게 계산기</h1>

      <LimitSwitch presets={presets} />

      <ItemGrid items={items} selectedMap={selectedMap} />

      <ResultPanel items={items} presets={presets} selectedMap={selectedMap} limitId={limitId} />

      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
