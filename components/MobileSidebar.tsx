"use client";

import { useState } from "react";
import { Menu, X, Home, Calendar, FileText, User, Building2, Users } from "lucide-react";
import Link from "next/link";

type Role = "soignant" | "etablissement";

export default function MobileSidebar({ role }: { role: Role }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Bouton burger en haut à gauche */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-2 text-indigo-700 hover:text-indigo-900 focus:outline-none"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white p-6 transform transition-transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-8">
          {role === "soignant" ? "Espace Soignant" : "Espace Établissement"}
        </h2>

        <nav className="flex flex-col gap-4">
          {role === "soignant" ? (
            <>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </aside>
    </>
  );
}
