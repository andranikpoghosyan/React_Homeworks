import React, { useEffect, useState } from "react";
import TotalAmount from "./components/TotalAmount/TotalAmount";
import Basket from "./Basket";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3004/books")
      .then((res) => res.json())
      .then((res) => {
        setProducts(res);
      });
  }, []);

  useEffect(() => {
    setTotal(calculateTotalAmount());
  }, [basket]);

  const moveToCart = (id) => {
    let found = basket.find((item) => item.id == id);

    if (!found) {
      let product = products.find((item) => item.id == id);
      if (product) {
        setBasket([...basket, { ...product, count: 1 }]);
      }
    } else {
      setBasket(
        basket.map((item) =>
          item.id == id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  const calculateTotalAmount = () => {
    return basket.reduce((a, b) => a + b.price * b.count, 0);
  };

  const addItem = (id) => {
    let found = basket.find((x) => x.id == id);

    if (!found) {
      let product = products.find((x) => x.id == id);
      setBasket([...basket, { ...product, count: 1 }]);
    } else {
      setBasket(
        basket.map((item) =>
          item.id == id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  const decreaseItem = (id) => {
    let found = basket.find((x) => x.id === id);

    if (found) {
      setBasket(
        basket
          .map((item) =>
            item.id == id ? { ...item, count: item.count - 1 } : item
          )
          .filter((item) => item.count > 0)
      );
    }
  };

  const deleteItem = (id) => {
    setBasket(
      basket.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <div className="row">
        {products.map((book) => {
          return (
            <div key={book.id} className="book_container">
              <img src={book.photo} alt="" />
              <h3>{book.title}</h3>
              <h4>Price: {book.price}$</h4>
              <button onClick={() => moveToCart(book.id)} className="btn">
                Move to cart
              </button>
            </div>
          );
        })}
      </div>
      <div className="basket_section">
        <Basket
          basket={basket}
          onAddItem={addItem}
          onDecreaseItem={decreaseItem}
          onDeleteItem={deleteItem}
        />
        <TotalAmount total={total} />
      </div>
    </div>
  );
}
