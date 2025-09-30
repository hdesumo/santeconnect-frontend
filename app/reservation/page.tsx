"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReservationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReservation = async () => {
    setLoading(true);

    try {
      // ⚠️ À remplacer par ton vrai endpoint backend
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          missionTitle: "Remplacement infirmier",
          missionDescription: "Mission de 2 jours à la Clinique Demo.",
          startDate: "2025-10-03T09:00:00Z",
          location: "Clinique Demo, Rennes",
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la réservation");

      const data = await res.json();

      // ✅ Redirection automatique vers la page de confirmation
      router.push(`/confirmation/${data.missionId}`);
    } catch (error) {
      console.error(error);
      alert("Impossible de finaliser la réservation");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Réserver une mission</h1>
      <button
        onClick={handleReservation}
        disabled={loading}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Réservation en cours..." : "Confirmer la réservation"}
      </button>
    </main>
  );
}
