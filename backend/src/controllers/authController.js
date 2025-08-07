const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).send('Invalid credentials');

  const token = jwt.sign(
   {user: user},
    process.env.JWT_SECRET
  );
  res.json({ token });
};
