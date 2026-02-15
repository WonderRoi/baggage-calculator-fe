import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LimitPreset } from "@/features/baggage/lib/types";

type BaggageState = {
  // 선택된 id들을 "집합"처럼 저장: { "A": true, "B": true }
  selectedMap: Record<string, true>;
  limitId: LimitPreset["id"];
};

const initialState: BaggageState = {
  selectedMap: {},
  limitId: "CARRY_10",
};

const baggageSlice = createSlice({
  name: "baggage",
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload;

      if (state.selectedMap[id]) {
        delete state.selectedMap[id];
      } else {
        state.selectedMap[id] = true;
      }
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
