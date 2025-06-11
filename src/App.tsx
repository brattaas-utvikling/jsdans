// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";
import PricingPage from "./polymet/pages/pricing-page";
import CoursesPageContainer from "./pages/CoursesPageContainer";
import CheckoutPageContainer from "./pages/CheckoutPageContainer";
import AboutSection from "./polymet/components/about-section";
import ContactSection from "./polymet/components/contact-section";
import NewsPage from "./pages/NewsPage";
import NewsArticlePage from "./pages/NewsArticlePage";



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
          path="/nyheter"
          element={
            <DanceStudioLayout>
              <NewsPage />
            </DanceStudioLayout>
          }
        />
        <Route
          path="/nyheter/:id"
          element={
            <DanceStudioLayout>
              <NewsArticlePage />
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
