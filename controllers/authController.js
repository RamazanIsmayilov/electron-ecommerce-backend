const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      res.send({ error: "This email is already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        surname,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      res.status(201);
      res.send({ message: "User registered successfully" });
    }
  } catch (error) {
    res.status(500);
    console.error("Error during registration:", error);
    res.send({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401);
      res.send({ error: "Enter the correct information" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401);
        res.send({ error: "Enter the correct information" });
      } else {
        const token = jwt.sign({ userId: user._id }, "your_secret_key");
        res.status(200);
        res.send({ token });
      }
    }
  } catch (error) {
    res.status(500);
    console.error("Error during login:", error);
    res.send({ error: "Internal server error" });
  }
};
