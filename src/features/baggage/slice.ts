import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LimitPreset } from "@/entities/limitPreset/types";

type BaggageState = {
  selectedMap: Record<string, true>;
  limitId: string;
};

const initialState: BaggageState = {
  selectedMap: {},
  limitId: "",
};

const baggageSlice = createSlice({
  name: "baggage",
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selectedMap[id]) delete state.selectedMap[id];
      else state.selectedMap[id] = true;
    },
    setLimit(state, action: PayloadAction<LimitPreset["id"]>) {
      state.limitId = action.payload;
    },
    reset(state) {
      state.selectedMap = {};
    },
  },
});

export const { toggleItem, setLimit, reset } = baggageSlice.actions;
export default baggageSlice.reducer;
