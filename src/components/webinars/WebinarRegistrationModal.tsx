import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectablePill } from "@/components/ui/selectable-pill";
import { useIsMobile } from "@/hooks/use-mobile";

const personaOptions = [
  { value: "retail", label: "Retail Trader" },
  { value: "institution", label: "Institution / Fund / PMS" },
  { value: "algo_platform", label: "Algo Platform / Trading Desk" },
  { value: "developer", label: "Developer / Builder" },
] as const;

type Persona = typeof personaOptions[number]["value"];

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(1, "Phone number is required").regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
  email: z.string().trim().email("Invalid email address").max(255),
  persona: z.enum(["retail", "institution", "algo_platform", "developer"], {
    required_error: "Please select who you are",
  }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface WebinarRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  webinarId: string;
  webinarTitle: string;
}

const WebinarRegistrationModal = ({
  open,
  onOpenChange,
  webinarId,
  webinarTitle,
}: WebinarRegistrationModalProps) => {
  const isMobile = useIsMobile();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedPersona) {
      setValue("persona", selectedPersona, { shouldValidate: true });
    }
  }, [selectedPersona, setValue]);

  useEffect(() => {
    if (!open) {
      reset();
      setSelectedPersona(null);
    }
  }, [open, reset]);

  const onSubmit = (data: RegistrationFormData) => {
    // Build mail body as ONE formatted text string
    const mailbodyText = `
  Webinar Registration

  Name: ${data.name}
  Phone: ${data.phone}
  Email: ${data.email}

  Who are you:
  ${personaOptions.find(p => p.value === data.persona)?.label}
  `.trim();

    // Final payload exactly as backend wants
    const payload = {
      subject: `Webinar - ${data.email}`,
      mailbody: mailbodyText,
    };

    // Print locally for verification
    console.log("Webinar Payload Object:", payload);
    console.log("Webinar Payload JSON:");
    console.log(JSON.stringify(payload, null, 2));

    // Close modal after submit
    onOpenChange(false);
  };


  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm text-foreground/80">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Your full name"
          className="bg-white/5 border-[#5E5E76]/40 placeholder:text-white/40 focus:border-primary/50"
          {...register("name")}
          autoFocus={!isMobile}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm text-foreground/80">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className="bg-white/5 border-[#5E5E76]/40 placeholder:text-white/40 focus:border-primary/50"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm text-foreground/80">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="bg-white/5 border-[#5E5E76]/40 placeholder:text-white/40 focus:border-primary/50"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Persona Selection */}
      <div className="space-y-3">
        <Label className="text-sm text-foreground/80">
          Who are you? <span className="text-destructive">*</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {personaOptions.map((option) => (
            <SelectablePill
              key={option.value}
              isSelected={selectedPersona === option.value}
              onClick={() => setSelectedPersona(option.value)}
            >
              {option.label}
            </SelectablePill>
          ))}
        </div>
        {errors.persona && (
          <p className="text-xs text-destructive">{errors.persona.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full mt-6"
        disabled={!isValid || !selectedPersona}
      >
        Submit & Register
      </Button>
    </form>
  );

  const modalHeader = (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-foreground">Register for Webinar</h2>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{webinarTitle}</p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="bg-card border-t border-[#5E5E76]/40 px-6 pb-8 pt-4">
          <DrawerTitle className="sr-only">Register for Webinar</DrawerTitle>
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted mb-6" />
          {modalHeader}
          {formContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border border-[#5E5E76]/40 sm:max-w-md p-6">
        <DialogTitle className="sr-only">Register for Webinar</DialogTitle>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {modalHeader}
        {formContent}
      </DialogContent>
    </Dialog>
  );
};

export default WebinarRegistrationModal;
