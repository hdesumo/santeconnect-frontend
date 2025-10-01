import Link from "next/link";

interface Etablissement {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
  departement: string;
  type: string;
}

export const metadata = {
  title: "Annuaire des établissements de santé",
  description:
    "Découvrez la liste complète des établissements de santé disponibles dans la région Bretagne.",
};

async function getEtablissements(): Promise<Etablissement[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/etablissements`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Erreur lors du fetch");
    return res.json();
  } catch (error) {
    console.error("Erreur API établissements :", error);
    return [];
  }
}

export default async function EtablissementsPage() {
  const etablissements = await getEtablissements();

  if (etablissements.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Annuaire des établissements</h1>
        <p className="text-gray-600">
          Aucun établissement trouvé pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Annuaire des établissements
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {etablissements.map((etab) => {
          const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            etab.adresse
          )}`;

          return (
            <div
              key={etab.id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {etab.nom}
                </h2>
                <p className="text-gray-600 text-sm mb-1">
                  📍 {etab.adresse}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  ☎️ {etab.telephone}
                </p>
                <p className="text-gray-600 text-sm">
                  🏥 {etab.type} - {etab.departement}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <a
                  href={`tel:${etab.telephone}`}
                  className="flex-1 px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg text-center shadow"
                >
                  Appeler
                </a>
                <Link
                  href={`/etablissements/${etab.id}`}
                  className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center shadow"
                >
                  Détails
                </Link>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-3 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-center shadow"
                >
                  Carte
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
