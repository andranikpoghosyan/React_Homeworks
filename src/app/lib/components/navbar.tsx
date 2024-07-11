import React from "react";
import { NavLink } from "./navlink";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <NavLink className="navbar-item" href="/">
          Home
        </NavLink>
        <NavLink className="navbar-item" href="/add">
          Add
        </NavLink>
        <NavLink className="navbar-item" href="/signup">
          Signup
        </NavLink>
        <NavLink className="navbar-item" href="/login">
          Login
        </NavLink>
      </nav>
    </>
  );
};
