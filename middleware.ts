import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Routes protégées
const PROTECTED_PATHS = ["/dashboard", "/soignant", "/etablissement"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Vérifie uniquement les routes protégées
  if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const token = authHeader.split(" ")[1];
    try {
      jwt.verify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT invalide :", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
