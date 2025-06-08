// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";
import PricingPage from "./polymet/pages/pricing-page";
import CoursesPageContainer from "./pages/CoursesPageContainer";
import CheckoutPageContainer from "./pages/CheckoutPageContainer";



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
      </Routes>
    </Router>
  );
}
