import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET → liste toutes les offres
export async function GET() {
  const offres = await prisma.offre.findMany({
    include: { etablissement: true },
    orderBy: { dateDebut: "asc" },
  });
  return NextResponse.json(offres);
}
