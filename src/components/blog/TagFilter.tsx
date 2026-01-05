import { motion } from "framer-motion";
import { SelectablePill } from "@/components/ui/selectable-pill";

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
      <SelectablePill
        isSelected={selectedTag === null}
        onClick={() => onTagSelect(null)}
      >
        All
      </SelectablePill>
      {tags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <SelectablePill
            isSelected={selectedTag === tag}
            onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
          >
            {tag}
          </SelectablePill>
        </motion.div>
      ))}
    </motion.div>
  );
};
