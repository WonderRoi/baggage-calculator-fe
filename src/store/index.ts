import { configureStore } from "@reduxjs/toolkit";
import luggageReducer from "@/features/luggage/model/slice";

export const store = configureStore({
  reducer: {
    luggage: luggageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
