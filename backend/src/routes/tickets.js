const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const { createTicket, getTickets } = require('../controllers/ticketController');


router.post('/',auth, createTicket);
router.get('/',auth, getTickets);
// PATCH /api/tickets/:id/resolve
router.patch('/:id/resolve', auth, async (req, res) => {
  const { role, customerId } = req.user;

  if (role !== "Admin") {
    return res.status(403).json({ message: "Only admins can resolve tickets" });
  }

  const updated = await Ticket.findOneAndUpdate(
    { _id: req.params.id, customerId },
    { status: "Resolved" },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Ticket not found or unauthorized" });
  }

  io.emit("ticket-updated", updated); // notify all clients
  res.json(updated);
});

module.exports = router;
