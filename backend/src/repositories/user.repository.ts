import { UserModel } from "../models/user.model";

export const findByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const findById = async (id: string) => {
  return UserModel.findById(id);
};

export const create = async (name: string, email: string, password: string) => {
  return UserModel.create({
    name,
    email,
    password,
  });
};
