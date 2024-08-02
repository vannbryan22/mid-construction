// src/utils/tokenUtils.ts
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION as string;
const JWT_TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION as string;

export const generateAccessToken = (userId: number, email: string) => {
  return jwt.sign({ id: userId, email }, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });
};
