import { useState, useCallback } from "react";
import { InfoCard, APIInfo } from "./InfoCard";

interface APIAssetProps {
  image: string;
  alt: string;
  info: APIInfo;
  position: "left" | "right" | "center" | "back" | "top";
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  hasActiveAsset: boolean;
  isLogo?: boolean;
  className?: string;
}

export const APIAsset = ({
  image,
  alt,
  info,
  position,
  isActive,
  onActivate,
  onDeactivate,
  hasActiveAsset,
  isLogo,
  className = "",
}: APIAssetProps) => {
  const [isTouchDevice] = useState(() => 'ontouchstart' in window);

  const handleInteraction = useCallback(() => {
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  }, [isActive, onActivate, onDeactivate]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice) {
      onActivate();
    }
  }, [isTouchDevice, onActivate]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice) {
      onDeactivate();
    }
  }, [isTouchDevice, onDeactivate]);

  // Asset-specific directional placement
  const getInfoPosition = (): "left" | "right" | "center" | "bottom" | "top" | "bottom-left" => {
    if (isLogo) {
      return "bottom"; // Brand panel appears below logo
    }
    switch (position) {
      case "left":
        return "bottom-left"; // Trading API - below and to the left
      case "right":
        return "bottom"; // Market Data API - below
      case "center":
        return "top";
      case "back":
        return "right";
      case "top":
        return "top";
      default:
        return "bottom";
    }
  };

  const getTransformStyles = () => {
    if (isLogo) {
      return {
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
        zIndex: isActive ? 30 : 5,
      };
    }
    
    const baseScale = isActive ? 1.03 : 1;
    const rotation = position === "left" ? 2 : position === "right" ? -2 : 0;
    
    return {
      transform: `scale(${baseScale}) rotateY(${rotation}deg)`,
      zIndex: isActive ? 20 : position === "back" ? 5 : 10,
    };
  };

  // When Nubra logo is active, dim other assets more significantly
  const isNubraActive = hasActiveAsset && isLogo === false && info.id !== "nubraLogo";
  const dimmed = hasActiveAsset && !isActive;

  return (
    <div
      className={`relative transition-all duration-200 ease-out cursor-pointer ${className}`}
      style={{
        ...getTransformStyles(),
        opacity: dimmed ? (isLogo ? 0.7 : 0.45) : 1,
        perspective: "1000px",
      }}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleInteraction();
        }
      }}
    >
      <img
        src={image}
        alt={alt}
        className={`
          w-full h-auto object-contain select-none
          transition-all duration-200 ease-out
          ${isActive 
            ? isLogo 
              ? "drop-shadow-[0_0_30px_hsl(245_82%_67%/0.5)]" 
              : "drop-shadow-[0_0_24px_hsl(245_82%_67%/0.35)]" 
            : "drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
          }
        `}
        draggable={false}
      />
      <InfoCard
        info={info}
        isVisible={isActive}
        position={getInfoPosition()}
        isMobile={window.innerWidth < 768}
        isHero={isLogo}
      />
    </div>
  );
};
