import ScrollToTop from "@/helpers/ScrollToTop";
import PricingSection from "../components/pricing-section";
import DanceClasses from "@/database/danceclasses";

export default function PricingPage() {

  return (
    <>
      <ScrollToTop />
      <PricingSection /> 
      <DanceClasses />
    </>
  );
}