import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  Code2, Palette, Zap, Search, ShoppingCart, Smartphone,
  Check, Star, ArrowRight, Mail, Phone, MapPin,
  Globe, Headphones, ChevronRight, ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Google Sheets review fetch ───────────────────────────────────────────────
const SHEET_ID = "1D1EiqbbrMFaFGJhDEJgb5RPasiJTQwBpvhUEKBEmumw";

interface LiveReview {
  name: string;
  role: string;
  text: string;
  rating: number;
}

async function fetchApprovedReviews(): Promise<LiveReview[]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  const res = await fetch(url);
  const raw = await res.text();
  // Strip the gviz wrapper: /*O_o*/\ngoogle.visualization.Query.setResponse({...});
  const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
  const data = JSON.parse(json);
  const rows: LiveReview[] = [];
  for (const row of data?.table?.rows ?? []) {
    const cols = row.c ?? [];
    const getValue = (i: number) => String(cols[i]?.v ?? "").trim();
    // Sheet layout: A=Timestamp, B=Name, C=Role, D=Rating, E=Review Text, F=Approved
    const approved = getValue(5).toLowerCase();
    if (approved !== "yes") continue;
    const ratingRaw = getValue(3);
    const rating = parseInt(ratingRaw, 10);
    rows.push({
      name: getValue(1),
      role: getValue(2),
      text: getValue(4),
      rating: isNaN(rating) ? 5 : Math.min(5, Math.max(1, rating)),
    });
  }
  return rows;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const services = [
  { icon: <Palette size={26} />, title: "Custom Design", description: "Pixel-perfect designs tailored to your brand — no templates, no shortcuts." },
  { icon: <Code2 size={26} />, title: "Web Development", description: "Fast, modern websites built with the latest tech. Clean code, great performance." },
  { icon: <ShoppingCart size={26} />, title: "E-commerce", description: "Full online shops with payment integration, inventory management, and more." },
  { icon: <Search size={26} />, title: "SEO & Analytics", description: "Get found on Google. We set up tracking, optimise structure, and boost rankings." },
  { icon: <Smartphone size={26} />, title: "Mobile-First", description: "Every site looks and works great on phones, tablets, and desktops." },
  { icon: <Zap size={26} />, title: "Speed Optimisation", description: "Lightning-fast load times that keep visitors engaged and Google happy." },
];


const plans = [
  {
    name: "Starter", price: "499", period: "one-time", popular: false,
    description: "Perfect for individuals & small businesses getting online",
    features: ["Up to 5 pages", "Mobile-friendly design", "Contact form", "Basic SEO setup", "Domain & hosting setup", "1 round of revisions", "Delivered in 7 days"],
  },
  {
    name: "Business", price: "899", period: "one-time", popular: true,
    description: "A full website for growing businesses",
    features: ["Up to 10 pages", "Custom design to your brand", "Mobile-friendly & fast", "Contact & booking form", "Google Analytics setup", "Advanced SEO setup", "2 rounds of revisions", "Delivered in 14 days"],
  },
  {
    name: "E-commerce", price: "1,299", period: "one-time", popular: false,
    description: "Sell products online with a full online shop",
    features: ["Up to 20 pages", "Full online shop setup", "Payment integration", "Product management", "Mobile-friendly & fast", "SEO & analytics setup", "3 rounds of revisions", "Delivered in 21 days"],
  },
];

const steps = [
  { number: "01", title: "Discovery Call", desc: "We learn about your business, goals, and what success looks like for your website.", icon: <Headphones size={18} /> },
  { number: "02", title: "Design & Prototype", desc: "You get a visual mockup to review before a single line of code is written.", icon: <Palette size={18} /> },
  { number: "03", title: "Build & Review", desc: "We build your site and share it for feedback before going live.", icon: <Code2 size={18} /> },
  { number: "04", title: "Launch & Support", desc: "Your site goes live. We handle everything and remain on hand after launch.", icon: <Globe size={18} /> },
];

