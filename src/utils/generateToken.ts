import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type {StringValue} from "ms"
import type { Response } from "express";

export const generateToken = (userId: string, res: Response) => {
  const payload = {id: userId};
  const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not set");
}
 const expiresIn: StringValue = (process.env.JWT_EXPIRES_IN ?? "7d") as StringValue;
const token: SignOptions = {
    expiresIn
  };

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: (1000*60*60*24) * 7
  })

  return jwt.sign(payload, jwtSecret, token);
}