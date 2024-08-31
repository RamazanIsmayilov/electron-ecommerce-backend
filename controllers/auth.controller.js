const { register, login } = require("../services/auth.service");

exports.userRegister = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const result = await register(name, surname, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
