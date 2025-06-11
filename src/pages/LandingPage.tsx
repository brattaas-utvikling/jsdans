import HeroSection from "@/components/HeroSection";
import HomepageNews from "@/components/HomePageNews";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function LandingPage() {
  return (
    <>
      <ScrollToTop />
      <HeroSection />
      <HomepageNews />
    </>
  );
}