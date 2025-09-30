"use client";

import { Building2, FileText, Users, User } from "lucide-react";
import Link from "next/link";

export default function SidebarEtablissement() {
  return (
    <aside className="w-64 bg-indigo-700 text-white min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">Espace Établissement</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/etablissement/dashboard" className="flex items-center gap-2 hover:text-gray-200">
          <Building2 className="w-5 h-5" /> Tableau de bord
        </Link>
        <Link href="/etablissement/offres" className="flex items-center gap-2 hover:text-gray-200">
          <FileText className="w-5 h-5" /> Offres publiées
        </Link>
        <Link href="/etablissement/candidatures" className="flex items-center gap-2 hover:text-gray-200">
          <Users className="w-5 h-5" /> Candidatures
        </Link>
        <Link href="/etablissement/profil" className="flex items-center gap-2 hover:text-gray-200">
          <User className="w-5 h-5" /> Profil
        </Link>
      </nav>
    </aside>
  );
}
