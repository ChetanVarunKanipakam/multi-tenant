const router = require("express").Router();
const Ticket = require("../models/Ticket");

router.post("/ticket-done", async (req, res) => {
  if (req.headers["x-secret"] !== process.env.N8N_SECRET)
    return res.status(403).send("Forbidden");

  const { ticketId } = req.body;
  const updated = await Ticket.findByIdAndUpdate(
    ticketId,
    { status: "Resolved" },
    { new: true }
  );

  // Emit socket event
  const io = req.app.get("io");
  io.emit("ticket-updated", updated);

  res.sendStatus(200);
});

module.exports = router;
