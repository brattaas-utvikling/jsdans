import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";
import HomepageNews from "@/components/HomePageNews";
import OppstartSection from "@/components/OppstartSection";



import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <OppstartSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
