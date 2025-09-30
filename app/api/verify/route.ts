import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return NextResponse.json({ error: "Token manquant" }, { status: 400 });

  const record = await prisma.verificationToken.findUnique({ where: { token } });

  if (!record || record.expires < new Date()) {
    return NextResponse.json({ error: "Lien invalide ou expiré" }, { status: 400 });
  }

  // Vérifier si email correspond à un utilisateur
  await prisma.soignant.updateMany({
    where: { email: record.email },
    data: { emailVerified: true },
  });

  await prisma.etablissement.updateMany({
    where: { email: record.email },
    data: { emailVerified: true },
  });

  // Supprimer le token après usage
  await prisma.verificationToken.delete({ where: { token } });

  return NextResponse.redirect("/login?verified=1");
}
