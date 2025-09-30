"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    fetch(`/api/etablissements?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Barre de recherche */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un établissement de santé..."
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {/* Résultats */}
      {query.length >= 2 && (
        <div className="mt-2 bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500">Recherche en cours...</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((etab) => (
                <li
                  key={etab.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <p className="font-medium">{etab.nom}</p>
                  <p className="text-sm text-gray-600">
                    {etab.adresse} ({etab.departement})
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-gray-500">Aucun établissement trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
