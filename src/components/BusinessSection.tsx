import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Users, Monitor, HardDrive, Network, Presentation } from "lucide-react";

const capabilities = [
  { icon: Users, title: "Team Onboarding", desc: "Laptops configured, accounts created, ready day one" },
  { icon: Monitor, title: "Kiosk Displays", desc: "Digital signage powered by Raspberry Pi solutions" },
  { icon: HardDrive, title: "Server Management", desc: "Local and cloud infrastructure, fully managed" },
  { icon: Network, title: "Network Design", desc: "Enterprise-grade networking for growing teams" },
  { icon: Presentation, title: "Meeting Rooms", desc: "AV setup, video conferencing, and screen sharing" },
  { icon: Building2, title: "Office Setup", desc: "Complete IT infrastructure from day one" },
];

const BusinessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 section-navy relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-cyan uppercase tracking-widest mb-4">Business IT</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-primary-foreground">
            Transform your <span className="gradient-text">business IT</span>
          </h2>
          <p className="text-lg text-navy-foreground/50 mt-4 max-w-xl mx-auto">
            From boutique offices to scaling startups — enterprise-grade IT without the enterprise price tag.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card-dark p-6 hover-lift group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center mb-4 group-hover:from-primary group-hover:to-cyan transition-all duration-500">
                <cap.icon size={22} className="text-cyan group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-base font-bold text-primary-foreground mb-1">{cap.title}</h3>
              <p className="text-sm text-navy-foreground/50 leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
