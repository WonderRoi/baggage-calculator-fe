import type { RootState } from "@/store/index";
import { CATALOG_ITEMS } from "@/features/baggage/lib/catalog";
import { LIMIT_PRESETS } from "@/features/baggage/lib/limits";

export const selectSelectedMap = (s: RootState) => s.baggage.selectedMap;
export const selectLimitId = (s: RootState) => s.baggage.limitId;

export const selectLimitKg = (s: RootState) => {
  const preset = LIMIT_PRESETS.find((p) => p.id === s.baggage.limitId);
  return preset?.limitKg ?? 10;
};

export const selectTotalKg = (s: RootState) => {
  const selectedMap = s.baggage.selectedMap;
  return CATALOG_ITEMS.reduce((sum, item) => (selectedMap[item.id] ? sum + item.weightKg : sum), 0);
};

export const selectOverKg = (s: RootState) => {
  const over = selectTotalKg(s) - selectLimitKg(s);
  return over > 0 ? over : 0;
};

export const selectStatus = (s: RootState) => {
  const total = selectTotalKg(s);
  const limit = selectLimitKg(s);
  return total <= limit ? "OK" : "OVER";
};
