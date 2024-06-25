import React, { useContext } from "react";
import { UserContext } from "./context";

export default function ProductItem({ title, id, price, photo }) {
  const { dispatch } = useContext(UserContext);
  return (
    <div className="productName">
      <img src={photo} alt="" />
      <h3>{title}</h3>
      <p>
        <strong>{price} USD</strong>
      </p>
      <button
        className="move_button"
        onClick={() => dispatch({ type: "addItem", payload: id })}
      >
        Move
      </button>
    </div>
  );
}
