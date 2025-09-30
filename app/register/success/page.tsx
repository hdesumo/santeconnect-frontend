"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSuccess() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown <= 0) {
      router.push("/login");
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-2">Inscription réussie ✅</h1>
        <p>Vous allez être redirigé vers la page de connexion dans {countdown} secondes.</p>
        <button onClick={() => router.push("/login")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Aller à la connexion maintenant
        </button>
      </div>
    </div>
  );
}
