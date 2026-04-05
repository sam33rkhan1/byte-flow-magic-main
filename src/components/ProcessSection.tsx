import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck, Search, Wrench, Lock, Coffee } from "lucide-react";

const steps = [
  { icon: CalendarCheck, step: "01", title: "Book", description: "Schedule onsite or remote support in seconds" },
  { icon: Search, step: "02", title: "Diagnose", description: "We pinpoint the exact issue with expert precision" },
  { icon: Wrench, step: "03", title: "Fix", description: "Fast, clean resolution — no unnecessary upsells" },
  { icon: Lock, step: "04", title: "Secure", description: "We lock everything down so it doesn't happen again" },
  { icon: Coffee, step: "05", title: "Relax", description: "Sit back knowing your technology just works" },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-32 section-navy relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-cyan uppercase tracking-widest mb-4">How it works</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-primary-foreground">
            Five steps to <span className="gradient-text">stress-free</span> IT
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              <div className="glass-card-dark p-6 md:p-8 text-center hover-lift h-full">
                <span className="text-xs font-bold text-cyan/60 tracking-widest">{step.step}</span>
                <div className="w-12 h-12 mx-auto mt-3 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center group-hover:from-primary group-hover:to-cyan transition-all duration-500">
                  <step.icon size={22} className="text-cyan group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-primary-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-navy-foreground/50 leading-relaxed">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/40 to-cyan/40" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
