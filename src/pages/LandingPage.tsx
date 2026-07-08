import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";

// import HeroSection from "@/components/HeroSection";
import HomepageNews from "@/components/HomePageNews";
import { KompaniAuditionh26 } from "@/components/KompaniAuditionh26";
import { SommerferieSection } from "@/components/SommerferieSection";
import SpringSemesterSection from "@/components/SpringSemesterSection";
import SummerSection from "@/components/SummerSection";


import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <SommerferieSection />
      <KompaniAuditionh26 />
      <SummerSection />
      <SpringSemesterSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
