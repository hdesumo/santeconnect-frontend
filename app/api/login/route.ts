import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Durée de validité du token (exemple: 1 jour)
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRATION = "1d";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    let user;
    if (role === "SOIGNANT") {
      user = await pool.query(
        `SELECT id, email, password_hash, prenom, nom, specialite 
         FROM "Soignant" WHERE email = $1`,
        [email]
      );
    } else if (role === "ETABLISSEMENT") {
      user = await pool.query(
        `SELECT id, email, password_hash, nom, type 
         FROM "Etablissement" WHERE email = $1`,
        [email]
      );
    } else {
      user = await pool.query(
        `SELECT id, email, password_hash, full_name, role 
         FROM "User" WHERE email = $1`,
        [email]
      );
    }

    if (user.rowCount === 0) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 401 });
    }

    const foundUser = user.rows[0];
    const isPasswordValid = await bcrypt.compare(password, foundUser.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Génération d'un JWT
    const token = jwt.sign(
      {
        id: foundUser.id,
        email: foundUser.email,
        role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: foundUser.id,
          email: foundUser.email,
          role,
          ...(foundUser.full_name && { full_name: foundUser.full_name }),
          ...(foundUser.nom && { nom: foundUser.nom }),
          ...(foundUser.prenom && { prenom: foundUser.prenom }),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
