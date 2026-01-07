import { motion } from "framer-motion";
import { Calendar, Clock, Timer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WebinarProps {
  webinar: {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    time: string;
    duration: string;
    description: string;
    topics: string[];
    registrationUrl: string;
  };
  onRegisterClick?: () => void;
}

const UpcomingWebinarCard = ({ webinar, onRegisterClick }: WebinarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-xl blur-sm" />
      
      <div className="relative bg-card border border-primary/20 rounded-xl p-6 lg:p-8">
        {/* Header badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-green-500 uppercase tracking-wider">
              Next Webinar
            </span>
          </div>
        </div>

        {/* Title section */}
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {webinar.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          {webinar.subtitle}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6 mb-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{webinar.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{webinar.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" />
            <span>{webinar.duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {webinar.description}
        </p>

        {/* Topic pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {webinar.topics.map((topic) => (
            <Badge 
              key={topic} 
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Button 
          size="lg" 
          className="group w-full sm:w-auto px-8 py-6 text-base font-semibold"
          onClick={onRegisterClick}
        >
          Register Now
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};

export default UpcomingWebinarCard;
