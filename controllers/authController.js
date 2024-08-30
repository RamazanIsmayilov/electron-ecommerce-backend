const AuthService = require("../services/authService");

exports.registerUser = async (req, res) => {
  try {
    const user = await AuthService.register(req.body, "user");
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = await AuthService.login(req.body, "user");
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const admin = await AuthService.register(req.body, "admin");
    res.status(201).json(admin);
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const token = await AuthService.login(req.body, "admin");
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
