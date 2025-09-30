"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
        {/* Texte */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Rejoignez <span className="text-blue-600">Santé Connect</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            La plateforme qui connecte soignants et établissements de santé en
            toute simplicité.
          </p>
          <div className="mt-6">
            <a
              href="#about"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Découvrir
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <Image
            src="/images/hero.jpg" // ta 2ème photo
            alt="Santé Connect - soignante"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
