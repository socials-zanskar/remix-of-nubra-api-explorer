import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { TradingEnvironmentSection } from "@/components/TradingEnvironmentSection";
import { IntegrationSection } from "@/components/IntegrationSection";
import { Footer } from "@/components/Footer";

const SectionDivider = () => (
  <div className="w-full">
    <div className="border-t border-dashed border-[#5E5E76]/20" />
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
