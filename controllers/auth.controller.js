const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;
    const user = await authService.register(name, surname, email, password, role);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };
