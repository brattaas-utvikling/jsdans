import HeroSection from "@/polymet/components/hero-section";
import AboutSection from "@/polymet/components/about-section";
import ClassesSection from "@/polymet/components/classes-section";
import PricingSection from "@/polymet/components/pricing-section";
import ContactSection from "@/polymet/components/contact-section";
import DanceSchedule from "../components/dance-scedule";

export default function DanceStudioHome() {
  return (
    <>
      <HeroSection />

      <AboutSection />

      <ClassesSection />
      <DanceSchedule />


      <PricingSection />

      <ContactSection />
    </>
  );
}
