import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import BlogMarquee from "@/components/BlogMarquee";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero avec slider */}
      <HeroSlider />

      {/* Marquee avec articles récents */}
      <BlogMarquee />

      {/* Barre de recherche Annuaire */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          🔍 Annuaire des établissements de santé du 35 et du 44
        </h2>
        <SearchBar />
      </section>

      {/* À propos */}
      <AboutSection />

      {/* Fonctionnalités */}
      <FeaturesSection />

      {/* Comment ça marche */}
      <HowItWorksSection />

      {/* Témoignages */}
      <TestimonialsSection />

      {/* Statistiques */}
      <StatsSection />

      {/* Call to action */}
      <CTASection />
    </main>
  );
}
