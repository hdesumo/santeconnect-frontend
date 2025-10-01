import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = params;

    const etablissement = await prisma.etablissementAnnuaire.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!etablissement) {
      return NextResponse.json(
        { error: "Établissement introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(etablissement);
  } catch (error) {
    console.error("Erreur API etablissement/[id]:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
