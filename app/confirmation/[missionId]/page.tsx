"use client";

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero avec slider */}
      <HeroSlider />

      {/* Section À propos avec photo infirmière */}
      <AboutSection />

      {/* Fonctionnalités */}
      <FeaturesSection />

      {/* Comment ça marche */}
      <HowItWorksSection />

      {/* Statistiques */}
      <StatsSection />

      {/* Call to Action avec banner.jpg */}
      <CTASection />

      {/* Pied de page */}
      <Footer />
    </main>
  );
}
