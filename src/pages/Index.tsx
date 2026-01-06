import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { TradingEnvironmentSection } from "@/components/TradingEnvironmentSection";
import { IntegrationSection } from "@/components/IntegrationSection";
import { Footer } from "@/components/Footer";

const SectionDivider = () => (
  <div className="w-full max-w-4xl mx-auto px-6">
    <div className="h-px bg-[#5E5E76]/40" />
  </div>
);

const Index = () => {
  return (
    <main 
      className="min-h-screen"
      style={{ 
        backgroundImage: "url('/images/bg-2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <NavBar />
      <HeroSection />
      <SectionDivider />
      <TradingEnvironmentSection />
      <SectionDivider />
      <IntegrationSection />
      <Footer />
    </main>
  );
};

export default Index;
