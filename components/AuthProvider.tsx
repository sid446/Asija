"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider
      refetchInterval={300}  // Refetch every 5 minutes
      refetchOnWindowFocus={false}  // Disable refetch on window focus
    >
      {children}
    </SessionProvider>
  );
};
