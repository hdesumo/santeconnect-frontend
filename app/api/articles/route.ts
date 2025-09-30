import { NextResponse } from "next/server";

// ⚠️ Mock de données pour l’instant
// À brancher plus tard sur ta table "Article"
const mockArticles = [
  { id: 1, title: "La télémédecine : un avenir en marche", slug: "telemedecine-avenir" },
  { id: 2, title: "Comment bien choisir son établissement de santé", slug: "choisir-etablissement" },
  { id: 3, title: "Les 5 innovations médicales de 2025", slug: "innovations-2025" },
  { id: 4, title: "Le rôle clé des infirmiers dans le suivi patient", slug: "role-infirmiers" },
  { id: 5, title: "Dossier médical numérique : avantages et limites", slug: "dossier-medical-numerique" },
];

export async function GET() {
  return NextResponse.json(mockArticles);
}
