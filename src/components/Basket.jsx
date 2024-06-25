import React, { useContext } from "react";
import BasketItem from "./BasketItem";
import { UserContext } from "./context";

export default function Basket() {
  const { state } = useContext(UserContext);
  return (
    <div className="basket">
      <div className="title_line">
        <h2>Basket</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Count</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.basket.map((elm) => {
            return <BasketItem key={elm.id} {...elm} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
