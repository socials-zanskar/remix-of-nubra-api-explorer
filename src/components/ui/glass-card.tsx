import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-[#5E5E76]/40 shadow-[0_4px_16px_hsl(0_0%_0%/0.25)]",
          hover && "transition-all duration-300 ease-out hover:scale-[1.02] hover:border-[#5E5E76]/60 hover:shadow-[0_8px_24px_hsl(0_0%_0%/0.35),0_0_20px_hsl(245_82%_67%/0.08)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
