import React, { useState } from "react";
import axios from "axios";

const CreateTicket = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/tickets",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onCreated(res.data); // Optional callback
      setTitle("");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>Create New Ticket</h3>
      <input
        type="text"
        value={title}
        placeholder="Enter ticket title"
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: "0.5rem", width: "100%", marginBottom: "0.5rem" }}
      />
      <button
        type="submit"
        disabled={submitting}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {submitting ? "Submitting..." : "Create Ticket"}
      </button>
      {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
    </form>
  );
};

export default CreateTicket;
