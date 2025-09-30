"use client";
import { useEffect, useState } from "react";
import ConfirmationCard from "@/components/ConfirmationCard";

export default function CandidaturesSoignant() {
  const [candidatures, setCandidatures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const soignantId = 1; // ⚠️ à remplacer par la session réelle

  useEffect(() => {
    fetch(`/api/candidatures?soignantId=${soignantId}`)
      .then((res) => res.json())
      .then((data) => {
        setCandidatures(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-8">Chargement de vos candidatures...</p>;

  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mes candidatures</h1>

      {candidatures.length === 0 ? (
        <p>Vous n’avez pas encore postulé à des missions.</p>
      ) : (
        <div className="space-y-6">
          {candidatures.map((candidature) =>
            candidature.statut === "confirmee" ? (
              <ConfirmationCard
                key={candidature.id}
                missionId={`M-${candidature.id}`}
                titre={candidature.offre.titre}
                etablissement={candidature.offre.etablissement.nom}
                lieu={candidature.offre.localisation}
                dates={`${candidature.offre.dateDebut.split("T")[0]} → ${
                  candidature.offre.dateFin.split("T")[0]
                }`}
                horaires="20h – 6h"
                remuneration={candidature.offre.remuneration}
                contact="Contact établissement"
                rdv="Jour J à l’accueil principal"
                docs="Carte pro santé, justificatif vaccination"
              />
            ) : (
              <div
                key={candidature.id}
                className="bg-white p-4 rounded-lg shadow border"
              >
                <h2 className="font-semibold">{candidature.offre.titre}</h2>
                <p className="text-sm text-gray-600">
                  {candidature.offre.localisation} –{" "}
                  {candidature.offre.dateDebut.split("T")[0]} →{" "}
                  {candidature.offre.dateFin.split("T")[0]}
                </p>
                <p className="text-sm mt-2">
                  Statut :{" "}
                  <span
                    className={
                      candidature.statut === "en_attente"
                        ? "text-yellow-600"
                        : candidature.statut === "acceptee"
                        ? "text-blue-600"
                        : "text-red-600"
                    }
                  >
                    {candidature.statut}
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}
