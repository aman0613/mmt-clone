import { Request, Response } from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "Name, email and password are required",
      });

      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters",
      });

      return;
    }

    const result = await registerUser(name, email, password);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(409).json({
        message: "An account with this email already exists",
      });

      return;
    }

    res.status(500).json({
      message: "Unable to register user",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });

      return;
    }

    const result = await loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      res.status(401).json({
        message: "Invalid email or password",
      });

      return;
    }

    res.status(500).json({
      message: "Unable to login",
    });
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });

      return;
    }

    const user = await getCurrentUser(userId);

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      res.status(404).json({
        message: "User not found",
      });

      return;
    }

    res.status(500).json({
      message: "Unable to fetch user",
    });
  }
};
