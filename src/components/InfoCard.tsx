import { motion, AnimatePresence } from "framer-motion";

export interface APIInfo {
  id: string;
  title: string;
  bullets: string[];
  cta: string;
  ctaLink: string;
}

interface InfoCardProps {
  info: APIInfo;
  isVisible: boolean;
  position: "left" | "right" | "center" | "bottom" | "top" | "bottom-left";
  isMobile?: boolean;
  isHero?: boolean;
}

export const InfoCard = ({ info, isVisible, position, isMobile, isHero }: InfoCardProps) => {
  const getPositionClasses = () => {
    if (isHero) {
      // Premium brand panel - fixed to screen center
      return "fixed left-1/2 -translate-x-1/2";
    }
    if (isMobile) {
      return "left-1/2 -translate-x-1/2 top-full mt-2";
    }
    switch (position) {
      case "left":
        return "right-full mr-3 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-3 top-1/2 -translate-y-1/2";
      case "center":
        return "right-0 top-full mt-2"; // Right-aligned to prevent viewport overflow
      case "top":
        return "left-1/2 -translate-x-1/2 bottom-full mb-2";
      case "bottom-left":
        return "right-0 top-full mt-2";
      case "bottom":
        return "left-1/2 -translate-x-1/2 top-full mt-2";
      default:
        return "left-full ml-3 top-1/2 -translate-y-1/2";
    }
  };

  const getAnimationVariants = () => {
    if (isMobile || isHero) {
      return {
        hidden: { opacity: 0, y: -8, scale: 0.96 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.96 },
      };
    }
    switch (position) {
      case "left":
        return {
          hidden: { opacity: 0, x: 10, scale: 0.96 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 10, scale: 0.96 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -10, scale: 0.96 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -10, scale: 0.96 },
        };
      case "top":
        return {
          hidden: { opacity: 0, y: 8, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 8, scale: 0.96 },
        };
      default:
        return {
          hidden: { opacity: 0, y: -8, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -8, scale: 0.96 },
        };
    }
  };

  // Hero brand panel - premium styling (fixed to viewport bottom of logo)
  if (isHero) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed left-1/2 -translate-x-1/2 z-[100]"
            style={{ top: 'calc(50% + 180px)' }}
            variants={getAnimationVariants()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div 
              className="relative px-6 py-4 rounded-xl border border-primary/30"
              style={{
                background: 'linear-gradient(135deg, hsl(245 82% 67% / 0.12) 0%, hsl(260 82% 55% / 0.08) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 40px hsl(245 82% 67% / 0.2), 0 2px 8px hsl(0 0% 0% / 0.3)',
                minWidth: '380px',
                maxWidth: '420px',
              }}
            >
              {/* Subtle inner glow */}
              <div 
                className="absolute inset-0 rounded-xl opacity-40 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at top, hsl(245 82% 75% / 0.15), transparent 60%)',
                }}
              />
              <p className="relative text-[13px] md:text-[14px] text-foreground/95 font-medium leading-relaxed text-center">
                {info.bullets[0]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Standard API info cards
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`absolute z-50 ${getPositionClasses()}`}
          variants={getAnimationVariants()}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <div 
            className="backdrop-blur-sm bg-white/[0.04] border border-[#5E5E76]/40 rounded-[12px] px-4 py-3"
            style={{
              boxShadow: '0 4px 16px hsl(0 0% 0% / 0.25)',
            }}
          >
            {info.title && (
              <h3 className="text-[12px] font-semibold text-foreground mb-2 leading-none">
                {info.title}
              </h3>
            )}
            <ul className={`space-y-1 ${info.cta ? 'mb-2.5' : ''}`}>
              {info.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[11px] leading-snug text-muted-foreground whitespace-nowrap"
                >
                  {info.title && (
                    <span className="w-1 h-1 rounded-full bg-primary/70 flex-shrink-0 mt-1.5" />
                  )}
                  <span className={!info.title ? 'max-w-[300px] whitespace-normal' : ''}>
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
            {info.cta && info.ctaLink && (
              <a
                href={info.ctaLink}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6E83FB] hover:text-[#6E83FB]/80 transition-colors duration-150 mt-1"
              >
                {info.cta} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
