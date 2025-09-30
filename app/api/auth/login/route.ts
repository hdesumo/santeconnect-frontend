import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await pool.query(
      `SELECT id, email, password_hash, role FROM "User" WHERE email=$1
       UNION
       SELECT id, email, password_hash, 'SOIGNANT' as role FROM "Soignant" WHERE email=$1
       UNION
       SELECT id, email, password_hash, 'ETABLISSEMENT' as role FROM "Etablissement" WHERE email=$1`,
      [email]
    );

    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 });
    }

    const user = res.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ success: true, token, user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
