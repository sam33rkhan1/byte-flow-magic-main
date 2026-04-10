import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "499",
    period: "one-time",
    description: "Perfect for individuals & small businesses getting online",
    features: [
      "Up to 5 pages",
      "Mobile-friendly design",
      "Contact form",
      "Basic SEO setup",
      "Domain & hosting setup",
      "1 round of revisions",
      "Delivered in 7 days",
    ],
    popular: false,
  },
  {
    name: "Business",
    price: "899",
    period: "one-time",
    description: "A full website for growing businesses in Amsterdam",
    features: [
      "Up to 10 pages",
      "Custom design to your brand",
      "Mobile-friendly & fast",
      "Contact & booking form",
      "Google Analytics setup",
      "Advanced SEO setup",
      "2 rounds of revisions",
      "Delivered in 14 days",
    ],
    popular: true,
  },
  {
    name: "E-commerce",
    price: "1,299",
    period: "one-time",
    description: "Sell products online with a full online shop",
    features: [
      "Up to 20 pages",
      "Full online shop setup",
      "Payment integration",
      "Product management",
      "Mobile-friendly & fast",
      "SEO & analytics setup",
      "3 rounds of revisions",
      "Delivered in 21 days",
    ],
    popular: false,
  },
];

const WebDevPricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="web-dev-plans" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Web Development</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground">
            Simple pricing,<br /><span className="gradient-text">no surprises</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
            Fast, modern, mobile-friendly websites built to your brand. No templates — designed for your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-2xl p-8 hover-lift ${
                plan.popular
                  ? "bg-gradient-to-b from-navy to-navy-light text-primary-foreground border-2 border-primary/30 scale-[1.02]"
                  : "bg-card border border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground text-xs font-bold">
                  Most Popular
                </div>
              )}
              <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "" : "text-foreground"}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-navy-foreground/60" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black">€{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-navy-foreground/50" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={16} className={`shrink-0 mt-0.5 ${plan.popular ? "text-cyan" : "text-primary"}`} />
                    <span className={plan.popular ? "text-navy-foreground/80" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.popular ? "hero" : "outline"}
                className="w-full rounded-xl py-5"
                onClick={() => window.location.href = `mailto:info@huisbyte.nl?subject=Website%20Enquiry%20-%20${encodeURIComponent(plan.name)}`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevPricingSection;
