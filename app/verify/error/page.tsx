"use client";

import Link from "next/link";

export default function VerifyErrorPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-700">
          ❌ Vérification échouée
        </h1>
        <p className="text-gray-700 mb-6">
          Le lien de confirmation est <span className="font-semibold">invalide</span> 
          ou a <span className="font-semibold">expiré</span>.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Vous pouvez redemander un nouveau lien en essayant de vous reconnecter.
        </p>

        <Link
          href="/login"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Retour à la connexion
        </Link>
      </div>
    </section>
  );
}
