export type CatalogItem = {
  id: string;
  name: string;
  weightKg: number;
  icon: string; // 나중에 이미지로 교체 가능
};

export type LimitPreset = {
  id: "CARRY_7" | "CARRY_10" | "CHECK_15";
  label: string;
  limitKg: number;
};
