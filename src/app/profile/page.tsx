"use client";

import { useEffect, useState } from "react";
import { getUserByLogin } from "../lib/api";
import { IUser } from "../lib/types";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();
  const { login } = router.query;

  useEffect(() => {
    if (login) {
      const currentUser = getUserByLogin(login as string);
      setUser(currentUser);
    }
  }, [login]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4 px-6 mx-6">
      <h1 className="is-size-3">Profile Page</h1>
      <div>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Surname:</strong> {user.surname}
        </p>
        <p>
          <strong>Username:</strong> {user.login}
        </p>
      </div>
    </main>
  );
}
