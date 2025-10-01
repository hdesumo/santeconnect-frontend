"use client";
import { useEffect, useState } from "react";

export default function SoignantDashboard() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/missions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setMissions(data))
      .catch((err) => console.error("Erreur API:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Soignant</h1>
      <h2 className="mt-4 text-lg font-semibold">Missions disponibles</h2>
      <ul>
        {missions.map((m: any) => (
          <li key={m.id}>{m.title} - {m.description}</li>
        ))}
      </ul>
    </div>
  );
}
