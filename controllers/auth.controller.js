const { register, login } = require("../services/auth.service");

exports.userRegister = async (req, res) => {
  const { name, surname, email, password, role } = req.body; 
  try {
    const userRole = role || 'user';
    const result = await register(name, surname, email, password, userRole);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: `Registration error: ${error.message}` });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    if (result.status) {
      return res.status(result.status).json({ message: result.message });
    }
    res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({ error: `Login error: ${error.message}` });
  }
};
