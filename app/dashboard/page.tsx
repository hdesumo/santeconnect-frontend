"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace("/login");
      } else if (role === "soignant") {
        router.replace("/soignant/missions");
      } else if (role === "etablissement") {
        router.replace("/etablissement/candidats");
      } else {
        // fallback si rôle non reconnu
        router.replace("/unauthorized");
      }
    }
  }, [isAuthenticated, isLoading, role, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner animé */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">
            Chargement de votre tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  // Fallback visuel si jamais l’auth est finie mais redirection pas encore faite
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-gray-600 text-lg">Redirection en cours...</p>
    </div>
  );
}
