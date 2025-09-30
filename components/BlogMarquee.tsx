"use client";

import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  slug: string;
}

export default function BlogMarquee() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles?limit=5");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="w-full bg-gray-100 border-b border-gray-300 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee py-2">
        {articles.length > 0 ? (
          articles.map((article) => (
            <a
              key={article.id}
              href={`/blog/${article.slug}`}
              className="mx-6 inline-block text-sm text-gray-700 hover:text-blue-600 transition-colors"
            >
              📰 {article.title}
            </a>
          ))
        ) : (
          <span className="mx-6 inline-block text-sm text-gray-500">
            Chargement des derniers articles...
          </span>
        )}
      </div>

      <style jsx>{`
        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
