"use client";

import { useState, useEffect } from "react";

interface Etablissement {
  id: number;
  nom: string;
  adresse: string;
  departement: string;
  type: string;
}

export default function AnnuairePage() {
  const [query, setQuery] = useState("");
  const [departement, setDepartement] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState<Etablissement[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Charger la liste
  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        search: query,
        departement,
        type,
        page: page.toString(),
      });
      try {
        const res = await fetch(`/api/annuaire?${params}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.rows);
          setTotal(data.total);
        }
      } catch (err) {
        console.error("Erreur annuaire:", err);
      }
    };
    fetchData();
  }, [query, departement, type, page]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Annuaire des établissements de santé</h1>

      {/* 🔎 Filtres */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom ou adresse..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          className="p-3 border rounded-lg shadow-sm"
        >
          <option value="">Tous départements</option>
          <option value="35">Ille-et-Vilaine (35)</option>
          <option value="44">Loire-Atlantique (44)</option>
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-3 border rounded-lg shadow-sm"
        >
          <option value="">Tous types</option>
          <option value="Clinique">Clinique</option>
          <option value="Hôpital">Hôpital</option>
          <option value="Cabinet">Cabinet</option>
          <option value="Centre médical">Centre médical</option>
        </select>
      </div>

      {/* 📋 Résultats */}
      {results.length === 0 ? (
        <p className="text-gray-500">Aucun établissement trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {results.map((r) => (
            <li
              key={r.id}
              className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{r.nom}</h2>
              <p className="text-gray-600">{r.type} — Département {r.departement}</p>
              <p className="text-sm text-gray-500">{r.adresse}</p>
            </li>
          ))}
        </ul>
      )}

      {/* 📄 Pagination */}
      {total > 10 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            ← Précédent
          </button>
          <span className="px-3 py-2">
            Page {page} / {Math.ceil(total / 10)}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(total / 10)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}
