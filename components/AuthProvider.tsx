"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider
      refetchInterval={86400}  // Refetch once per day
      refetchOnWindowFocus={false}  // Disable refetch on window focus
    >
      {children}
    </SessionProvider>
  );
};
