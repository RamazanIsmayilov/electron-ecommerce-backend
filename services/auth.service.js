const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

const JWT_SECRET = 'your_jwt_secret';

const register = async (name, surname, email, password, role = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, surname, email, password: hashedPassword, role });
  return user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { register, login };
