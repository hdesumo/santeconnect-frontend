import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-gray-50 border-t border-gray-200 mt-12"
      role="contentinfo"
      aria-label="Pied de page principal"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo et description */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">SantéConnect</h2>
          <p className="mt-3 text-sm text-gray-600">
            La plateforme qui relie soignants et établissements en toute
            simplicité et sécurité.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Navigation
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/features" className="text-gray-600 hover:text-blue-600">
                Fonctionnalités
              </Link>
            </li>
            <li>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600">
                Comment ça marche
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="text-gray-600 hover:text-blue-600">
                Témoignages
              </Link>
            </li>
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Légal
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/mentions-legales" className="text-gray-600 hover:text-blue-600">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/politique-confidentialite" className="text-gray-600 hover:text-blue-600">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/protection-donnees" className="text-gray-600 hover:text-blue-600">
                Protection des données
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Contact
          </h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>Email : contact@santeconnect.com</li>
            <li>Tél. : +33 1 23 45 67 89</li>
            <li>
              <Link href="/contact" className="hover:text-blue-600">
                Formulaire de contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SantéConnect. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/mentions-legales" className="hover:text-blue-600">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-blue-600">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
