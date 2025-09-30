"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface ConfirmationCardProps {
  missionTitle: string;
  missionDescription: string;
  startDate: string; // ISO string
  location: string;
}

export default function ConfirmationCard({
  missionTitle,
  missionDescription,
  startDate,
  location,
}: ConfirmationCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startDate).getTime();
      const diff = start - now;

      if (diff <= 0) {
        setTimeLeft("La mission a commencé !");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        days > 0
          ? `${days}j ${hours}h ${minutes}m`
          : `${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <Card className="max-w-lg w-full p-6 shadow-xl rounded-2xl text-center">
      <CardHeader>
        <CheckCircle className="mx-auto text-green-500 w-12 h-12" />
        <CardTitle className="text-2xl font-bold mt-2">
          Mission confirmée 🎉
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{missionTitle}</p>
        <p className="text-sm text-gray-500 mb-2">{missionDescription}</p>
        <p className="text-sm font-medium text-gray-600">
          📍 {location}
        </p>
        <p className="mt-4 text-lg font-semibold text-indigo-600">
          ⏳ Début dans : {timeLeft}
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Retour au tableau de bord
        </Link>
      </CardContent>
    </Card>
  );
}
