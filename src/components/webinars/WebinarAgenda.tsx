import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface WebinarAgendaProps {
  items: AgendaItem[];
}

const WebinarAgenda = ({ items }: WebinarAgendaProps) => {
  return (
    <GlassCard className="p-6 lg:p-8">
      <h3 className="text-xl font-bold text-foreground mb-2">
        What This Webinar Covers
      </h3>
      <p className="text-muted-foreground mb-8">
        A structured walkthrough of Nubra's core trading infrastructure
      </p>

      <div className="space-y-0">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative pl-8 pb-8 last:pb-0 border-l border-border/50 last:border-l-transparent"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />
            
            {/* Time badge */}
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-mono text-muted-foreground">
                {item.time}
              </span>
            </div>

            {/* Content */}
            <h4 className="text-base font-semibold text-foreground mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
};

export default WebinarAgenda;
