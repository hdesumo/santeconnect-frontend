"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  { src: "/images/slider1.jpg", alt: "Soignant en mission" },
  { src: "/images/slider2.jpg", alt: "Établissement de santé" },
  { src: "/images/slider3.jpg", alt: "Collaboration soignant-établissement" },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // toutes les 4 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            transform: `translateX(${100 * (index - currentIndex)}%)`,
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Boutons navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
        >
          ◀
        </button>
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % images.length)
          }
          className="bg-black/40 text-white px-3 py-2 rounded-full hover:bg-black/70 transition"
        >
          ▶
        </button>
      </div>

      {/* Indicateurs */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
