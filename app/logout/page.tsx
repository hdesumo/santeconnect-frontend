"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // 🔑 Nettoyage du token
    localStorage.removeItem("token");

    // ⏳ petite pause pour UX
    setTimeout(() => {
      router.push("/login");
    }, 800);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-600">Déconnexion en cours...</p>
    </div>
  );
}
