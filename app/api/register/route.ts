import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { role, email, password, full_name, phone, prenom, nom, specialite, adresse } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === "SOIGNANT") {
      await pool.query(
        `INSERT INTO "Soignant" 
          (email, prenom, nom, telephone, specialite, adresse, created_at, updated_at, email_verified, password_hash)
         VALUES ($1,$2,$3,$4,$5,$6,NOW(),NOW(),false,$7)`,
        [email, prenom, nom, phone, specialite, adresse || null, hashedPassword]
      );
    } else if (role === "ETABLISSEMENT") {
      await pool.query(
        `INSERT INTO "Etablissement" 
          (email, nom, type, adresse, telephone, created_at, updated_at, email_verified, password_hash)
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW(),false,$6)`,
        [email, full_name || "Etablissement", "CLINIQUE", adresse || "", phone || "", hashedPassword]
      );
    } else {
      await pool.query(
        `INSERT INTO "User" 
          (full_name, email, password_hash, phone, role, created_at, updated_at, email_verified)
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW(),false)`,
        [full_name || "Utilisateur", email, hashedPassword, phone || "", role]
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
