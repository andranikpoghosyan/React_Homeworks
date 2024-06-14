import React from "react";
import "./Basket.css";
import BasketItem from "../basketItem/BasketItem";

export default function Basket({
  items,
  onAddItem,
  onDecreaseItem,
  onDeleteItem,
  onSaleItem,
  saleApplied,
}) {
  return (
    <div className="basket">
      <div className="title_line">
        <h2>Basket</h2>
        {!saleApplied && (
          <button
            onClick={onSaleItem}
            style={{ display: saleApplied ? "none" : "block" }}
          >
            Apply Sale
          </button>
        )}
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
          {items.map((elm) => {
            return (
              <BasketItem
                key={elm.id}
                {...elm}
                onAddItem={onAddItem}
                onDecreaseItem={onDecreaseItem}
                onDeleteItem={onDeleteItem}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
