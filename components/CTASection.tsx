"use client";

import Image from "next/image";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative h-[400px] flex items-center justify-center text-center text-white">
      {/* Image de fond */}
      <Image
        src="/images/banner.jpg" // 👉 Mets ton fichier ici
        alt="Bannière SantéConnect"
        fill
        priority
        className="object-cover object-center brightness-75"
      />

      {/* Overlay + contenu */}
      <div className="relative z-10 px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Rejoignez SantéConnect dès aujourd’hui
        </h2>
        <p className="mb-6 text-lg">
          Inscrivez-vous gratuitement et trouvez des missions adaptées à vos besoins.
        </p>
        <Link
          href="/signup"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
        >
          Créer un compte
        </Link>
      </div>
    </section>
  );
}
