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
  position: "left" | "right" | "center" | "bottom" | "top";
  isMobile?: boolean;
}

export const InfoCard = ({ info, isVisible, position, isMobile }: InfoCardProps) => {
  const getPositionClasses = () => {
    if (isMobile) {
      return "left-1/2 -translate-x-1/2 top-full mt-2 w-[85%] max-w-[200px]";
    }
    switch (position) {
      case "left":
        return "right-full mr-3 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-3 top-1/2 -translate-y-1/2";
      case "center":
        return "left-1/2 -translate-x-1/2 top-full mt-2";
      case "top":
        return "left-1/2 -translate-x-1/2 bottom-full mb-2";
      case "bottom":
        return "left-1/2 -translate-x-1/2 top-full mt-2";
      default:
        return "left-full ml-3 top-1/2 -translate-y-1/2";
    }
  };

  const getAnimationVariants = () => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: -6, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -6, scale: 0.97 },
      };
    }
    switch (position) {
      case "left":
        return {
          hidden: { opacity: 0, x: 8, scale: 0.97 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 8, scale: 0.97 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -8, scale: 0.97 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -8, scale: 0.97 },
        };
      case "top":
        return {
          hidden: { opacity: 0, y: 6, scale: 0.97 },
          visible: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 6, scale: 0.97 },
        };
      default:
        return {
          hidden: { opacity: 0, y: -6, scale: 0.97 },
          visible: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -6, scale: 0.97 },
        };
    }
  };

  // Only show first 2 bullets for compact display
  const displayBullets = info.bullets.slice(0, 2);

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
          <div className="backdrop-blur-card border border-border/40 rounded-lg px-3 py-2.5 shadow-lg min-w-[140px] max-w-[160px]">
            <h3 className="text-xs font-semibold text-foreground mb-1.5 leading-tight">
              {info.title}
            </h3>
            <ul className="space-y-1 mb-2">
              {displayBullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-1.5 text-[10px] leading-tight text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-primary mt-1 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={info.ctaLink}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {info.cta} <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
