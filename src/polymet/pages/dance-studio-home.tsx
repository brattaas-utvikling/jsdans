import HeroSection from "@/polymet/components/hero-section";
import ClassesSection from "@/polymet/components/classes-section";
import HomepageNews from "@/components/HomePageNews";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function DanceStudioHome() {
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <HomepageNews />
      <ClassesSection />

    </>
  );
}
