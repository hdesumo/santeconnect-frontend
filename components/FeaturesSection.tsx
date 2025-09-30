"use client";

import { Stethoscope, Clock, ShieldCheck } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Stethoscope className="w-10 h-10 text-indigo-600" />,
      title: "Un réseau de confiance",
      description:
        "Accédez à une communauté vérifiée de soignants et d’établissements, sélectionnés pour leur sérieux et leur engagement envers la qualité des soins.",
    },
    {
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: "Gain de temps au quotidien",
      description:
        "Réduisez vos démarches administratives grâce à une plateforme intuitive qui facilite la recherche de missions, la publication d’offres et la gestion des candidatures.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-indigo-600" />,
      title: "Sécurité et transparence",
      description:
        "Toutes les transactions et échanges sont sécurisés. La transparence est garantie à chaque étape, depuis la mise en relation jusqu’au règlement des missions.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Les atouts de notre plateforme
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez pourquoi soignants et établissements choisissent notre
          solution pour simplifier leur quotidien et renforcer la qualité des
          services de santé.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
