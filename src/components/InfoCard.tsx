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
      return "left-1/2 -translate-x-1/2 top-full mt-1.5";
    }
    switch (position) {
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      case "center":
        return "left-1/2 -translate-x-1/2 top-full mt-1.5";
      case "top":
        return "left-1/2 -translate-x-1/2 bottom-full mb-1.5";
      case "bottom":
        return "left-1/2 -translate-x-1/2 top-full mt-1.5";
      default:
        return "left-full ml-2 top-1/2 -translate-y-1/2";
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
          <div className="backdrop-blur-card border border-border/30 rounded px-3 py-2 shadow-md whitespace-nowrap">
            <h3 className="text-[11px] font-medium text-foreground mb-1.5 leading-none">
              {info.title}
            </h3>
            <ul className="space-y-0.5 mb-2">
              {info.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-center gap-1.5 text-[10px] leading-none text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            <a
              href={info.ctaLink}
              className="inline-flex items-center gap-0.5 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors duration-150"
            >
              {info.cta} <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
