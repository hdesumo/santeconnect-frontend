import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET profil soignant
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const soignant = await prisma.soignant.findUnique({
    where: { id: Number(params.id) },
    select: {
      id: true,
      email: true,
      prenom: true,
      nom: true,
      specialite: true,
    },
  });

  if (!soignant) {
    return NextResponse.json({ error: "Soignant introuvable" }, { status: 404 });
  }

  return NextResponse.json(soignant);
}

// PUT mise à jour soignant
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const data: any = {};
  if (body.prenom) data.prenom = body.prenom;
  if (body.nom) data.nom = body.nom;
  if (body.specialite) data.specialite = body.specialite;
  if (body.password) data.passwordHash = await bcrypt.hash(body.password, 10);

  const updated = await prisma.soignant.update({
    where: { id: Number(params.id) },
    data,
  });

  return NextResponse.json(updated);
}
