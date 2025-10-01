"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/etablissements?search=${value}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Erreur recherche établissements:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    // Redirection vers la page détails
    router.push(`/etablissements/${id}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Rechercher un établissement..."
        className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && (
        <p className="absolute left-2 top-12 text-sm text-gray-500">Recherche...</p>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
          {results.map((etab) => (
            <li
              key={etab.id}
              onClick={() => handleSelect(etab.id)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
            >
              {etab.nom} – {etab.departement}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
