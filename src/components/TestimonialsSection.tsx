import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Sarah van der Berg", role: "Freelance Designer, Amsterdam-Zuid", text: "HuisByte fixed my Wi-Fi dead zones in under an hour. My whole apartment now gets full speed. Absolutely worth every euro.", rating: 5 },
  { name: "Mark Thompson", role: "Expat, Amsterdam-West", text: "Moving to Amsterdam was stressful enough. HuisByte set up my entire home office — printer, VPN, Microsoft 365 — in one visit. Lifesaver.", rating: 5 },
  { name: "Lisa de Groot", role: "Boutique Agency Owner", text: "We switched from a big IT firm to HuisByte. Better response times, actual humans who explain things, and our Intune setup finally works.", rating: 5 },
  { name: "Jan Bakker", role: "Remote Worker, Jordaan", text: "Emergency laptop crash on a Friday evening. HuisByte had me back online within 2 hours. That kind of service is priceless.", rating: 5 },
  { name: "Emma Visser", role: "Smart Home Enthusiast", text: "They configured my Philips Hue, Sonos, and security cameras to all work together seamlessly. My home finally feels like the future.", rating: 5 },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Trusted by Amsterdam <span className="gradient-text">professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-4">Families, freelancers, and growing teams</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-cyan text-cyan" />
              ))}
            </div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
              "{testimonials[current].text}"
            </p>
            <p className="font-bold text-foreground">{testimonials[current].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`relative w-6 h-6 flex items-center justify-center`}
                >
                  <span className={`rounded-full transition-all ${
                    i === current ? "bg-primary w-6 h-2" : "bg-border w-2 h-2"
                  }`} />
                </button>
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
