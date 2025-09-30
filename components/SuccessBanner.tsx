"use client";

import { CheckCircle } from "lucide-react";

export default function SuccessBanner({
  message = "Votre opération a été réalisée avec succès.",
}: {
  message?: string;
}) {
  return (
    <div className="w-full bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <span>{message}</span>
    </div>
  );
}
