"use client";

import { useState } from "react";
import { handleUpdateLogin } from "../lib/actions";

const Settings = () => {
  const [currentCode, setCurrentCode] = useState("");
  const [newLogin, setNewLogin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await handleUpdateLogin(currentCode, newLogin);
    if (result.message) {
      setError(result.message);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div>
      <h1 className="is-size-3">Update Login</h1>

      <form className="box" onSubmit={handleSubmit}>
        <label className="label">
          Current Code:
          <input
            type="password"
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            required
            className="input is-dark"
            placeholder="Please enter your current password"
            name="currentCode"
          />
        </label>
        <br />
        <label className="label">
          New Login:
          <input
            type="text"
            className="input is-dark"
            placeholder="Please enter your new login"
            value={newLogin}
            onChange={(e) => setNewLogin(e.target.value)}
            required
          />
        </label>
        <br />
        <button className="button is-success" type="submit">
          Update Login
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Settings;
