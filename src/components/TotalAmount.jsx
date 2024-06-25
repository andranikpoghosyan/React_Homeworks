import React from "react";

export default function TotalAmount({ total }) {
  return (
    <div className="total_amount">
      <h3>Total Amount: {total} USD</h3>
    </div>
  );
}
