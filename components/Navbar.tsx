"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          SantéConnect
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="hover:text-blue-500 transition-colors">Accueil</Link>
          <Link href="/blog" className="hover:text-blue-500 transition-colors">Blog</Link>
          <Link href="/annuaire" className="hover:text-blue-500 transition-colors">Annuaire</Link>
          <Link href="/temoignages" className="hover:text-blue-500 transition-colors">Témoignages</Link>
          <Link href="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
          <div className="space-x-3">
            <Link
              href="/login"
              className="px-4 py-2 border rounded-md hover:bg-gray-50 transition"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Inscription
            </Link>
          </div>
        </div>

        {/* Burger menu (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <Link href="/" className="hover:text-blue-500">Accueil</Link>
            <Link href="/blog" className="hover:text-blue-500">Blog</Link>
            <Link href="/annuaire" className="hover:text-blue-500">Annuaire</Link>
            <Link href="/temoignages" className="hover:text-blue-500">Témoignages</Link>
            <Link href="/contact" className="hover:text-blue-500">Contact</Link>
            <Link
              href="/login"
              className="px-4 py-2 border rounded-md text-center hover:bg-gray-50 transition"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition"
            >
              Inscription
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
