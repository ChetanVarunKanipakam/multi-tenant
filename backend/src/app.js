require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.js');
const ticketRoutes = require('./routes/tickets.js');
const screenRoutes = require('./routes/screen.js');

const app = express();
app.use(cors({
  origin:  ['http://localhost:3000', 'http://localhost:3002'],
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/screens', screenRoutes);
app.use('/webhook', require('./routes/webhook.js'));

module.exports = app;
