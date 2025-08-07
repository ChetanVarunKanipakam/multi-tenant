const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: 'Open' },
  customerId: String
});

module.exports = mongoose.model('Ticket', ticketSchema);
