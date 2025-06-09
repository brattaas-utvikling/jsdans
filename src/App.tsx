// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";
import PricingPage from "./polymet/pages/pricing-page";
import CoursesPageContainer from "./pages/CoursesPageContainer";
import CheckoutPageContainer from "./pages/CheckoutPageContainer";
import AboutSection from "./polymet/components/about-section";
import ContactSection from "./polymet/components/contact-section";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DanceStudioLayout>
              <DanceStudioHome />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/courses"
          element={
            <DanceStudioLayout>
              <CoursesPageContainer />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/priser"
          element={
            <DanceStudioLayout>
              <PricingPage />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <DanceStudioLayout>
              <CheckoutPageContainer />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/om-oss"
          element={
            <DanceStudioLayout>
              <AboutSection />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <DanceStudioLayout>
              <ContactSection />
            </DanceStudioLayout>
          }
        />
        <Route
          path="*"
          element={
            <DanceStudioLayout>
              <h1>404 - Page Not Found</h1>
            </DanceStudioLayout>
          }
        />
      </Routes>
    </Router>
  );
}
