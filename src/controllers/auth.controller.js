import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

//? Registro de usuarios
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["The email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: passwordHash });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: newUser._id });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
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

//? Inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email: email });

    if (!userFound) return res.status(404).json({ message: "User not found" });

    const passwordHash = await bcrypt.compare(password, userFound.password);

    if (!passwordHash)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
    });

    res.json({
      message: "user logged in successfully",
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

//? Cierre de sesión
export const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

//? Perfil de usuario
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

//? Verificación de token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res
      .status(401)
      .json({ message: "There are not any token... | Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      id: userFound._id,
      email: userFound.email,
      username: userFound.username,
    });
  });
};
