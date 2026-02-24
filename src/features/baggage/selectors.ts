import type { RootState } from "@/app/providers/store";

export const selectSelectedMap = (s: RootState) => s.baggage.selectedMap;
export const selectLimitId = (s: RootState) => s.baggage.limitId;
