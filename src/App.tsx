// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import LandingPage from "@/pages/LandingPage";
import PricingPage from "./pages/PricingPage";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import NewsPage from "./pages/NewsPage";
import NewsArticlePage from "./pages/NewsArticlePage";
import ClassesSection from "./pages/CoursesPage";
// import RegistrationPage from "./pages/RegistrationPage";
import TermsConditions from "./pages/TermsConditions";
import NotFoundPage from "./pages/NotFoundPage";
import SchedualPage from "./pages/SchedualPage";
import { EnrollmentProvider } from "./contexts/EnrollmentContext";
import EnrollmentWizard from "./components/enrollment/EnrollmentWizard";

export default function App() {
  return (
    <EnrollmentProvider> 
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/nyheter"
          element={
            <Layout>
              <NewsPage />
            </Layout>
          }
        />
        <Route
          path="/nyheter/:id"
          element={
            <Layout>
              <NewsArticlePage />
            </Layout>
          }
        />
        <Route
          path="/kurs"
          element={
            <Layout>
              <ClassesSection />
            </Layout>
          }
        />
        <Route
          path="/timeplan"
          element={
            <Layout>
              <SchedualPage />
            </Layout>
          }
        />
        <Route
          path="/registration"
          element={
            <Layout>
              <EnrollmentWizard />
            </Layout>
          }
        />
        <Route
          path="/priser"
          element={
            <Layout>
              <PricingPage />
            </Layout>
          }
        />
        <Route
          path="/om-oss"
          element={
            <Layout>
              <AboutSection />
            </Layout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <Layout>
              <ContactSection />
            </Layout>
          }
        />
        <Route
          path="/betingelser"
          element={
            <Layout>
              <TermsConditions />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
    </EnrollmentProvider>
  );
}
