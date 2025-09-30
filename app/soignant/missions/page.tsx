"use client";
import { useEffect, useState } from "react";

export default function MissionsSoignant() {
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const soignantId = 1; // ⚠️ à remplacer plus tard par session utilisateur

  // Récupérer les offres depuis l'API
  useEffect(() => {
    fetch("/api/offres")
      .then((res) => res.json())
      .then((data) => {
        setMissions(data);
        setLoading(false);
      });
  }, []);

  // Fonction pour postuler à une mission
  const postuler = async (offreId: number) => {
    const res = await fetch("/api/candidatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soignantId, offreId }),
    });

    if (res.ok) {
      alert("✅ Votre candidature a été envoyée !");
    } else {
      alert("⚠️ Erreur lors de la candidature.");
    }
  };

  if (loading) return <p className="p-8">Chargement des missions...</p>;

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Missions disponibles</h1>

      {missions.length === 0 ? (
        <p>Aucune mission disponible pour le moment.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className="p-6 bg-white border rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">{mission.titre}</h2>
              <p className="text-sm text-gray-600 mb-1">{mission.localisation}</p>
              <p className="text-sm text-gray-600 mb-1">
                {mission.dateDebut.split("T")[0]} → {mission.dateFin.split("T")[0]}
              </p>
              <p className="text-sm text-gray-800 font-medium mb-4">
                {mission.remuneration}
              </p>

              <button
                onClick={() => postuler(mission.id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Postuler
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
