"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/useProvider";
import FacebookPixelProvider from "@/context/useFacebookPixelProvider";

export interface ProvidersProps {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <FacebookPixelProvider>
        <UserProvider>
          <Toaster richColors />
          {children}
        </UserProvider>
      </FacebookPixelProvider>
    </QueryClientProvider>
  );
}
