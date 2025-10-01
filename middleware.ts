import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Secret JWT (assure-toi de définir JWT_SECRET dans ton .env.local)
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// Pages protégées (ajuste en fonction de ton app)
const protectedRoutes = ["/dashboard", "/profile", "/etablissements", "/soignants"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Vérifie si la route est protégée
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Récupère le token depuis les cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Vérifie le token
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error("JWT invalide:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// ⚠️ Important : on force le runtime Node.js
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/etablissements/:path*", "/soignants/:path*"],
  runtime: "nodejs",
};
