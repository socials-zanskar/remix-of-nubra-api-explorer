import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, type BlogPost } from "@/lib/blog";
import { GlassCard } from "@/components/ui/glass-card";

const BlogSidebar = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const allPosts = await getAllPosts();
        // Sort by date descending and take latest 10 (or all if < 10)
        const sortedPosts = allPosts
          .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
          .slice(0, 10);
        setBlogs(sortedPosts);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="lg:sticky lg:top-24 overflow-hidden rounded-[12px] bg-white/[0.01] backdrop-blur-sm border border-[#5E5E76]/10">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#5E5E76]/10">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#6E83FB]" />
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Engineering Blogs
          </h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Technical deep-dives from the team
        </p>
      </div>

      {/* Scrollable blog list */}
      <ScrollArea className="h-[500px]">
        <div className="p-3 space-y-2">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-3 rounded-lg animate-pulse">
                <div className="h-4 bg-muted/30 rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted/20 rounded w-full mb-1" />
                <div className="h-3 bg-muted/20 rounded w-2/3" />
              </div>
            ))
          ) : blogs.length === 0 ? (
            <p className="text-xs text-muted-foreground p-3">No blogs available</p>
          ) : (
            blogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="group block p-3 rounded-[12px] hover:bg-white/[0.04] hover:backdrop-blur-sm border border-transparent hover:border-[#5E5E76]/40 transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-medium text-foreground transition-colors leading-tight">
                      {blog.title}
                    </h4>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {blog.summary}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 bg-secondary/30 text-muted-foreground border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#5E5E76]/10">
        <Link 
          to="/blogs" 
          className="text-xs text-[#6E83FB] hover:text-[#6E83FB]/80 font-medium flex items-center gap-1 transition-colors"
        >
          View all articles
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
};

export default BlogSidebar;
