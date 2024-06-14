import React from "react";
import "./BasketItem.css";

export default function BasketItem({
  title,
  price,
  count,
  onAddItem,
  id,
  onDecreaseItem,
  onDeleteItem,
}) {
  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{price} USD</td>
        <td>{count}</td>
        <td>{price * count} USD</td>
        <td className="td_btns">
          <button onClick={() => onAddItem(id)} title="Add">
            +
          </button>
          <button onClick={() => onDecreaseItem(id)} title="Minus">
            -
          </button>
          <button
            onClick={() => onDeleteItem(id)}
            className="del_btn"
            title="Delete"
          >
            X
          </button>
        </td>
      </tr>
    </>
  );
}
