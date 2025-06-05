import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DanceStudioLayout from "@/polymet/layouts/dance-studio-layout";
import DanceStudioHome from "@/polymet/pages/dance-studio-home";
import PricingPage from "./polymet/pages/pricing-page";
import { useEffect, useState } from "react";
import { account } from "./lib/appwrite";

export default function DanceStudioPrototype() {
const [connectionStatus, setConnectionStatus] = useState('Testing...');

useEffect(() => {
  const forceConnection = async () => {
    try {
      // Prøv å hente brukerinfo (vil feile, men skaper tilkobling)
      await account.get();
      setConnectionStatus('Connected (user logged in)');
    } catch {
      // Dette er forventet - ingen bruker logget inn
      setConnectionStatus('Connected (no user)');
      
      // Prøv å hente account preferences (skaper også tilkobling)
      try {
        await account.getPrefs();
      } catch {
        console.log('Preference call also failed (normal)');
      }
    }
  };
  
  forceConnection();
}, []);
  return (
    <div>

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
          <h1>Dance Studio Prototype</h1>
      <p>Connection Status: {connectionStatus}</p>
    </div>
  );
}
