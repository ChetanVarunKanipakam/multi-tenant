const Ticket = require('../models/Ticket');
const axios = require('axios');

exports.createTicket = async (req, res) => {
  const ticket = await Ticket.create({
    title: req.body.title,
    customerId: req.user.user.customerId
  });

  console.log(ticket)
  // Call n8n webhook
  await axios.post('http://n8n:5678/webhook/workflow-start', {
    ticketId: ticket._id,
    customerId: req.user.user.customerId
  });

  res.json(ticket);
};

exports.getTickets = async (req, res) => {
  const tickets = await Ticket.find({ customerId: req.user.user.customerId });
  res.json(tickets);
};
