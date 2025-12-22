import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";

// import HeroSection from "@/components/HeroSection";
import HomepageNews from "@/components/HomePageNews";
import SpringSemesterSection from "@/components/SpringSemesterSection";


import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <SpringSemesterSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
