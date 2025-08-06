import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";
// import HeroSection from "@/components/HeroSection";
import HomepageNews from "@/components/HomePageNews";
import KompaniAuditionSection from "@/components/KompaniAuditionSection";
import SelmaWorkshop from "@/components/SelmaWorkshop";

import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <SelmaWorkshop />
      <KompaniAuditionSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
