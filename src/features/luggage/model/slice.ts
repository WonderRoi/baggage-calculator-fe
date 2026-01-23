import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LimitPreset } from "@/features/luggage/lib/types";

type LuggageState = {
  selectedIds: string[];
  limitId: LimitPreset["id"];
};

const initialState: LuggageState = {
  selectedIds: [],
  limitId: "CARRY_10",
};

const luggageSlice = createSlice({
  name: "luggage",
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

export const { toggleItem, setLimit, reset } = luggageSlice.actions;
export default luggageSlice.reducer;
