const { register, login } = require("../services/auth.service");

exports.userRegister = async (req, res) => {
  const { name, surname, email, password, role } = req.body; 
  try {
    const userRole = role || 'user';
    const result = await register(name, surname, email, password, userRole);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || "Registration error" });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.status(200).json(result); 
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || "Login error" });
  }
};
