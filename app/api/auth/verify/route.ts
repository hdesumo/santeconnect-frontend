import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/error`);
  }

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  if (!record || record.expires < new Date()) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/error`);
  }

  // ✅ Marquer l'utilisateur comme vérifié
  await prisma.utilisateur.update({
    where: { id: record.userId },
    data: { emailVerified: true },
  });

  // ❌ Supprimer le token après usage
  await prisma.emailVerificationToken.delete({
    where: { token },
  });

  // ✅ Redirection vers la page succès
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify/success`);
}
