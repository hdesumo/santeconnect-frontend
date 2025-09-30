"use client";
import { useEffect, useState } from "react";

export default function CandidatsEtablissement() {
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const etablissementId = 1; // ⚠️ à remplacer par la session réelle

  // Charger les candidatures
  useEffect(() => {
    fetch(`/api/candidatures?etablissementId=${etablissementId}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidatures(data);
        setLoading(false);
      });
  }, []);

  // Mettre à jour le statut d'une candidature
  const updateStatut = async (id: number, statut: string) => {
    const res = await fetch(`/api/candidatures/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });

    if (res.ok) {
      alert(`✅ Candidature ${statut}e`);
      setCandidatures((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, statut } : c
        )
      );
    } else {
      alert("⚠️ Erreur lors de la mise à jour");
    }
  };

  if (loading) return <p className="p-8">Chargement des candidatures...</p>;

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Candidatures reçues</h1>

      {candidatures.length === 0 ? (
        <p>Aucune candidature pour vos offres.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Soignant</th>
              <th className="border p-2">Mission</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidatures.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {c.soignant.prenom} {c.soignant.nom}
                  <br />
                  <span className="text-xs text-gray-500">
                    {c.soignant.email}
                  </span>
                </td>
                <td className="border p-2">{c.offre.titre}</td>
                <td className="border p-2 font-medium">{c.statut}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => updateStatut(c.id, "acceptee")}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => updateStatut(c.id, "refusee")}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => updateStatut(c.id, "confirmee")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Confirmer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
