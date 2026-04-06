import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, Building2, AlertTriangle } from "lucide-react";

const oneTimeServices = [
  { service: "On-site diagnostic & fix (1 hr)", price: "€85" },
  { service: "On-site diagnostic & fix (2 hrs)", price: "€150" },
  { service: "PC / laptop setup & configuration", price: "€99" },
  { service: "Microsoft 365 account + email setup", price: "€149" },
  { service: "Windows reinstall & data migration", price: "€179" },
  { service: "Wi-Fi network setup & optimisation", price: "€129" },
  { service: "Smart home / device integration", price: "€149" },
  { service: "Printer setup & troubleshooting", price: "€79" },
  { service: "Small business M365 migration (per user)", price: "€79/user" },
];

const businessServices = [
  { service: "Azure AD / Entra ID setup (up to 10 users)", price: "€299" },
  { service: "Intune device enrolment (per device)", price: "€39/device" },
];

const emergencyServices = [
  { service: "Emergency call-out (same day, within 2 hrs)", price: "€149 + €95/hr" },
  { service: "After-hours emergency (evenings/weekends)", price: "€199 + €120/hr" },
];

type ServiceRow = { service: string; price: string };

function ServiceTable({ rows, accent = false }: { rows: ServiceRow[]; accent?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border/40">
      <div className="grid grid-cols-[1fr_auto]">
        <div className="px-4 py-2.5 bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border-b border-border/40">
          Service
        </div>
        <div className="px-6 py-2.5 bg-primary/10 text-xs font-bold uppercase tracking-widest text-primary border-b border-border/40 text-right">
          Price (EUR)
        </div>
        {rows.map((row, i) => (
          <>
            <div
              key={`s-${i}`}
              className={`px-4 py-3.5 text-sm text-foreground/80 border-b border-border/30 ${
                i % 2 === 0 ? "bg-card" : "bg-card/50"
              }`}
            >
              {row.service}
            </div>
            <div
              key={`p-${i}`}
              className={`px-6 py-3.5 text-sm font-semibold text-right border-b border-border/30 whitespace-nowrap ${
                accent ? "text-destructive" : "text-cyan"
              } ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}
            >
              {row.price}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

const OneTimeServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services-pricing" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">One-Time Services</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Pay only for what<br />
            <span className="gradient-text">you need</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
            No subscription required. Book a single session or service and we'll handle the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Column 1 — Standard one-time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench size={16} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground">General Services</h3>
            </div>
            <ServiceTable rows={oneTimeServices} />
          </motion.div>

          {/* Column 2 — Business + Emergency stacked */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Business */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 size={16} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground">Business & Cloud</h3>
              </div>
              <ServiceTable rows={businessServices} />
            </div>

            {/* Emergency */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle size={16} className="text-destructive" />
                </div>
                <h3 className="font-bold text-foreground">Emergency Call-Out</h3>
              </div>
              <ServiceTable rows={emergencyServices} accent />

              {/* Emergency CTA */}
              <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-4 text-sm text-destructive/80">
                <span className="font-semibold text-destructive">24/7 emergency line:</span>{" "}
                <a
                  href="tel:+31201234567"
                  className="underline underline-offset-2 hover:text-destructive transition-colors"
                >
                  +31 20 123 4567
                </a>
                <p className="mt-1 text-xs text-destructive/60">1-hour response across all Amsterdam districts</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All prices exclude VAT (BTW). Travel within Amsterdam included. Prices subject to change — confirmed at booking.
        </motion.p>
      </div>
    </section>
  );
};

export default OneTimeServicesSection;
