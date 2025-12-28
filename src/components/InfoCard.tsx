import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  position: "left" | "right" | "center" | "bottom";
  isMobile?: boolean;
}

export const InfoCard = ({ info, isVisible, position, isMobile }: InfoCardProps) => {
  const getPositionClasses = () => {
    if (isMobile) {
      return "left-1/2 -translate-x-1/2 top-full mt-4 w-[90%] max-w-sm";
    }
    switch (position) {
      case "left":
        return "right-full mr-4 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-4 top-1/2 -translate-y-1/2";
      case "center":
        return "left-1/2 -translate-x-1/2 top-full mt-4";
      case "bottom":
        return "left-1/2 -translate-x-1/2 bottom-full mb-4";
      default:
        return "left-full ml-4 top-1/2 -translate-y-1/2";
    }
  };

  const getAnimationVariants = () => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 },
      };
    }
    switch (position) {
      case "left":
        return {
          hidden: { opacity: 0, x: 10, scale: 0.95 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: 10, scale: 0.95 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -10, scale: 0.95 },
          visible: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -10, scale: 0.95 },
        };
      default:
        return {
          hidden: { opacity: 0, y: -10, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -10, scale: 0.95 },
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
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="backdrop-blur-card border border-border/50 rounded-xl p-5 shadow-xl min-w-[280px]">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {info.title}
            </h3>
            <ul className="space-y-2 mb-4">
              {info.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Button
              size="sm"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {info.cta}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
