import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET profil établissement
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const etab = await prisma.etablissement.findUnique({
    where: { id: Number(params.id) },
    select: {
      id: true,
      email: true,
      nom: true,
      adresse: true,
      telephone: true,
    },
  });

  if (!etab) {
    return NextResponse.json({ error: "Établissement introuvable" }, { status: 404 });
  }

  return NextResponse.json(etab);
}

// PUT mise à jour établissement
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const data: any = {};
  if (body.nom) data.nom = body.nom;
  if (body.adresse) data.adresse = body.adresse;
  if (body.telephone) data.telephone = body.telephone;
  if (body.password) data.passwordHash = await bcrypt.hash(body.password, 10);

  const updated = await prisma.etablissement.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json(updated);
}
