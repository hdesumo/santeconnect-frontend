"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Texte */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            À propos de <span className="text-blue-600">SantéConnect</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <strong>SantéConnect</strong> rapproche les{" "}
            <span className="text-blue-600">établissements de santé</span> et les{" "}
            <span className="text-blue-600">professionnels soignants</span>.  
            Notre mission : fluidifier les remplacements, optimiser les
            compétences et garantir une meilleure organisation des soins.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Grâce à une plateforme simple et intuitive, vous pouvez{" "}
            <span className="font-medium">gérer vos missions</span>, trouver de{" "}
            <span className="font-medium">nouveaux établissements</span> et
            accéder à des ressources utiles pour votre activité.
          </p>
          <a
            href="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            En savoir plus
          </a>
        </div>

        {/* Image */}
        <div className="relative w-full h-80 md:h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/nurse-desk.jpg"
            alt="Infirmière au travail"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
