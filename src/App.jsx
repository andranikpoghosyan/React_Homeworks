import React, { useEffect, useReducer } from "react";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";
import TotalAmount from "./components/TotalAmount";
import { UserContext, initialState, reducer } from "./components/context";

import "./App.css";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "calculateTotal" });
  }, [state.basket]);

  return (
    <div className="App">
      <div className="row">
        <UserContext.Provider value={{ state, dispatch }}>
          <ProductList
            items={state.products}
            onMove={(id) => dispatch({ type: "addItem", payload: id })}
          />
          <div className="basket_section">
            <Basket
              items={state.basket}
              onAddItem={(id) => dispatch({ type: "addItem", payload: id })}
              onDecreaseItem={(id) =>
                dispatch({ type: "decreaseItem", payload: id })
              }
            />
            <TotalAmount total={state.totalAmount} />
          </div>
        </UserContext.Provider>
      </div>
    </div>
  );
}
