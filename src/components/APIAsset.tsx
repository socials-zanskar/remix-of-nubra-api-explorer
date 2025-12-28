import { useState, useCallback } from "react";
import { InfoCard, APIInfo } from "./InfoCard";

interface APIAssetProps {
  image: string;
  alt: string;
  info: APIInfo;
  position: "left" | "right" | "center" | "back";
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
    if (isLogo) return;
    if (isActive) {
      onDeactivate();
    } else {
      onActivate();
    }
  }, [isActive, isLogo, onActivate, onDeactivate]);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice && !isLogo) {
      onActivate();
    }
  }, [isTouchDevice, isLogo, onActivate]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouchDevice && !isLogo) {
      onDeactivate();
    }
  }, [isTouchDevice, isLogo, onDeactivate]);

  const getInfoPosition = (): "left" | "right" | "center" | "bottom" => {
    switch (position) {
      case "left":
        return "left";
      case "right":
        return "right";
      case "center":
        return "center";
      case "back":
        return "bottom";
      default:
        return "right";
    }
  };

  const getTransformStyles = () => {
    if (isLogo) return {};
    
    const baseScale = isActive ? 1.04 : 1;
    const rotation = position === "left" ? 5 : position === "right" ? -5 : 0;
    
    return {
      transform: `scale(${baseScale}) rotateY(${rotation}deg)`,
      zIndex: isActive ? 30 : position === "back" ? 5 : 10,
    };
  };

  const dimmed = hasActiveAsset && !isActive && !isLogo;

  return (
    <div
      className={`relative transition-all duration-200 ease-out ${className} ${
        !isLogo ? "cursor-pointer" : ""
      }`}
      style={{
        ...getTransformStyles(),
        opacity: dimmed ? 0.6 : 1,
        perspective: "1000px",
      }}
      onClick={handleInteraction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={isLogo ? undefined : "button"}
      tabIndex={isLogo ? undefined : 0}
      onKeyDown={(e) => {
        if (!isLogo && (e.key === "Enter" || e.key === " ")) {
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
          ${isActive ? "drop-shadow-[0_0_40px_hsl(245_82%_67%/0.5)]" : "drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]"}
        `}
        draggable={false}
      />
      {!isLogo && (
        <InfoCard
          info={info}
          isVisible={isActive}
          position={getInfoPosition()}
          isMobile={window.innerWidth < 768}
        />
      )}
    </div>
  );
};
