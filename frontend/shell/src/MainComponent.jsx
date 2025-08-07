// MainComponent.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import Sidebar from "./Sidebar";
import { getScreens } from "./api";
import ErrorBoundary from "./ErrorBoundary";// 👈 Add this if using React Router

const SupportTicketsApp = lazy(() => import("SupportTicketsApp/App"));

const MainComponent = () => {
  const [screens, setScreens] = useState([]);
  const [activeScreen, setActiveScreen] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const screenData = await getScreens(token);

        console.log(screenData);
        setScreens(screenData);
        setActiveScreen(screenData[0]?.screenUrl || null);
      } catch (err) {
        console.error("❌ App init error:", err);
        alert("Login or screen fetch failed: " + err.message);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Sidebar screens={screens} onSelect={setActiveScreen} />

      <div
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "#f9fafb",
          overflowY: "auto",
        }}
      >
        {/* Logout button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        <Suspense fallback={<p style={{ fontSize: 16 }}>⏳ Loading screen...</p>}>
          {activeScreen === "SupportTicketsApp" && (
            <ErrorBoundary>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              >
                <SupportTicketsApp />
              </div>
            </ErrorBoundary>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default MainComponent;
