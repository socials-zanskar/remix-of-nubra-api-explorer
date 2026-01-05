import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface SelectablePillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
}

const SelectablePill = forwardRef<HTMLButtonElement, SelectablePillProps>(
  ({ className, isSelected = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          isSelected
            ? "bg-[#586fed]/20 text-white border border-[#F5F5FF]/40"
            : "bg-transparent text-white/50 border border-[#5E5E76]/40 hover:border-[#5E5E76]/60 hover:text-white/70",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectablePill.displayName = "SelectablePill";

export { SelectablePill };
