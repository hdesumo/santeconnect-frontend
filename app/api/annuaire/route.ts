import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const departement = searchParams.get("departement") || "";
  const type = searchParams.get("type") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const where: string[] = [];
    const values: any[] = [];

    if (search) {
      where.push(`(nom ILIKE $${values.length + 1} OR adresse ILIKE $${values.length + 1})`);
      values.push(`%${search}%`);
    }
    if (departement) {
      where.push(`departement = $${values.length + 1}`);
      values.push(departement);
    }
    if (type) {
      where.push(`type = $${values.length + 1}`);
      values.push(type);
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";

    const query = `
      SELECT id, nom, adresse, departement, type
      FROM "EtablissementAnnuaire"
      ${whereClause}
      ORDER BY nom ASC
      LIMIT ${limit} OFFSET ${offset};
    `;

    const totalQuery = `
      SELECT COUNT(*)::int AS count
      FROM "EtablissementAnnuaire"
      ${whereClause};
    `;

    const result = await sql.query(query, values);
    const totalResult = await sql.query(totalQuery, values);

    return NextResponse.json({ rows: result.rows, total: totalResult.rows[0].count });
  } catch (err) {
    console.error("Erreur annuaire API:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
