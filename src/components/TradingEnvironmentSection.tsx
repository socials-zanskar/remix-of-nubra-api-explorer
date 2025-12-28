import { motion } from "framer-motion";
import { Activity, BarChart3, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import UATGif from "@/assets/UAT.gif";
import PRODGif from "@/assets/PROD.gif";

const features = [
  {
    icon: Activity,
    title: "Real-time Positions & PnL",
  },
  {
    icon: BarChart3,
    title: "Live Order Book & Market Data",
  },
  {
    icon: ArrowRightLeft,
    title: "Same APIs, Same UX — UAT to PROD",
  },
];

export const TradingEnvironmentSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background matching hero */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[hsl(222_50%_5%)] to-[hsl(222_50%_3%)]" />
      
      {/* Subtle glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[hsl(260_82%_55%)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trade, Test, and Build with a{" "}
            <span className="text-gradient">Real UAT Environment</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Nubra is the first broker to offer a full-featured UAT environment with a real trading dashboard — not just APIs.
          </p>
        </motion.div>

        {/* 2-Column Grid for GIFs */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* UAT Environment */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              UAT Trading Dashboard
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm shadow-lg shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <img
                src={UATGif}
                alt="UAT Trading Dashboard - Simulate live market conditions"
                className="w-full h-auto relative z-10"
              />
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Simulate live market conditions, place trades, and track positions in real time — without risking capital.
            </p>
          </motion.div>

          {/* Production Environment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Production Trading Dashboard
            </h3>
            <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm shadow-lg shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              <img
                src={PRODGif}
                alt="Production Trading Dashboard - Monitor real positions and P&L"
                className="w-full h-auto relative z-10"
              />
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              Monitor real positions, P&L, margins, and orders seamlessly in production.
            </p>
          </motion.div>
        </div>

        {/* Feature Highlights - 3 Column Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border/30"
            >
              <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium text-sm md:text-base">
                {feature.title}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Callout Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-lg md:text-xl text-foreground/90 font-medium">
            Build once. Test in UAT. Deploy to production —{" "}
            <span className="text-primary">without changing your code.</span>
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            size="lg"
            className="group px-8 border-border/50 hover:border-primary/50 hover:bg-primary/5"
          >
            View API Docs
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Button>
          <Button
            size="lg"
            className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground glow-purple"
          >
            Start with UAT
            <span className="ml-2">→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
