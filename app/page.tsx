import HeroSlider from "@/components/HeroSlider";
import BlogMarquee from "@/components/BlogMarquee";
import SearchBar from "@/components/SearchBar";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      {/* Hero avec sliders */}
      <HeroSlider />
      <BlogMarquee />
      <SearchBar />   {/* ← Barre interactive */}
      {/* Marquee des articles de blog */}
      <div className="bg-blue-50 py-3 border-t border-b">
        <div className="container mx-auto">
          <BlogMarquee />
        </div>
      </div>

      {/* Barre de recherche de l’annuaire */}
      <section className="container mx-auto py-8 px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-4">
          Annuaire des établissements de santé de Bretagne
        </h2>
        <SearchBar />
      </section>

      {/* Autres sections */}
      <AboutSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
