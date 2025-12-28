import { NavBar } from "@/components/NavBar";
import { HeroSection } from "@/components/HeroSection";
import { TradingEnvironmentSection } from "@/components/TradingEnvironmentSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <HeroSection />
      <TradingEnvironmentSection />
    </main>
  );
};

export default Index;
