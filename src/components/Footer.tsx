import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground border-t border-navy-light">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HB</span>
              </div>
              <span className="font-bold text-xl">HuisByte</span>
            </div>
            <p className="text-sm text-navy-foreground/50 leading-relaxed mb-6">
              Premium onsite and remote IT support for Amsterdam homes, freelancers, and businesses.
            </p>
            <div className="flex items-center gap-2 text-sm text-navy-foreground/50">
              <MapPin size={14} className="text-cyan shrink-0" />
              Amsterdam, Netherlands
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-navy-foreground/70">Services</h4>
            <ul className="space-y-2 text-sm text-navy-foreground/50">
              <li><a href="#services" className="hover:text-cyan transition-colors">Wi-Fi Optimization</a></li>
              <li><a href="#services" className="hover:text-cyan transition-colors">Laptop Troubleshooting</a></li>
              <li><a href="#services" className="hover:text-cyan transition-colors">Microsoft 365 Support</a></li>
              <li><a href="#automation" className="hover:text-cyan transition-colors">Smart Home Setup</a></li>
              <li><a href="#services" className="hover:text-cyan transition-colors">Business IT</a></li>
              <li><a href="tel:+31201234567" className="hover:text-cyan transition-colors">Emergency Recovery</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-navy-foreground/70">Company</h4>
            <ul className="space-y-2 text-sm text-navy-foreground/50">
              <li><a href="#process" className="hover:text-cyan transition-colors">About Us</a></li>
              <li><a href="#plans" className="hover:text-cyan transition-colors">Managed Plans</a></li>
              <li><a href="#services-pricing" className="hover:text-cyan transition-colors">One-Time Services</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Blog</a></li>
              <li><a href="mailto:hello@huisbyte.nl?subject=Careers%20Enquiry" className="hover:text-cyan transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-navy-foreground/70">Contact</h4>
            <div className="space-y-3 text-sm text-navy-foreground/50">
              <a href="mailto:hello@huisbyte.nl" className="flex items-center gap-2 hover:text-cyan transition-colors">
                <Mail size={14} className="text-cyan shrink-0" />
                hello@huisbyte.nl
              </a>
              <a href="tel:+31201234567" className="flex items-center gap-2 hover:text-cyan transition-colors">
                <Phone size={14} className="text-cyan shrink-0" />
                +31 20 123 4567
              </a>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="px-3 py-1.5 rounded-md glass-card-dark text-xs font-medium text-navy-foreground/60">
                🇳🇱 Amsterdam
              </div>
              <div className="px-3 py-1.5 rounded-md glass-card-dark text-xs font-medium text-navy-foreground/60">
                ⚡ Same-day
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-light mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-navy-foreground/30">
            © {new Date().getFullYear()} HuisByte. All rights reserved. KvK: 12345678
          </p>
          <div className="flex gap-6 text-xs text-navy-foreground/30">
            <a href="#" className="hover:text-cyan transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
