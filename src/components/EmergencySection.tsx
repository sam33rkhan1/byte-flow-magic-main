import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, MapPin, Phone } from "lucide-react";

const EmergencySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-destructive/10 blur-[80px]" />

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20 border border-destructive/30 mb-6">
              <AlertTriangle size={14} className="text-destructive" />
              <span className="text-xs font-bold text-destructive uppercase tracking-wider">Emergency IT Support</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-4 tracking-tight">
              IT emergency? We're on the way.
            </h2>
            <p className="text-navy-foreground/50 text-lg mb-10 max-w-lg mx-auto">
              Crashed laptop, ransomware attack, or total network failure — we respond within 1 hour across Amsterdam.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
              <div className="glass-card-dark p-4 rounded-xl text-center">
                <Clock size={20} className="text-cyan mx-auto mb-2" />
                <p className="text-sm font-bold text-primary-foreground">1-Hour</p>
                <p className="text-xs text-navy-foreground/50">Response time</p>
              </div>
              <div className="glass-card-dark p-4 rounded-xl text-center">
                <MapPin size={20} className="text-cyan mx-auto mb-2" />
                <p className="text-sm font-bold text-primary-foreground">Amsterdam</p>
                <p className="text-xs text-navy-foreground/50">All districts</p>
              </div>
              <div className="glass-card-dark p-4 rounded-xl text-center">
                <Phone size={20} className="text-cyan mx-auto mb-2" />
                <p className="text-sm font-bold text-primary-foreground">24/7</p>
                <p className="text-xs text-navy-foreground/50">Available</p>
              </div>
            </div>

            <Button variant="glow" size="lg" className="px-10 py-6 rounded-xl text-base" onClick={() => window.location.href = "tel:+31201234567"}>
              Call Emergency Support
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmergencySection;
