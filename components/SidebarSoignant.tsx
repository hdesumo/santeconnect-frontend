"use client";

import { Home, Calendar, FileText, User } from "lucide-react";
import Link from "next/link";

export default function SidebarSoignant() {
  return (
    <aside className="w-64 bg-indigo-700 text-white min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">Espace Soignant</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/soignant/dashboard" className="flex items-center gap-2 hover:text-gray-200">
          <Home className="w-5 h-5" /> Tableau de bord
        </Link>
        <Link href="/soignant/disponibilites" className="flex items-center gap-2 hover:text-gray-200">
          <Calendar className="w-5 h-5" /> Mes disponibilités
        </Link>
        <Link href="/soignant/candidatures" className="flex items-center gap-2 hover:text-gray-200">
          <FileText className="w-5 h-5" /> Mes candidatures
        </Link>
        <Link href="/soignant/profil" className="flex items-center gap-2 hover:text-gray-200">
          <User className="w-5 h-5" /> Profil
        </Link>
      </nav>
    </aside>
  );
}
