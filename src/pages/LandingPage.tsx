import CoursesCarousel from "@/components/CoursesCarousel";
import CtaSection from "@/components/CtaSection";
import HomepageNews from "@/components/HomePageNews";
import { HostsemesterSection } from "@/components/HostsemesterSection";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <CtaSection />
      <HostsemesterSection />
      <CoursesCarousel />
      <HomepageNews />
    </>
  );
}
