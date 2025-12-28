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
      "Simple & powerful Python SDKs",
      "REST-based trading & data access",
      "Built for automation",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  marketData: {
    id: "marketData",
    title: "Market Data APIs",
    bullets: [
      "Live quotes & option chains",
      "Snapshot + WebSocket feeds",
      "Low-latency data delivery",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  trading: {
    id: "trading",
    title: "Trading APIs",
    bullets: [
      "Single, multi-leg & flexi baskets",
      "Modify, cancel & manage orders",
      "Strategy-first execution",
    ],
    cta: "View Docs",
    ctaLink: "#",
  },
  portfolio: {
    id: "portfolio",
    title: "Portfolio APIs",
    bullets: [
      "Real-time PnL & holdings",
      "Strategy-level analytics",
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
        className="relative min-h-screen pt-24 pb-16 px-4 overflow-hidden"
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

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Nubra Logo */}
          <div className="w-32">
            <img
              src={NubraLogoBG}
              alt="Nubra Logo"
              className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Nubra <span className="text-gradient">APIs</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Powerful trading infrastructure for developers
            </p>
          </div>

          {/* Stacked Assets */}
          <div className="flex flex-col items-center gap-10 w-full max-w-sm">
            <APIAsset
              image={PythonRESTBG}
              alt="Python REST APIs"
              info={apiData.pythonRest}
              position="center"
              isActive={activeAsset === "pythonRest"}
              onActivate={() => handleActivate("pythonRest")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-full max-w-[280px]"
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
              className="w-full max-w-[260px]"
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
              className="w-full max-w-[260px]"
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
              className="w-full max-w-[300px]"
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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        {/* Header text */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
            Nubra <span className="text-gradient">APIs</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Powerful trading infrastructure for developers
          </p>
        </div>

        {/* 3D Asset Layout - Horizontal arrangement */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mt-16 md:mt-24">
          {/* Left side - Trading API (swapped) */}
          <APIAsset
            image={TradingAPIBG}
            alt="Trading APIs"
            info={apiData.trading}
            position="left"
            isActive={activeAsset === "trading"}
            onActivate={() => handleActivate("trading")}
            onDeactivate={handleDeactivate}
            hasActiveAsset={activeAsset !== null}
            className="w-[240px] md:w-[280px] lg:w-[320px] flex-shrink-0"
          />

          {/* Center stack - Python REST (main) with Portfolio above and Logo in front */}
          <div className="relative flex-shrink-0">
            {/* Portfolio API - smaller, centered above Python REST */}
            <APIAsset
              image={PortfolioAPIBG}
              alt="Portfolio APIs"
              info={apiData.portfolio}
              position="back"
              isActive={activeAsset === "portfolio"}
              onActivate={() => handleActivate("portfolio")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="absolute -top-12 left-1/2 -translate-x-1/4 w-[160px] md:w-[180px] opacity-70 -z-10"
            />

            {/* Python REST API - center focus */}
            <APIAsset
              image={PythonRESTBG}
              alt="Python REST APIs"
              info={apiData.pythonRest}
              position="center"
              isActive={activeAsset === "pythonRest"}
              onActivate={() => handleActivate("pythonRest")}
              onDeactivate={handleDeactivate}
              hasActiveAsset={activeAsset !== null}
              className="w-[240px] md:w-[280px] lg:w-[320px]"
            />

            {/* Nubra Logo - front overlay */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-40 w-[80px] md:w-[100px] animate-float">
              <img
                src={NubraLogoBG}
                alt="Nubra Logo"
                className="w-full h-auto drop-shadow-[0_10px_40px_hsl(245_82%_67%/0.4)]"
              />
            </div>
          </div>

          {/* Right side - Market Data API (swapped) */}
          <APIAsset
            image={MarketDataAPIBG}
            alt="Market Data APIs"
            info={apiData.marketData}
            position="right"
            isActive={activeAsset === "marketData"}
            onActivate={() => handleActivate("marketData")}
            onDeactivate={handleDeactivate}
            hasActiveAsset={activeAsset !== null}
            className="w-[240px] md:w-[280px] lg:w-[320px] flex-shrink-0"
          />
        </div>

        {/* Subtle instruction */}
        <p className="text-center text-xs text-muted-foreground mt-16 opacity-60">
          Hover or tap on any API to explore
        </p>
      </div>
    </section>
  );
};
