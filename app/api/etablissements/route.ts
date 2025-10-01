import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adapte si ton client DB est ailleurs

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    let etablissements;

    if (search) {
      etablissements = await prisma.etablissementAnnuaire.findMany({
        where: {
          OR: [
            { nom: { contains: search, mode: "insensitive" } },
            { adresse: { contains: search, mode: "insensitive" } },
            { departement: { contains: search, mode: "insensitive" } },
          ],
        },
        take: 10, // limite pour la recherche dynamique
      });
    } else {
      etablissements = await prisma.etablissementAnnuaire.findMany({
        take: 50,
      });
    }

    return NextResponse.json(etablissements);
  } catch (error) {
    console.error("Erreur API etablissements:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
