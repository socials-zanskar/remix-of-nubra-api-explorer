import { useState, useCallback, useEffect } from "react";
import { APIAsset } from "./APIAsset";
import { APIInfo } from "./InfoCard";

import PythonRESTBG from "@/assets/PythonRESTBG.png";
import NubraLogoBG from "@/assets/NubraLogoBG.png";
import TradingAPIBG from "@/assets/TradingAPIBG.png";
import MarketDataAPIBG from "@/assets/MarketDataAPIBG.png";
import PortfolioAPIBG from "@/assets/PortfolioAPIBG.png";

const apiData: Record<string, APIInfo> = {
  pythonRest: {
    id: "pythonRest",
    title: "Python REST APIs",
    bullets: [
      "Simple & powerful SDKs",
      "Built for automation",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  marketData: {
    id: "marketData",
    title: "Market Data APIs",
    bullets: [
      "Live quotes & chains",
      "Low-latency delivery",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  trading: {
    id: "trading",
    title: "Trading APIs",
    bullets: [
      "Multi-leg & flexi baskets",
      "Modify & manage orders",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  portfolio: {
    id: "portfolio",
    title: "Portfolio APIs",
    bullets: [
      "Real-time PnL & holdings",
      "Margin & risk insights",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
};

export const HeroSection = () => {
  const [activeAsset, setActiveAsset] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleActivate = useCallback((id: string) => {
    setActiveAsset(id);
  }, []);

  const handleDeactivate = useCallback(() => {
    setActiveAsset(null);
  }, []);

  const handleOutsideClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[role="button"]') === null) {
      setActiveAsset(null);
    }
  }, []);

  if (isMobile) {
    return (
      <section 
        className="relative min-h-screen pt-20 pb-12 px-4 overflow-hidden"
        onClick={handleOutsideClick}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-nubra-darker" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, hsl(245 82% 67% / 0.15), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Nubra Logo */}
          <div className="w-24">
            <img
              src={NubraLogoBG}
              alt="Nubra Logo"
              className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              Nubra <span className="text-gradient">APIs</span>
            </h1>
            <p className="text-muted-foreground text-xs">
              Powerful trading infrastructure for developers
            </p>
          </div>

          {/* Stacked Assets */}
          <div className="flex flex-col items-center gap-8 w-full max-w-xs">
            <APIAsset
              image={PythonRESTBG}
              alt="Python REST APIs"
              info={apiData.pythonRest}
              position="center"
              isActive={activeAsset === "pythonRest"}
              onActivate={() => handleActivate("pythonRest")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-full max-w-[240px]"
            />

            <APIAsset
              image={MarketDataAPIBG}
              alt="Market Data APIs"
              info={apiData.marketData}
              position="center"
              isActive={activeAsset === "marketData"}
              onActivate={() => handleActivate("marketData")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-full max-w-[220px]"
            />

            <APIAsset
              image={TradingAPIBG}
              alt="Trading APIs"
              info={apiData.trading}
              position="center"
              isActive={activeAsset === "trading"}
              onActivate={() => handleActivate("trading")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-full max-w-[220px]"
            />

            <APIAsset
              image={PortfolioAPIBG}
              alt="Portfolio APIs"
              info={apiData.portfolio}
              position="center"
              isActive={activeAsset === "portfolio"}
              onActivate={() => handleActivate("portfolio")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-full max-w-[260px]"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      onClick={handleOutsideClick}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-nubra-darker" />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, hsl(245 82% 67% / 0.15), transparent 60%)",
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        {/* Header text */}
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Nubra <span className="text-gradient">APIs</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Powerful trading infrastructure for developers
          </p>
        </div>

        {/* Portfolio API - centered above other assets (back layer) */}
        <div className="flex justify-center mb-2">
          <APIAsset
            image={PortfolioAPIBG}
            alt="Portfolio APIs"
            info={apiData.portfolio}
            position="back"
            isActive={activeAsset === "portfolio"}
            onActivate={() => handleActivate("portfolio")}
            onDeactivate={handleDeactivate}
            hasActiveAsset={activeAsset !== null}
            className="w-[140px] md:w-[160px] opacity-65"
          />
        </div>

        {/* 3D Asset Layout - Horizontal arrangement */}
        <div className="relative flex items-center justify-center gap-3 md:gap-6 lg:gap-10">
          {/* Left side - Trading API */}
          <APIAsset
            image={TradingAPIBG}
            alt="Trading APIs"
            info={apiData.trading}
            position="left"
            isActive={activeAsset === "trading"}
            onActivate={() => handleActivate("trading")}
            onDeactivate={handleDeactivate}
            hasActiveAsset={activeAsset !== null}
            className="w-[200px] md:w-[240px] lg:w-[280px] flex-shrink-0"
          />

          {/* Center - Python REST (main) */}
          <div className="relative flex-shrink-0">
            <APIAsset
              image={PythonRESTBG}
              alt="Python REST APIs"
              info={apiData.pythonRest}
              position="center"
              isActive={activeAsset === "pythonRest"}
              onActivate={() => handleActivate("pythonRest")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-[200px] md:w-[240px] lg:w-[280px]"
            />
          </div>

          {/* Right side - Market Data API */}
          <APIAsset
            image={MarketDataAPIBG}
            alt="Market Data APIs"
            info={apiData.marketData}
            position="right"
            isActive={activeAsset === "marketData"}
            onActivate={() => handleActivate("marketData")}
            onDeactivate={handleDeactivate}
            hasActiveAsset={activeAsset !== null}
            className="w-[200px] md:w-[240px] lg:w-[280px] flex-shrink-0"
          />
        </div>

        {/* Nubra Logo - centered below */}
        <div className="flex justify-center mt-6 z-40">
          <div className="w-[70px] md:w-[80px] animate-float">
            <img
              src={NubraLogoBG}
              alt="Nubra Logo"
              className="w-full h-auto drop-shadow-[0_8px_32px_hsl(245_82%_67%/0.35)]"
            />
          </div>
        </div>

        {/* Subtle instruction */}
        <p className="text-center text-[10px] text-muted-foreground mt-10 opacity-50">
          Hover or tap on any API to explore
        </p>
      </div>
    </section>
  );
};
