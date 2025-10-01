import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Intro */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">SantéConnect</h3>
          <p className="text-gray-400 text-sm">
            La plateforme qui facilite la mise en relation entre établissements
            de santé et soignants.  
            <br /> Vos missions, en toute sérénité.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/offres" className="hover:text-white">
                Offres de mission
              </Link>
            </li>
            <li>
              <Link href="/annuaire" className="hover:text-white">
                Annuaire des établissements
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog Santé
              </Link>
            </li>
          </ul>
        </div>

        {/* Ressources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Ressources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/comment-ca-marche" className="hover:text-white">
                Comment ça marche
              </Link>
            </li>
            <li>
              <Link href="/temoignages" className="hover:text-white">
                Témoignages
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Légal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/politique-confidentialite" className="hover:text-white">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/protection-donnees" className="hover:text-white">
                Protection des données
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bas du footer */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SantéConnect — Tous droits réservés.
      </div>
    </footer>
  );
}
