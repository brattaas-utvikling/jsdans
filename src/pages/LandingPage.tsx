import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";
// import HeroSection from "@/components/HeroSection";
import HomepageNews from "@/components/HomePageNews";

import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
