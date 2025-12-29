import { motion } from "framer-motion";
import { Play, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PastWebinar {
  id: string;
  title: string;
  date: string;
  duration: string;
  hasRecording: boolean;
  topics: string[];
}

interface PastWebinarsProps {
  webinars: PastWebinar[];
}

const PastWebinars = ({ webinars }: PastWebinarsProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-foreground mb-6">
        Past Webinars
      </h3>

      <div className="grid gap-4">
        {webinars.map((webinar, index) => (
          <motion.div
            key={webinar.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group bg-card/30 border border-border/30 rounded-lg p-5 hover:border-border/60 hover:bg-card/50 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {webinar.title}
                  </h4>
                  {webinar.hasRecording && (
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-500 bg-green-500/10">
                      Recording Available
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>{webinar.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>{webinar.duration}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {webinar.topics.map((topic) => (
                    <Badge 
                      key={topic} 
                      variant="secondary"
                      className="text-xs bg-secondary/50 text-muted-foreground border-0"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {webinar.hasRecording && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="shrink-0 border-border/50 hover:border-primary hover:text-primary"
                >
                  <Play className="h-4 w-4 mr-2" />
                  View Recap
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PastWebinars;
