import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export const TagFilter = ({ tags, selectedTag, onTagSelect }: TagFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2"
    >
      <button
        onClick={() => onTagSelect(null)}
        className={cn(
          "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
          selectedTag === null
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
        )}
      >
        All
      </button>
      {tags.map((tag, index) => (
        <motion.button
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
            selectedTag === tag
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
          )}
        >
          {tag}
        </motion.button>
      ))}
    </motion.div>
  );
};
