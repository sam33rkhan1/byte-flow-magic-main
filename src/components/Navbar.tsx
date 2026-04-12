import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { usePopup } from "@/context/PopupContext";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#process" },
  { label: "Plans", href: "#plans" },
  { label: "One-Time Services", href: "#services-pricing" },
  { label: "Emergency IT Support", href: "#emergency" },
  { label: "Automation", href: "#automation" },
  { label: "Testimonials", href: "#testimonials" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { openBook, openRemote } = usePopup();
  const { pathname } = useLocation();
  const logoHref = pathname === "/web-studio" ? "https://huisbyte.nl" : "#";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href={logoHref} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">HB</span>
          </div>
          <span className={`font-bold text-xl tracking-tight ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            HuisByte
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-muted-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/web-studio"
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
              scrolled
                ? "border-primary/30 text-primary hover:bg-primary/10"
                : "border-primary-foreground/30 text-primary-foreground hover:bg-white/10"
            }`}
          >
            <ExternalLink size={13} /> Web Studio
          </Link>
          <button
            onClick={toggle}
            className={`p-2 rounded-lg transition-colors ${scrolled ? "text-foreground hover:bg-secondary" : "text-primary-foreground hover:bg-white/10"}`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button variant={scrolled ? "outline" : "hero-outline"} size="sm" onClick={openRemote}>
            Remote Support
          </Button>
          <Button variant="hero" size="sm" onClick={openBook}>
            Book a Visit
          </Button>
        </div>

        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/web-studio" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 rounded-lg px-3 py-2 hover:bg-primary/10 transition-colors">
                  <ExternalLink size={14} /> Web Studio
                </Link>
                <Button variant="outline" size="sm" onClick={() => { setMobileOpen(false); openRemote(); }}>Remote Support</Button>
                <Button variant="hero" size="sm" onClick={() => { setMobileOpen(false); openBook(); }}>Book a Visit</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
