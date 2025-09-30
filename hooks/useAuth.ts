"use client";

import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    user: session?.user ?? null,
    role: session?.user?.role ?? null,
    id: session?.user?.id ?? null,
    email: session?.user?.email ?? null,
  };
}
