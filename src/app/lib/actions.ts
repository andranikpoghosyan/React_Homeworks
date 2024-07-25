"use server";

import { PartialUser } from "./types";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { addUser, getUserByLogin } from "./api";
import { redirect } from "next/navigation";

export const handleSignup = async (prev: unknown, data: FormData) => {
  let user: PartialUser = {
    id: nanoid(),
    name: data.get("name") as string,
    surname: data.get("surname") as string,
    login: data.get("login") as string,
    password: data.get("password") as string,
  };

  const doubleUser = getUserByLogin(user.login as string);
  if (doubleUser) {
    return {
      message: "Login is already taken. Please choose another one.",
    };
  }

  const passRegexp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  if (!passRegexp.test(user.password as string)) {
    return {
      message:
        "Password must be at least 6 characters long, and include a letter, number, symbol.",
    };
  }

  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const result = addUser(user);
  console.log(result);

  redirect("/login");
};

export const handleLogin = async (prev: unknown, data: FormData) => {
  if (!data.get("login") || !data.get("password")) {
    return {
      message: "Please fill all the fields",
    };
  }

  let login = data.get("login") as string;
  let password = data.get("password") as string;
  let user = getUserByLogin(login);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      message: "Invalid login or password",
    };
  }

  console.log(user);
  redirect(`/profile?login=${login}`);
};
