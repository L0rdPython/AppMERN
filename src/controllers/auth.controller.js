import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await new User({ username, email, password: passwordHash });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: newUser._id });

    res.cookie("token", token);
    res.json({
      message: "user created successfully",
      data: {
        username: userSaved.username,
        email: userSaved.email,
        id: newUser._id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email: email });

    if (!userFound) return res.status(404).json({ message: "User not found" });

    const passwordHash = await bcrypt.compare(password, userFound.password);

    if (!passwordHash)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      message: "user loged in successfully",
      data: {
        username: userFound.username,
        email: userFound.email,
        id: userFound._id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(404).json({ message: " profile not found" });

  res.json({
    message: "You are now logged in profile",
    username: userFound.username,
    email: userFound.email,
    id: userFound._id,
  });
};
