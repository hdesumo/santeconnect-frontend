import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 📌 Récupérer toutes les candidatures (filtrées par soignant ou établissement)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const soignantId = searchParams.get("soignantId");
  const etablissementId = searchParams.get("etablissementId");

  let candidatures;

  if (soignantId) {
    candidatures = await prisma.candidature.findMany({
      where: { soignantId: Number(soignantId) },
      include: { offre: true },
    });
  } else if (etablissementId) {
    candidatures = await prisma.candidature.findMany({
      where: { offre: { etablissementId: Number(etablissementId) } },
      include: { soignant: true },
    });
  } else {
    candidatures = await prisma.candidature.findMany({
      include: { offre: true, soignant: true },
    });
  }

  return NextResponse.json(candidatures);
}

// 📌 Créer une candidature (Soignant postule)
export async function POST(req: Request) {
  const body = await req.json();
  const { soignantId, offreId } = body;

  if (!soignantId || !offreId) {
    return NextResponse.json({ error: "soignantId et offreId requis" }, { status: 400 });
  }

  const candidature = await prisma.candidature.create({
    data: {
      soignantId,
      offreId,
    },
  });

  return NextResponse.json(candidature);
}
