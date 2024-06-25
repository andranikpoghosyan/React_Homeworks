import React, { useContext } from "react";
import { UserContext } from "./context";

export default function BasketItem({ title, price, count, id }) {
  const { dispatch } = useContext(UserContext);

  return (
    <>
      <tr>
        <td>{title}</td>
        <td>{price} USD</td>
        <td>{count}</td>
        <td>{price * count} USD</td>
        <td className="td_btns">
          <button
            onClick={() => dispatch({ type: "addItem", payload: id })}
            title="Add"
          >
            +
          </button>
          <button
            onClick={() => dispatch({ type: "decreaseItem", payload: id })}
            title="Minus"
          >
            -
          </button>
          <button
            onClick={() => dispatch({ type: "deleteItem", payload: id })}
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
