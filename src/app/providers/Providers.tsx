"use client";

import { Provider } from "react-redux";
import { store } from "@/app/providers/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/config/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
