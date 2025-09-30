import { NextResponse } from "next/server";

const etablissements = [
  { id: 1, nom: "Clinique du Parc", adresse: "12 Rue de Rennes", departement: "35" },
  { id: 2, nom: "CHU de Nantes", adresse: "1 Quai Moncousu", departement: "44" },
  { id: 3, nom: "Centre Médical Redon", adresse: "5 Rue de la Gare", departement: "35" },
  { id: 4, nom: "Polyclinique Saint-Herblain", adresse: "10 Av. des Lilas", departement: "44" },
  { id: 5, nom: "Maison de Santé Rennes Sud", adresse: "20 Bd Clemenceau", departement: "35" },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";

  if (!search) {
    return NextResponse.json(etablissements);
  }

  const filtered = etablissements.filter((e) =>
    e.nom.toLowerCase().includes(search) ||
    e.adresse.toLowerCase().includes(search) ||
    e.departement.includes(search)
  );

  return NextResponse.json(filtered);
}
