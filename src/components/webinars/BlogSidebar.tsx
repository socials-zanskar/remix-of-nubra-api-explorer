import { motion } from "framer-motion";
import { BookOpen, Clock, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

// Mock data - in production, this would come from GitHub
const blogs = [
  {
    id: "flexi-basket-orders",
    title: "Understanding Flexi & Basket Orders",
    tags: ["API", "Orders", "Trading"],
    readTime: "8 min read",
    excerpt: "Deep dive into multi-leg orders, partial fills, and execution strategies."
  },
  {
    id: "margin-hedge-logic",
    title: "Hedge-aware Margin Calculations",
    tags: ["Risk", "Margin", "Algo"],
    readTime: "12 min read",
    excerpt: "How Nubra computes real-time margin with hedging offsets."
  },
  {
    id: "websocket-greeks",
    title: "Real-time Greeks via WebSockets",
    tags: ["WebSocket", "Options", "Data"],
    readTime: "10 min read",
    excerpt: "Streaming option Greeks and IV surfaces for live trading."
  },
  {
    id: "python-sdk-guide",
    title: "Python SDK: Getting Started",
    tags: ["Python", "SDK", "Tutorial"],
    readTime: "15 min read",
    excerpt: "Build your first algo trading bot with Nubra's Python SDK."
  },
  {
    id: "order-management",
    title: "Advanced Order Management",
    tags: ["API", "Orders", "Infra"],
    readTime: "7 min read",
    excerpt: "Order lifecycle, modifications, and cancellation patterns."
  },
  {
    id: "portfolio-analytics",
    title: "Portfolio Analytics API",
    tags: ["API", "Analytics", "Reporting"],
    readTime: "9 min read",
    excerpt: "P&L tracking, position aggregation, and historical analysis."
  }
];

const BlogSidebar = () => {
  return (
    <div className="lg:sticky lg:top-8 bg-card/30 border border-border/30 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/30 bg-card/50">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
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
          {blogs.map((blog, index) => (
            <motion.a
              key={blog.id}
              href={`#blog/${blog.id}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group block p-3 rounded-lg hover:bg-card/80 border border-transparent hover:border-border/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h4>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
              </div>
              
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                {blog.excerpt}
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
            </motion.a>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border/30 bg-card/50">
        <a 
          href="#all-blogs" 
          className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
        >
          View all articles
          <ChevronRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
};

export default BlogSidebar;
