import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import validateSchema from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get("/", function (req, res) {
  res.send("Welcome to the Admin ");
});
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;