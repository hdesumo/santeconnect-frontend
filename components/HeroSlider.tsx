"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image: "/images/slider1.jpg",
    title: "Vos missions, en toute sérénité",
    subtitle:
      "Confiez-nous la logistique : Remplacements et recrutements en quelques clics.",
    cta: { text: "Explorer les offres", href: "/offres" },
  },
  {
    id: 2,
    image: "/images/slider2.jpg",
    title: "Un personnel de santé dévoué",
    subtitle: "Disponibilité et compétence garanties.",
    cta: { text: "Nous contacter", href: "/etablissements" },
  },
  {
    id: 3,
    image: "/images/slider3.jpg",
    title: "Simplifiez votre quotidien",
    subtitle:
      "SantéCo rapproche les soignants et les établissements pour un service de santé plus efficace.",
    cta: { text: "Découvrir SantéCo", href: "/about" },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === current}
            className="object-cover"
          />

          {/* Texte en bas */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center px-4 max-w-2xl">
            <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="mt-2 text-base md:text-lg text-white drop-shadow">
              {slide.subtitle}
            </p>
            {slide.cta && (
              <a
                href={slide.cta.href}
                className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                {slide.cta.text}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Indicateurs */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
