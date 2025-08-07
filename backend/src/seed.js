require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();

  await User.create([
    {
      email: 'admin@logistics.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'Admin',
      customerId: 'LogisticsCo'
    },
    {
      email: 'admin@retail.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'Admin',
      customerId: 'RetailGmbH'
    }
  ]);

  console.log("Seeded");
  process.exit();
};

seed();
