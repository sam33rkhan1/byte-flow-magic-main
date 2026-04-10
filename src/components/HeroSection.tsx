import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wifi, Monitor, Shield, Smartphone, CheckCircle } from "lucide-react";
import { usePopup } from "@/context/PopupContext";

const floatingCards = [
  { icon: Wifi, label: "Wi-Fi Optimized", value: "850 Mbps", color: "from-primary to-cyan", delay: 0, className: "top-[18%] left-[5%] md:left-[8%]" },
  { icon: Monitor, label: "Microsoft 365", value: "All Systems Go", color: "from-cyan to-glow", delay: 0.2, className: "top-[35%] right-[3%] md:right-[6%]" },
  { icon: Shield, label: "Security Status", value: "Protected", color: "from-primary to-electric", delay: 0.4, className: "bottom-[28%] left-[2%] md:left-[12%]" },
  { icon: Smartphone, label: "Smart Home", value: "12 Devices", color: "from-glow to-cyan", delay: 0.6, className: "bottom-[15%] right-[5%] md:right-[10%]" },
  { icon: CheckCircle, label: "Ticket Resolved", value: "< 2 hours", color: "from-electric to-primary", delay: 0.8, className: "top-[60%] left-[20%] md:left-[25%] hidden md:flex" },
];

const HeroSection = () => {
  const { openBook, openRemote } = usePopup();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-navy">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/8 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark mb-8">
              <div className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="text-sm font-medium text-navy-foreground/80">Premium IT Support in Amsterdam</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-primary-foreground mb-6"
          >
            One IT Partner for{" "}
            <span className="gradient-text">Everything</span>{" "}
            at Home & Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-navy-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Fast onsite and remote IT support for Amsterdam homes, freelancers, and businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="hero" size="lg" className="text-base px-8 py-6 rounded-xl" onClick={openBook}>
              Book a Visit
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6 rounded-xl" onClick={openRemote}>
              Start Remote Support
            </Button>
          </motion.div>
        </div>

        {/* Floating UI Cards */}
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + card.delay }}
            className={`absolute ${card.className} hidden sm:flex`}
          >
            <div className={`glass-card-dark p-3 md:p-4 flex items-center gap-3 animate-float`} style={{ animationDelay: `${card.delay * 2}s` }}>
              <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0`}>
                <card.icon size={18} className="text-primary-foreground" />
              </div>
              <div>
                <p className="text-[11px] md:text-xs text-navy-foreground/50">{card.label}</p>
                <p className="text-xs md:text-sm font-semibold text-navy-foreground">{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
