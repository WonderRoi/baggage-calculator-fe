import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LimitPreset } from "@/features/baggage/lib/types";

type baggageState = {
  selectedIds: string[];
  limitId: LimitPreset["id"];
};

const initialState: baggageState = {
  selectedIds: [],
  limitId: "CARRY_10",
};

const baggageSlice = createSlice({
  name: "baggage",
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.selectedIds = state.selectedIds.includes(id)
        ? state.selectedIds.filter((x) => x !== id)
        : [...state.selectedIds, id];
    },
    setLimit(state, action: PayloadAction<LimitPreset["id"]>) {
      state.limitId = action.payload;
    },
    reset(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleItem, setLimit, reset } = baggageSlice.actions;
export default baggageSlice.reducer;
