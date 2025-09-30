"use client";

export default function StatsSection() {
  const stats = [
    {
      label: "Professionnels inscrits",
      value: "5 000+",
      description:
        "Infirmiers, médecins, aides-soignants et spécialistes déjà connectés.",
    },
    {
      label: "Établissements partenaires",
      value: "800+",
      description:
        "Cliniques, hôpitaux et centres de soins collaborent chaque jour.",
    },
    {
      label: "Missions réalisées",
      value: "12 000+",
      description:
        "Des milliers de mises en relation réussies.",
    },
    {
      label: "Taux de satisfaction",
      value: "98%",
      description:
        "Un haut niveau de confiance et de satisfaction des utilisateurs.",
    },
  ];

  return (
    <section className="py-20 bg-white" id="stats">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Nos résultats parlent d’eux-mêmes
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          La plateforme grandit chaque jour grâce à une communauté active et
          engagée, qui fait confiance à notre solution.
        </p>

        <dl className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl shadow-md"
            >
              <dt className="text-4xl font-extrabold text-indigo-600">
                {stat.value}
              </dt>
              <dd className="mt-2 text-lg font-medium text-gray-900">
                {stat.label}
              </dd>
              <p className="mt-2 text-gray-600">{stat.description}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
