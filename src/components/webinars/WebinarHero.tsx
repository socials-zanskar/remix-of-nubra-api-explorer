import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const WebinarHero = () => {
  const scrollToAgenda = () => {
    document.getElementById('webinar-agenda')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRegistration = () => {
    document.getElementById('upcoming-webinar')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Technical Sessions
          </motion.div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Powering Serious Trading{' '}
            <span className="text-[#6E83FB]">Infrastructure</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Live technical webinars on Nubra APIs, execution systems, and algorithmic trading architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group px-8 py-6 text-base font-semibold"
              onClick={scrollToRegistration}
            >
              Register for Upcoming Webinar
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-base font-medium border-border/50 hover:bg-card/80"
              onClick={scrollToAgenda}
            >
              View Agenda
              <ChevronDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebinarHero;
