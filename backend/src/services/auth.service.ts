import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/user.repository";
import { env } from "../config/env";

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

const createToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
    },
  );
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await userRepository.findByEmail(normalizedEmail);

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create(
    name.trim(),
    normalizedEmail,
    hashedPassword,
  );

  const token = createToken(user._id.toString());

  const authUser: AuthUser = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  return {
    user: authUser,
    token,
  };
};

export const loginUser = async (email: string, password: string) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await userRepository.findByEmail(normalizedEmail);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = createToken(user._id.toString());

  const authUser: AuthUser = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };

  return {
    user: authUser,
    token,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};
