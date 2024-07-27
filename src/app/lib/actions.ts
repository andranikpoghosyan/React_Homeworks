"use server";

import { OptionalUser } from "./types";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { addUser, getUserById, getUserByLogin, updateUser } from "./api";
import { redirect } from "next/navigation";
import { createAuthSession, destroySession, verifyAuth } from "./auth";

export const handleSignup = async (prev: unknown, data: FormData) => {
  if (!data.get("name") || !data.get("surname")) {
    return {
      message: "Please fill all the fields",
    };
  }

  const found = getUserByLogin(data.get("login") as string);
  if (found) {
    return {
      message: "Login is busy!",
    };
  }

  const user: OptionalUser = {
    id: nanoid(),
    name: data.get("name") as string,
    surname: data.get("surname") as string,
    login: data.get("login") as string,
  };

  user.password = await bcrypt.hash(data.get("password") as string, 10);
  console.log(addUser(user));
  redirect("/login");
};

export const handleLogin = async (prev: unknown, data: FormData) => {
  if (!data.get("login") || !data.get("password")) {
    return {
      message: "Please fill all the fields",
    };
  }

  const login = data.get("login") as string;
  const password = data.get("password") as string;

  const user = await getUserByLogin(login);
  if (!user) {
    return {
      message: "The login is incorrect!",
    };
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return {
      message: "Password is wrong!",
    };
  }

  await createAuthSession(user.id);
  redirect("/profile");
};

export const handleLogout = async () => {
  await destroySession();
  redirect("/login");
};

export const handleUpdateLogin = async (
  currentCode: string,
  newLogin: string
) => {
  const sessionResult = await verifyAuth();
  if (!sessionResult.session) {
    return {
      message: "You need to be logged in to update your login.",
    };
  }

  const userId = sessionResult.session.userId;
  const user = await getUserById(userId);

  if (!user) {
    return {
      message: "User not found.",
    };
  }

  const match = await bcrypt.compare(currentCode, user.password);
  if (!match) {
    return {
      message: "Current password is incorrect!",
    };
  }

  const existingUser = await getUserByLogin(newLogin);
  if (existingUser) {
    return {
      message: "New login is already used!",
    };
  }

  const updatedUser = {
    id: userId,
    name: user.name,
    surname: user.surname,
    login: newLogin,
    password: user.password,
  };

  await updateUser(updatedUser);

  await destroySession();

  return {};
};
