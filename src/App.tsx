import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";

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
      </Routes>
    </Router>
  );
}
