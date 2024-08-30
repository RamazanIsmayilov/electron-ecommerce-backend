const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };
  
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
};
