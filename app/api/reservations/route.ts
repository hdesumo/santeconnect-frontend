import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Simuler une mission créée en base
  const missionId = "42"; // ⚠️ À remplacer par l’ID venant de ta BDD

  return NextResponse.json({
    success: true,
    missionId,
    startDate: body.startDate,
  });
}
