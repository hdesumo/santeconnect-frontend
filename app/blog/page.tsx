"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.rows);
        }
      } catch (err) {
        console.error("Erreur chargement blog:", err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Actualités & Blog</h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">Aucun article disponible.</p>
      ) : (
        <div className="space-y-6">
          {articles.map((a) => (
            <div
              key={a.id}
              className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{a.title}</h2>
              <p className="text-gray-600 mb-4">
                {a.content.slice(0, 200)}...
              </p>
              <Link
                href={`/blog/${a.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                Lire la suite →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
