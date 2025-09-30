"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
}

interface Etablissement {
  id: number;
  nom: string;
  adresse: string;
  departement: string;
  type: string;
}

export default function SearchAndNewsBar() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Etablissement[]>([]);

  // Charger les 5 derniers articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blog?limit=5");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (err) {
        console.error("Erreur chargement articles:", err);
      }
    };
    fetchArticles();
  }, []);

  // Recherche établissements
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`/api/annuaire?search=${query}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Erreur recherche annuaire:", err);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <section className="bg-gray-50 border-b py-4">
      {/* 🔔 Marquee */}
      <div className="overflow-hidden whitespace-nowrap border-b border-gray-200 mb-3">
        <div className="animate-marquee inline-block">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/blog/${a.slug}`}
              className="mx-6 text-blue-600 hover:underline"
            >
              📰 {a.title}
            </Link>
          ))}
        </div>
      </div>

      {/* 🔎 Recherche */}
      <div className="max-w-3xl mx-auto px-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Annuaire des établissements de santé du 35 et du 44..."
          className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {results.length > 0 && (
          <ul className="mt-2 border rounded-lg bg-white shadow-lg divide-y">
            {results.map((r) => (
              <li key={r.id} className="p-2 hover:bg-gray-50">
                <span className="font-medium">{r.nom}</span> — {r.type} ({r.departement})
                <br />
                <span className="text-sm text-gray-500">{r.adresse}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
