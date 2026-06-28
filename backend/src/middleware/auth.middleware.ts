import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

type TokenPayload = {
  userId: string;
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({
      message: "Authorization token is required",
    });

    return;
  }

  const [tokenType, token] = authorizationHeader.split(" ");

  if (tokenType !== "Bearer" || !token) {
    res.status(401).json({
      message: "Invalid authorization format",
    });

    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;

    req.userId = decoded.userId;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
