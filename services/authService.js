const Admin = require("../models/admin");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");

exports.register = async (credentials, role) => {
  const { name, surname, email, password } = credentials;

  const Model = role === "admin" ? Admin : User;

  const existingUser = await Model.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Model({ name, surname, email, password: hashedPassword });
  await user.save();
  return user;
};

exports.login = async (credentials, role) => {
  const { email, password } = credentials;

  const Model = role === "admin" ? Admin : User;
  const user = await Model.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  } else {
    return generateToken(user);
  }
};
