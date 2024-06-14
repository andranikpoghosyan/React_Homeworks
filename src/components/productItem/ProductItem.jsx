import React from "react";
import "./ProductItem.css";

export default function ProductItem({ title, id, price, photo, onMove }) {
  return (
    <div className="productName">
      <img src={photo} alt="" />
      <h3>{title}</h3>
      <p>
        <strong>{price} USD</strong>
      </p>
      <button className="move_button" onClick={() => onMove(id)}>
        Move
      </button>
    </div>
  );
}
