import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, Lightbulb, Speaker, Camera, Thermometer, Tv } from "lucide-react";

const devices = [
  { icon: Wifi, label: "Mesh Wi-Fi", status: "850 Mbps" },
  { icon: Lightbulb, label: "Smart Lighting", status: "12 zones" },
  { icon: Speaker, label: "Audio System", status: "Connected" },
  { icon: Camera, label: "Security Cams", status: "4 active" },
  { icon: Thermometer, label: "Climate Control", status: "21°C" },
  { icon: Tv, label: "Media Displays", status: "3 screens" },
];

const SmartHomeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Smart Home & Wi-Fi</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6 leading-tight">
              Your entire home,{" "}
              <span className="gradient-text">perfectly connected</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From mesh Wi-Fi that blankets every room to smart devices that all play nicely together — we design, install, and manage your connected home.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {devices.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="bg-card border border-border/50 rounded-xl p-4 text-center hover-lift"
                >
                  <d.icon size={22} className="mx-auto mb-2 text-primary" />
                  <p className="text-xs font-bold text-foreground">{d.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{d.status}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Visual Wi-Fi signal representation */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border-2 border-primary/10 animate-pulse"
                  style={{
                    transform: `scale(${0.4 + ring * 0.2})`,
                    animationDelay: `${ring * 0.5}s`,
                    animationDuration: "3s",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center glow-effect">
                  <Wifi size={32} className="text-primary-foreground" />
                </div>
              </div>

              {/* Orbiting device icons */}
              {devices.slice(0, 4).map((d, i) => {
                const angle = (i * 90 - 45) * (Math.PI / 180);
                const r = 120;
                return (
                  <div
                    key={d.label}
                    className="absolute w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center shadow-sm animate-float"
                    style={{
                      left: `calc(50% + ${Math.cos(angle) * r}px - 20px)`,
                      top: `calc(50% + ${Math.sin(angle) * r}px - 20px)`,
                      animationDelay: `${i * 0.8}s`,
                    }}
                  >
                    <d.icon size={16} className="text-primary" />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartHomeSection;
