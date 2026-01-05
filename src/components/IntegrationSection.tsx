import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { GlassCard } from "@/components/ui/glass-card";

// Country codes for phone input
const countryCodes = [
  { code: "+91", country: "IN" },
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+971", country: "AE" },
  { code: "+65", country: "SG" },
  { code: "+852", country: "HK" },
];

const userTypes = [
  "Retail Trader",
  "Institution / Fund / PMS",
  "Algo Platform / Trading Desk",
  "Developer / Builder",
];

const interests = [
  "Market Data & WebSockets",
  "Order Execution & Flexi Baskets",
  "Margin & Hedge Logic",
  "Portfolio & PnL APIs",
  "Python SDK & REST APIs",
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

export const IntegrationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
  });
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all contact details");
      return;
    }
    if (!selectedUserType) {
      toast.error("Please select who you are");
      return;
    }
    if (selectedInterests.length === 0) {
      toast.error("Please select at least one interest");
      return;
    }
    if (!selectedExperience) {
      toast.error("Please select your experience level");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="integrate" className="relative w-full py-24 md:py-32 overflow-hidden">
        
        <div className="relative z-10 container mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Thanks! Our team will reach out shortly based on your integration needs.
            </h3>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="integrate" className="relative w-full py-24 md:py-32 overflow-hidden">

      <div className="relative z-10 container mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Integrate with Nubra
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us who you are and what you want to build — we'll help you integrate faster.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto"
        >
          <GlassCard className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Step 1: Contact Details */}
              <div className="space-y-5">
                <div className="grid gap-4">
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-[#5E5E76]/40 text-foreground placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  
                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Work email"
                    className="w-full px-4 py-3 rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-[#5E5E76]/40 text-foreground placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  
                  {/* Phone with Country Code */}
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="px-3 py-3 rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-[#5E5E76]/40 text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all appearance-none cursor-pointer"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.code} {c.country}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile number"
                      className="flex-1 px-4 py-3 rounded-[12px] bg-white/[0.04] backdrop-blur-sm border border-[#5E5E76]/40 text-foreground placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  We'll only use this to contact you regarding integration.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/30" />

              {/* Step 2: Intent Qualification */}
              <div className="space-y-8">
                {/* Who are you? */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Who are you?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {userTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedUserType(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedUserType === type
                            ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_12px_hsl(245_82%_67%/0.25)]"
                            : "bg-secondary/40 text-muted-foreground border border-border/40 hover:border-border/60 hover:text-foreground"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What are you interested in? */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    What are you interested in?{" "}
                    <span className="text-muted-foreground font-normal">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedInterests.includes(interest)
                            ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_12px_hsl(245_82%_67%/0.25)]"
                            : "bg-secondary/40 text-muted-foreground border border-border/40 hover:border-border/60 hover:text-foreground"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Experience Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {experienceLevels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelectedExperience(level)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          selectedExperience === level
                            ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_12px_hsl(245_82%_67%/0.25)]"
                            : "bg-secondary/40 text-muted-foreground border border-border/40 hover:border-border/60 hover:text-foreground"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-base transition-all duration-200 hover:bg-primary/90 hover:shadow-[0_8px_24px_hsl(245_82%_67%/0.35)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {isSubmitting ? "Submitting..." : "Request Integration"}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
