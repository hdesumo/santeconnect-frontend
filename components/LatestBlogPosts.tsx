"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function LatestBlogPosts() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blog");
        if (res.ok) {
          const data = await res.json();
          setArticles(data.rows.slice(0, 3)); // uniquement les 3 derniers
        }
      } catch (err) {
        console.error("Erreur chargement blog:", err);
      }
    };
    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📰 Derniers articles
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <div
              key={a.id}
              className="p-5 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {a.content.slice(0, 100)}...
              </p>
              <Link
                href={`/blog/${a.id}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Lire l’article →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link
            href="/blog"
            className="text-blue-700 font-semibold hover:underline"
          >
            Voir tous les articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
