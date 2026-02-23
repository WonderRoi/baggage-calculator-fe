import type { RootState } from "@/store/index";

export const selectSelectedMap = (s: RootState) => s.baggage.selectedMap;
export const selectLimitId = (s: RootState) => s.baggage.limitId;
