"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import SuccessBanner from "@/components/SuccessBanner";

export default function ProfilSoignant() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [prenom, setPrenom] = useState(user?.prenom || "");
  const [nom, setNom] = useState(user?.nom || "");
  const [specialite, setSpecialite] = useState(user?.specialite || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/soignants/${user?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom, nom, specialite, password: password || undefined }),
    });

    if (res.ok) {
      router.push("/soignant/profil?success=true");
    }
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mon profil soignant</h1>

      {success && <SuccessBanner message="✅ Profil mis à jour avec succès" />}

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Spécialité</label>
          <input
            type="text"
            value={specialite}
            onChange={(e) => setSpecialite(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nouveau mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Mettre à jour
        </button>
      </form>
    </section>
  );
}
