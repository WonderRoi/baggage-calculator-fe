import type { LimitPreset } from "./types";

export const LIMIT_PRESETS: LimitPreset[] = [
  { id: "CARRY_7", label: "기내 7kg", limitKg: 7 },
  { id: "CARRY_10", label: "기내 10kg", limitKg: 10 },
  { id: "CHECK_15", label: "위탁 15kg", limitKg: 15 },
];
