import "./globals.css";
import { ReactNode } from "react";
import SidebarSoignant from "@/components/SidebarSoignant";
import SidebarEtablissement from "@/components/SidebarEtablissement";
import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ⚠️ Mock pour le rôle utilisateur (à remplacer par ton système d’auth)
const getUserRole = (): "soignant" | "etablissement" => {
  return "soignant"; // ou "etablissement"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const role = getUserRole();

  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        {/* Navbar en haut */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar desktop */}
          <div className="hidden md:block">
            {role === "soignant" ? <SidebarSoignant /> : <SidebarEtablissement />}
          </div>

          {/* Sidebar mobile */}
          <div className="md:hidden">
            <MobileSidebar role={role} />
          </div>

          {/* Contenu principal */}
          <main className="flex-1 p-6">{children}</main>
        </div>

        {/* Footer en bas */}
        <Footer />
      </body>
    </html>
  );
}
