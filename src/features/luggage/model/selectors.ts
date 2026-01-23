import type { RootState } from "@/store";
import { CATALOG_ITEMS } from "@/features/luggage/lib/catalog";
import { LIMIT_PRESETS } from "@/features/luggage/lib/limits";

export const selectSelectedIds = (s: RootState) => s.luggage.selectedIds;
export const selectLimitId = (s: RootState) => s.luggage.limitId;

export const selectLimitKg = (s: RootState) => {
  const preset = LIMIT_PRESETS.find((p) => p.id === s.luggage.limitId);
  return preset?.limitKg ?? 10;
};

export const selectTotalKg = (s: RootState) => {
  const set = new Set(s.luggage.selectedIds);
  return CATALOG_ITEMS.reduce((sum, item) => (set.has(item.id) ? sum + item.weightKg : sum), 0);
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
