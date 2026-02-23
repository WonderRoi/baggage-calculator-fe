export type Item = {
  id: string;
  name: string;
  weight: number; // BE에서 Int
  imageUrl?: string | null;
};

export type LimitPreset = {
  id: string;
  name: string;
  maxWeight: number;
};
