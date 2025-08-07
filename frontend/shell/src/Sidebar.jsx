import React from "react";

const Sidebar = ({ screens, onSelect }) => {
  return (
    <div
      style={{
        width: 250,
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        backgroundColor: "#f9f9fb",
        padding: "20px 16px",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        overflowY: "auto",
      }}
    >
      <h3 style={{ marginBottom: 20, color: "#333", fontWeight: "600" }}>
        📁 Screens
      </h3>

      {screens.map((s) => (
        <button
          key={s.screenUrl}
          onClick={() => onSelect(s.screenUrl)}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px 12px",
            marginBottom: "10px",
            textAlign: "left",
            fontSize: "14px",
            color: "#333",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#fff")
          }
        >
          {s.screenUrl}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
