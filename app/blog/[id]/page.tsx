"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        }
      } catch (err) {
        console.error("Erreur article:", err);
      }
    };
    if (id) fetchArticle();
  }, [id]);

  if (!article) return <p className="p-10 text-gray-500">Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Publié le {new Date(article.created_at).toLocaleDateString("fr-FR")}
      </p>
      <div className="prose prose-lg max-w-none">
        <p>{article.content}</p>
      </div>
    </div>
  );
}
