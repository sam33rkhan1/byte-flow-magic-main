import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, ShieldCheck, Zap, Activity, RotateCcw } from "lucide-react";

const cards = [
  { icon: Wrench, title: "Fix", description: "Expert troubleshooting for any device, network, or software issue", gradient: "from-primary to-electric" },
  { icon: ShieldCheck, title: "Protect", description: "Proactive security, backups, and threat prevention for peace of mind", gradient: "from-electric to-cyan" },
  { icon: Zap, title: "Automate", description: "PowerShell scripts and Intune policies that eliminate repetitive tasks", gradient: "from-cyan to-glow" },
  { icon: Activity, title: "Monitor", description: "24/7 device health monitoring and performance optimization", gradient: "from-glow to-primary" },
  { icon: RotateCcw, title: "Recover", description: "Emergency data recovery and disaster restoration when it matters most", gradient: "from-primary to-cyan" },
];

const UnifiedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Everything you need</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Unify your <span className="gradient-text">technology</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            One partner to fix, protect, automate, monitor, and recover all your tech.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group hover-lift bg-card border border-border/50 rounded-2xl p-6 md:p-8 text-center cursor-pointer"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UnifiedSection;
