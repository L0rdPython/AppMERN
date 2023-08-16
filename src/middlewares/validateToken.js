import { TOKEN_SCRET } from "../config.js";
import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(404).json({ error: "Invalid token provided in request" });

  jwt.verify(token, TOKEN_SCRET, (err, user) => {
    if (err)
      return res
        .status(404)
        .json({ error: "Invalid token provided in request jwt" });

    req.user = user;
  });

  next();
};
