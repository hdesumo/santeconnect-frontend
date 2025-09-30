import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 📌 Récupérer une candidature par ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const candidature = await prisma.candidature.findUnique({
    where: { id: Number(params.id) },
    include: { offre: true, soignant: true },
  });

  if (!candidature) {
    return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });
  }

  return NextResponse.json(candidature);
}

// 📌 Mettre à jour le statut d’une candidature
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  const { statut } = body;

  if (!["en_attente", "acceptee", "refusee", "confirmee"].includes(statut)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const updated = await prisma.candidature.update({
    where: { id: Number(params.id) },
    data: { statut },
  });

  return NextResponse.json(updated);
}
