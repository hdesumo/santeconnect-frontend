"use client";

import { useEffect, useState, useRef } from "react";

type Stat = {
  id: number;
  label: string;
  value: number;
};

const stats: Stat[] = [
  { id: 1, label: "Missions réalisées", value: 1250 },
  { id: 2, label: "Soignants inscrits", value: 320 },
  { id: 3, label: "Établissements partenaires", value: 75 },
  { id: 4, label: "Années d’expérience cumulées", value: 10 },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect(); // déclenche une seule fois
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const stepTime = Math.max(Math.floor(duration / end), 20);

      const timer = setInterval(() => {
        start += 1;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = start;
          return newCounts;
        });
        if (start >= end) clearInterval(timer);
      }, stepTime);
    });
  }, [visible]);

  return (
    <section ref={sectionRef} className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={stat.id}>
            <h3 className="text-4xl font-extrabold text-blue-600">
              {counts[index]}
            </h3>
            <p className="mt-2 text-lg font-medium text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
