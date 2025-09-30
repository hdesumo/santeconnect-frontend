"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessBanner from "@/components/SuccessBanner";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  // succès après vérification par email
  const success = searchParams.get("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez entrer votre email et votre mot de passe.");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        if (res.error.includes("non vérifié")) {
          setError("Veuillez vérifier votre email avant de vous connecter.");
        } else {
          setError("Email ou mot de passe incorrect.");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      const res = await fetch("/api/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setResendSuccess(true);
      } else {
        setError("Impossible de renvoyer l’email de confirmation.");
      }
    } catch {
      setError("Une erreur est survenue lors de l’envoi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

        {success && <SuccessBanner message="Votre email a été confirmé avec succès !" />}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {resendSuccess && (
          <p className="text-green-600 text-sm mb-4">
            Email de confirmation renvoyé avec succès.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="vous@exemple.com"
              aria-label="Adresse email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Votre mot de passe"
              aria-label="Mot de passe"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <button
            onClick={handleResendVerification}
            className="text-indigo-600 hover:underline"
          >
            Renvoyer l’email de confirmation
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <a href="/forgot-password" className="text-indigo-600 hover:underline">
            Mot de passe oublié ?
          </a>
          <a href="/register" className="text-indigo-600 hover:underline">
            Pas encore inscrit ? Créez un compte
          </a>
        </div>
      </div>
    </div>
  );
}
