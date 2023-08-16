import jwt from "jsonwebtoken";
import { TOKEN_SCRET } from "../config.js";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SCRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
