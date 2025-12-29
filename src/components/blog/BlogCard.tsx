import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link
        to={`/blogs/${post.slug}`}
        className="group block relative overflow-hidden rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5"
      >
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary/80 border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary/90 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {post.summary}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>

            {/* Read more indicator */}
            <span className="flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors">
              Read
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
