import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UnifiedSection from "@/components/UnifiedSection";
import ProcessSection from "@/components/ProcessSection";
import PricingSection from "@/components/PricingSection";
import WebDevPricingSection from "@/components/WebDevPricingSection";
import OneTimeServicesSection from "@/components/OneTimeServicesSection";
import EmergencySection from "@/components/EmergencySection";
import AutomationSection from "@/components/AutomationSection";
import SmartHomeSection from "@/components/SmartHomeSection";
import BusinessSection from "@/components/BusinessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <UnifiedSection />
      <ProcessSection />
      <PricingSection />
      <WebDevPricingSection />
      <OneTimeServicesSection />
      <EmergencySection />
      <AutomationSection />
      <SmartHomeSection />
      <BusinessSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
