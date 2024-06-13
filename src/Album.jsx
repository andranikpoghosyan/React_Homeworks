import React from "react";

export default function Album({ name, year, children }) {
  return (
    <div className="Album">
      <h3>{name}</h3>
      <p>Released in {year}</p>
      {children}
    </div>
  );
}
