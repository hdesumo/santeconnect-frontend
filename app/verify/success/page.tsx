"use client";

import Link from "next/link";

export default function VerifySuccessPage() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-green-700">
          🎉 Email confirmé avec succès
        </h1>
        <p className="text-gray-700 mb-6">
          Votre adresse email a été validée. <br />
          Vous pouvez maintenant vous connecter à votre espace SantéConnect.
        </p>

        <Link
          href="/login"
          className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Aller à la connexion
        </Link>
      </div>
    </section>
  );
}
