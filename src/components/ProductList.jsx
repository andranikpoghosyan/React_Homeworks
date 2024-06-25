import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import { UserContext } from "./context";

export default function ProductList() {
  const { state } = useContext(UserContext);
  return (
    <div className="productList">
      <h2>ProductList</h2>
      <div className="list">
        {state.products.map((elem) => (
          <ProductItem key={elem.id} {...elem} />
        ))}
      </div>
    </div>
  );
}
