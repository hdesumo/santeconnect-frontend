// components/TestimonialsSection.tsx
"use client";

import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Patricia Varier",
      role: "Directrice de clinique privée",
      text: "Grâce à cette plateforme, j’ai pu trouver rapidement des infirmiers qualifiés pour combler des absences imprévues. Le processus est fluide et professionnel.",
    },
    {
      name: "Jean Dupont",
      role: "Infirmier libéral",
      text: "La flexibilité est incroyable : je peux indiquer mes disponibilités et être contacté immédiatement par des établissements. C’est rassurant et motivant.",
    },
    {
      name: "Pierre Meynard",
      role: "Responsable RH, hôpital public",
      text: "Enfin une solution adaptée aux besoins réels du terrain. Les mises en relation sont rapides et sécurisées, ce qui allège énormément notre gestion des remplacements.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="testimonials">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ce qu’ils en disent
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Témoignages de soignants et d’établissements qui utilisent déjà la
          plateforme.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-left"
            >
              <Quote className="absolute -top-4 left-4 w-8 h-8 text-indigo-600 opacity-30" />
              <p className="text-gray-700 italic">“{t.text}”</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
