import React from "react";

export default function Basket({
  basket,
  onAddItem,
  onDecreaseItem,
  onDeleteItem,
}) {
  return (
    <div className="basket">
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
          {basket.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}$</td>
              <td>{item.count}</td>
              <td>{item.price * item.count}$</td>
              <td className="actions_section">
                <button
                  onClick={() => onAddItem(item.id)}
                  className="btn_action"
                >
                  +
                </button>
                <button
                  onClick={() => onDecreaseItem(item.id)}
                  className="btn_action"
                >
                  -
                </button>
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="btn_action"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
