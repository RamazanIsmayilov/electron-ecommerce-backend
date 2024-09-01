const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret_key";

const register = async (name, surname, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { message: "User created successfully", newUser };
  } catch (error) {
    throw new Error("Registration error");
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { message: "User not found", status: 404 };

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) return { message: "Incorrect password", status: 401 };

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });
    return { token };
  } catch (error) {
    throw new Error("Login error");
  }
};

module.exports = { register, login };
