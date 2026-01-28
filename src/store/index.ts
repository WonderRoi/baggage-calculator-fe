import { configureStore } from "@reduxjs/toolkit";
import baggageReducer from "@/features/baggage/model/slice";

export const store = configureStore({
  reducer: {
    baggage: baggageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
