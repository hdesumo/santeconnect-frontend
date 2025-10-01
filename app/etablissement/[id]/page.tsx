import { notFound } from "next/navigation";

interface Etablissement {
  id: number;
  nom: string;
  adresse: string;
  telephone: string;
  departement: string;
  type: string;
  created_at: string;
  updated_at: string;
}

// ✅ SEO dynamique par établissement
export async function generateMetadata({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/etablissements/${params.id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Établissement introuvable",
      description: "L'établissement demandé n'a pas été trouvé.",
    };
  }

  const etab: Etablissement = await res.json();
  return {
    title: `Établissement - ${etab.nom}`,
    description: `Découvrez ${etab.nom}, situé à ${etab.adresse} (${etab.departement}). Type : ${etab.type}.`,
  };
}

async function getEtablissement(id: string): Promise<Etablissement | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/etablissements/${id}`,
      { cache: "no-store" }
    );
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Erreur serveur");
    return res.json();
  } catch (error) {
    console.error("Erreur lors du fetch établissement :", error);
    return null;
  }
}

export default async function EtablissementDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const etab = await getEtablissement(params.id);

  if (!etab) {
    notFound();
  }

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    etab.adresse
  )}`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{etab.nom}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Adresse :</span> {etab.adresse}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Téléphone :</span> {etab.telephone}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Département :</span> {etab.departement}
        </p>
        <p className="text-gray-700 mb-6">
          <span className="font-semibold">Type :</span> {etab.type}
        </p>

        <div className="flex space-x-4">
          <a
            href={`tel:${etab.telephone}`}
            className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow"
          >
            📞 Appeler
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow"
          >
            📍 Voir sur la carte
          </a>
        </div>
      </div>
    </div>
  );
}
