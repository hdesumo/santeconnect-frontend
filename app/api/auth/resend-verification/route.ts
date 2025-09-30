import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email déjà vérifié" },
        { status: 400 }
      );
    }

    // Supprimer les anciens tokens
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Générer un nouveau token
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1h
      },
    });

    // Envoyer un nouvel email
    await sendVerificationEmail(email, token);

    return NextResponse.json({
      message: "✅ Nouveau mail de confirmation envoyé",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
