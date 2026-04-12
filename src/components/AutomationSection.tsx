import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Settings, Shield, Cpu } from "lucide-react";

const features = [
  { icon: Terminal, title: "PowerShell Automation", desc: "Custom scripts that handle updates, backups, and maintenance automatically" },
  { icon: Settings, title: "Intune Management", desc: "Enterprise-grade device management for every endpoint in your org" },
  { icon: Shield, title: "Zero-Touch Security", desc: "Automated threat detection, patching, and compliance enforcement" },
  { icon: Cpu, title: "Smart Monitoring", desc: "AI-powered alerts that predict failures before they impact you" },
];

const AutomationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="automation" className="py-24 md:py-32 section-navy relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-cyan/8 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold text-cyan uppercase tracking-widest mb-4">Automation</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-primary-foreground mb-6 leading-tight">
              Automation that fixes problems{" "}
              <span className="gradient-text">before they happen</span>
            </h2>
            <p className="text-lg text-navy-foreground/50 mb-10 leading-relaxed">
              We deploy enterprise-grade automation tools — PowerShell, Intune, and custom monitoring — so your devices stay healthy, secure, and fast without you lifting a finger.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass-card-dark p-4 flex items-start gap-3 hover-lift"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-cyan/20 flex items-center justify-center shrink-0">
                    <f.icon size={18} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary-foreground mb-1">{f.title}</h3>
                    <p className="text-xs text-navy-foreground/50 leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Mock terminal/dashboard */}
            <div className="glass-card-dark p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-xs text-navy-foreground/40 ml-2 font-mono">automation.ps1</span>
              </div>
              <div className="font-mono text-xs space-y-2 text-navy-foreground/70">
                <p><span className="text-cyan">$</span> Get-DeviceCompliance -Tenant "HuisByte"</p>
                <p className="text-green-400/80">✓ 24 devices compliant</p>
                <p className="text-green-400/80">✓ 0 security alerts</p>
                <p><span className="text-cyan">$</span> Update-AllEndpoints -AutoPatch</p>
                <p className="text-navy-foreground/40">Installing KB5034441... done</p>
                <p className="text-navy-foreground/40">Installing KB5034439... done</p>
                <p className="text-green-400/80">✓ All endpoints up to date</p>
                <p><span className="text-cyan">$</span> Invoke-BackupPolicy -Schedule Daily</p>
                <p className="text-green-400/80">✓ Backup policy active — next run: 02:00</p>
                <p className="animate-pulse text-cyan">█</p>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -top-4 -right-4 glass-card-dark p-3 rounded-xl animate-float">
              <p className="text-xs text-navy-foreground/50">Uptime</p>
              <p className="text-lg font-bold text-cyan">99.98%</p>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-card-dark p-3 rounded-xl animate-float-delayed">
              <p className="text-xs text-navy-foreground/50">Issues prevented</p>
              <p className="text-lg font-bold text-primary">1,247</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;
