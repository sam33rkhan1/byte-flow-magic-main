import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Monitor } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-40 section-navy relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-primary-foreground mb-6 leading-tight">
            Your technology,<br />finally{" "}
            <span className="gradient-text">stress-free</span>
          </h2>
          <p className="text-lg md:text-xl text-navy-foreground/50 mb-12 max-w-xl mx-auto leading-relaxed">
            Join hundreds of Amsterdam households and businesses who never worry about IT again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl gap-2" onClick={() => window.location.href = "mailto:hello@huisbyte.nl?subject=Book%20a%20Visit"}>
              Book a Visit <ArrowRight size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl gap-2" onClick={() => window.location.href = "mailto:hello@huisbyte.nl?subject=Remote%20Support%20Request"}>
              <Monitor size={18} /> Start Remote Support
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl gap-2 border-destructive/50 hover:bg-destructive/20" onClick={() => window.location.href = "tel:+31201234567"}>
              <Phone size={18} /> Emergency Help
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
