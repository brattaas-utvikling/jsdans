import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";
import PricingPage from "./polymet/pages/pricing-page";

export default function DanceStudioPrototype() {
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
          path="/priser"
          element={
            <DanceStudioLayout>
              <PricingPage />
            </DanceStudioLayout>
          }
        />
      </Routes>
    </Router>
  );
}
