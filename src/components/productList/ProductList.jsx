import React from "react";
import "./ProductList.css";
import ProductItem from "../productItem/ProductItem";

export default function ProductList({ items, onMove }) {
  return (
    <div className="productList">
      <h2>ProductList</h2>
      <div className="list">
        {items.map((elem) => (
          <ProductItem key={elem.id} {...elem} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}
