"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
  isAuthenticated: boolean;
  role?: "soignant" | "etablissement";
}

export default function Navbar({ isAuthenticated, role }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClasses = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? "text-blue-600 underline underline-offset-4"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav
      className="bg-white shadow-md sticky top-0 z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              SantéConnect
            </Link>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className={linkClasses("/login")}>
                  Connexion
                </Link>
                <Link href="/register" className={linkClasses("/register")}>
                  Inscription
                </Link>
              </>
            ) : (
              <>
                {role === "soignant" && (
                  <Link
                    href="/soignant/missions"
                    className={linkClasses("/soignant/missions")}
                  >
                    Missions
                  </Link>
                )}
                {role === "etablissement" && (
                  <Link
                    href="/etablissement/candidatures"
                    className={linkClasses("/etablissement/candidatures")}
                  >
                    Candidatures
                  </Link>
                )}
                <LogoutButton />
              </>
            )}
          </div>

          {/* Bouton mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className={linkClasses("/login")}>
                Connexion
              </Link>
              <Link href="/register" className={linkClasses("/register")}>
                Inscription
              </Link>
            </>
          ) : (
            <>
              {role === "soignant" && (
                <Link
                  href="/soignant/missions"
                  className={linkClasses("/soignant/missions")}
                >
                  Missions
                </Link>
              )}
              {role === "etablissement" && (
                <Link
                  href="/etablissement/candidatures"
                  className={linkClasses("/etablissement/candidatures")}
                >
                  Candidatures
                </Link>
              )}
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
