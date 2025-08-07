import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateTicket from "./CreateTicket";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(data);

      // Decode role from JWT (quick and dirty, better to do it on login)
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const resolveTicket = async (id) => {
    const token = localStorage.getItem("token");
    await axios.patch(
      `http://localhost:5000/api/tickets/${id}/resolve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  useEffect(() => {
    fetchTickets();

    const socket = io("http://localhost:5000");
    socket.on("ticket-updated", (updated) => {
      toast.info(`Ticket "${updated.title}" was updated.`);
      setTickets((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleCreated = (newTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    toast.success(`Ticket "${newTicket.title}" created.`);
  };

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div style={{ padding: 20 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <CreateTicket onCreated={handleCreated} />
      <h2>Support Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets yet.</p>
      ) : (
        tickets.map((t) => (
          <div
            key={t._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h4>{t.title}</h4>
            <p>Status: <strong>{t.status}</strong></p>

            {userRole === "Admin" && t.status !== "Resolved" && (
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => resolveTicket(t._id)}
              >
                Resolve
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TicketList;
