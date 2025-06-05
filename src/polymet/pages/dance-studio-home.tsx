import HeroSection from "@/polymet/components/hero-section";
import AboutSection from "@/polymet/components/about-section";
import ClassesSection from "@/polymet/components/classes-section";
import ContactSection from "@/polymet/components/contact-section";
import LoginForm from "@/components/LoginForm";
// import DanceSchedule from "../components/dance-scedule";

export default function DanceStudioHome() {
  return (
    <>
      <HeroSection />

      <LoginForm />

      <AboutSection />

      <ClassesSection />

      <ContactSection />
    </>
  );
}
