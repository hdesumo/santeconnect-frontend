"use client";

import { UserCheck, Building2, Handshake } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <UserCheck className="w-10 h-10 text-indigo-600" />,
      title: "1. Inscription simplifiée",
      description:
        "Créez votre profil en quelques clics : soignants et établissements accèdent rapidement à la plateforme grâce à un processus d’inscription fluide et sécurisé.",
    },
    {
      icon: <Building2 className="w-10 h-10 text-indigo-600" />,
      title: "2. Publiez ou consultez",
      description:
        "Les établissements publient leurs missions ou besoins urgents ; les soignants renseignent leurs compétences et disponibilités pour être repérés immédiatement.",
    },
    {
      icon: <Handshake className="w-10 h-10 text-indigo-600" />,
      title: "3. Collaboration transparente",
      description:
        "La plateforme favorise la mise en relation, assure le suivi des missions et garantit la transparence des échanges, du premier contact jusqu’au paiement.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Comment ça marche ?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Notre solution rapproche efficacement les professionnels de santé et
          les établissements, en simplifiant toutes les étapes : de
          l’inscription jusqu’à la mission réalisée.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
