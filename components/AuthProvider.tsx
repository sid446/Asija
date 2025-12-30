"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider
      refetchInterval={false}  // Disable automatic refetching
      refetchOnWindowFocus={false}  // Disable refetch on window focus
    >
      {children}
    </SessionProvider>
  );
};
