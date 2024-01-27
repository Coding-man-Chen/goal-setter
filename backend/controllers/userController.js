import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import { userModel } from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User exists");
  }
  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  const user = userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await bycrypt.compare(password, user.password))) {
    res.json({
      name: user.name,
      email: user.email,
      _id: user.id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;
  res.json({ id: _id, name: name, email: email });
});

export { registerUser, loginUser, getMe };
