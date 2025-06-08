import HeroSection from "@/polymet/components/hero-section";
import AboutSection from "@/polymet/components/about-section";
import ClassesSection from "@/polymet/components/classes-section";
import ContactSection from "@/polymet/components/contact-section";
// import { DanceClassCard } from "@/components/DanceClassCard";
import CoursesPage from "@/components/CoursesPage";
// import LoginForm from "@/components/LoginForm";
// import DanceSchedule from "../components/dance-scedule";

export default function DanceStudioHome() {
  return (
    <>
      <HeroSection />

      <CoursesPage
        danceClasses={[]}
        schedules={[]}
        packages={[]}
        onAddToCart={() => {}}
        cartItems={[]}
        onRemoveFromCart={() => {}}
        onCheckout={() => {}}
      />
      
      <AboutSection />

      <ClassesSection />

      <ContactSection />
    </>
  );
}
