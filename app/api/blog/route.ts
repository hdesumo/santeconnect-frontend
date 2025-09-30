import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`
      SELECT id, title, slug, content, created_at
      FROM "Article"
      ORDER BY created_at DESC
      LIMIT 20;
    `;
    return NextResponse.json({ rows: result.rows });
  } catch (err) {
    console.error("Erreur API blog:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
