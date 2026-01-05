import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { TradingEnvironmentSection } from "@/components/TradingEnvironmentSection";
import { IntegrationSection } from "@/components/IntegrationSection";
import { Footer } from "@/components/Footer";

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
      <TradingEnvironmentSection />
      <IntegrationSection />
      <Footer />
    </main>
  );
};

export default Index;