const testimonials = [
  { name: "Lena de Vries", role: "Owner, Amsterdam Flowers", rating: 5, text: "HuisByte built our online shop in under 2 weeks. Orders went up 40% in the first month. Brilliant team." },
  { name: "Mark Janssen", role: "Director, JM Legal", rating: 5, text: "Professional, fast, and genuinely listened to what we needed. Our new site looks incredible and works perfectly." },
  { name: "Sophie Bakker", role: "Founder, FitLife Studio", rating: 5, text: "We went from a basic template to a fully custom site with booking integration. Our clients love it." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay } }),
};

// ─── WebStudio Page ───────────────────────────────────────────────────────────
const WebStudio = () => {
  const [formSent, setFormSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Live reviews from Google Sheets
  const [liveReviews, setLiveReviews] = useState<LiveReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    fetchApprovedReviews()
      .then(setLiveReviews)
      .catch(() => setLiveReviews([]))
      .finally(() => setReviewsLoading(false));
  }, []);

  const heroRef = useRef(null);
  const servicesRef = useRef(null);

  const pricingRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  const servicesInView = useInView(servicesRef, { once: true, margin: "-80px" });

  const pricingInView = useInView(pricingRef, { once: true, margin: "-80px" });
  const processInView = useInView(processRef, { once: true, margin: "-80px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-80px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Web Studio Enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:info@huisbyte.nl?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/8 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/6 blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft size={14} /> Back to HuisByte
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={11} /> HuisByte Web Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-6 text-foreground"
          >
            Websites that<br />
            <span className="gradient-text">win clients</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            We design and build fast, beautiful websites for businesses in Amsterdam and beyond.
            No templates. No fluff. Just results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="mailto:info@huisbyte.nl?subject=Website%20Enquiry"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-cyan text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Start Your Project <ArrowRight size={16} />
            </a>
            <a
              href="#ws-pricing"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-muted-foreground font-semibold text-base hover:border-foreground/30 hover:text-foreground transition-all"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: "50+", label: "Sites Launched" },
              { value: "7 days", label: "Average Delivery" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "€499", label: "Starting Price" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-foreground mb-1">{s.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section id="ws-services" ref={servicesRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={servicesInView ? "visible" : "hidden"} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Everything your website<br />
              <span className="gradient-text">needs to succeed</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <motion.div
                key={s.title} variants={fadeUp} initial="hidden" animate={servicesInView ? "visible" : "hidden"} custom={i * 0.08}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {s.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="ws-pricing" ref={pricingRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate={pricingInView ? "visible" : "hidden"} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Pricing</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Simple pricing,<br />
              <span className="gradient-text">no surprises</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Fast, modern, mobile-friendly websites built to your brand. No templates — designed for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name} variants={fadeUp} initial="hidden" animate={pricingInView ? "visible" : "hidden"} custom={i * 0.1}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary/40 scale-[1.02] shadow-xl shadow-primary/10"
                    : "bg-card border border-border/50 shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-cyan text-primary-foreground text-xs font-bold whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="text-base font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black text-foreground">€{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={14} className="shrink-0 mt-0.5 text-cyan" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`mailto:info@huisbyte.nl?subject=Web%20Studio%20Enquiry%20-%20${encodeURIComponent(plan.name)}`}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-cyan text-primary-foreground hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  Get Started
                </a>
              </motion.div>
            ))}
          </div>

          {/* ── One-Time Web Services Table ────────────────────────────── */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={pricingInView ? "visible" : "hidden"} custom={0.4}
            className="max-w-5xl mx-auto mt-16"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe size={16} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base">Web Development — One-Time Services</h3>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border/50">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto] bg-primary/10">
                <div className="px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary border-b border-border/40">
                  Service
                </div>
                <div className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary border-b border-border/40 text-right">
                  Price (EUR)
                </div>
              </div>

              {/* Table rows */}
              {[
                { service: "Website redesign", price: "from €399" },
                { service: "Landing page", price: "from €249" },
                { service: "Website maintenance (per month)", price: "from €49/mo" },
                { service: "Domain & hosting setup", price: "€79" },
              ].map((row, i) => (
                <div key={row.service} className={`grid grid-cols-[1fr_auto] ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}>
                  <div className="px-5 py-4 text-sm text-foreground/80 border-b border-border/30">
                    {row.service}
                  </div>
                  <div className="px-6 py-4 text-sm font-semibold text-cyan text-right border-b border-border/30 whitespace-nowrap">
                    {row.price}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              All websites are mobile-friendly, fast, and built to your brand. Contact us for a custom quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section id="ws-process" ref={processRef} className="py-24 md:py-32 bg-secondary/20">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={processInView ? "visible" : "hidden"} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              From idea to live<br />
              <span className="gradient-text">in days, not months</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={s.number} variants={fadeUp} initial="hidden" animate={processInView ? "visible" : "hidden"} custom={i * 0.1}
                className="relative p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl font-black text-foreground/8 leading-none">{s.number}</span>
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {s.icon}
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={15} className="absolute -right-3 top-1/2 -translate-y-1/2 text-border hidden lg:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section ref={testimonialsRef} className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" animate={testimonialsInView ? "visible" : "hidden"} className="text-center mb-16">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Clients love<br />
              <span className="gradient-text">what we build</span>
            </h2>
          </motion.div>

          {/* Loading skeleton */}
          {reviewsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[0, 1, 2].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 animate-pulse">
                  <div className="flex gap-1 mb-4">{[0,1,2,3,4].map(j => <div key={j} className="w-3.5 h-3.5 rounded-sm bg-border/50" />)}</div>
                  <div className="h-3 bg-border/40 rounded mb-2 w-full" />
                  <div className="h-3 bg-border/40 rounded mb-2 w-4/5" />
                  <div className="h-3 bg-border/40 rounded mb-5 w-3/5" />
                  <div className="h-3.5 bg-border/50 rounded mb-1 w-1/2" />
                  <div className="h-2.5 bg-border/30 rounded w-2/5" />
                </div>
              ))}
            </div>
          )}

          {/* Live or fallback reviews */}
          {!reviewsLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {(liveReviews.length > 0 ? liveReviews : testimonials).map((t, i) => (
                <motion.div
                  key={t.name + i} variants={fadeUp} initial="hidden" animate={testimonialsInView ? "visible" : "hidden"} custom={i * 0.1}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {t.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
                  )}
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </motion.div>
              ))}
            </div>
          )}
          {!reviewsLoading && liveReviews.length === 0 && (
            <p className="text-xs text-muted-foreground text-center mt-4 opacity-50">
              Showing example reviews — real client reviews will appear here once approved.
            </p>
          )}

          {/* Leave a Review CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={testimonialsInView ? "visible" : "hidden"} custom={0.35}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Happy with your website? We'd love to hear from you.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSePxjyz0DcgGyK14TT-IFzaej2TW_15rlGKQWLC3DC3hVd3kA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/40 text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
            >
              <Star size={15} className="fill-amber-400 text-amber-400" />
              Leave a Review
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────────────────────── */}
      <section id="ws-contact" ref={contactRef} className="py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan/5 blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            {/* Left */}
            <motion.div variants={fadeUp} initial="hidden" animate={contactInView ? "visible" : "hidden"}>
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
                Ready to build<br />
                <span className="gradient-text">your website?</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Tell us about your project and we'll get back to you within one business day. No commitment — just a friendly conversation.
              </p>
              {[
                { icon: <Mail size={15} />, text: "info@huisbyte.nl" },
                { icon: <Phone size={15} />, text: "+31 6 34 11 95 47" },
                { icon: <MapPin size={15} />, text: "Amsterdam, Netherlands" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {c.icon}
                  </div>
                  {c.text}
                </div>
              ))}
            </motion.div>

            {/* Right */}
            <motion.div variants={fadeUp} initial="hidden" animate={contactInView ? "visible" : "hidden"} custom={0.2}>
              {formSent ? (
                <div className="p-8 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                  <Check size={40} className="text-cyan mx-auto mb-4" />
                  <h3 className="text-foreground font-bold text-lg mb-2">Message sent!</h3>
                  <p className="text-muted-foreground text-sm">We'll be in touch within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border/50 space-y-5">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 block">Your Name</label>
                    <input
                      type="text" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jan de Vries"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 block">Email Address</label>
                    <input
                      type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@bedrijf.nl"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1.5 block">Tell Us About Your Project</label>
                    <textarea
                      required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="I need a website for my restaurant with online reservations..."
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-cyan text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WebStudio;
