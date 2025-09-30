import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await sql`
      SELECT id, title, content, created_at
      FROM "Article"
      WHERE id = ${params.id};
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur API article:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
