"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // 🔑 Suppression du token stocké
    localStorage.removeItem("token");

    // 🔄 Redirection vers la page de connexion
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
      Déconnexion
    </button>
  );
}
