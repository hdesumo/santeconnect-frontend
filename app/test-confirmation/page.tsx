"use client";

import React from "react";
import ConfirmationCard from "@/components/ConfirmationCard";

export default function TestConfirmationPage() {
  // Mission prévue dans 2 jours à 14h
  const missionDate = new Date();
  missionDate.setDate(missionDate.getDate() + 2);
  missionDate.setHours(14, 0, 0, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ConfirmationCard
        missionTitle="Remplacement en service pédiatrie"
        missionDate={missionDate}
        soignantName="Dr. Awa Ndiaye"
        etablissementName="Clinique Les Oliviers"
      />
    </div>
  );
}
