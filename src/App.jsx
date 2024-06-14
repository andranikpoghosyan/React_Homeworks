import React, { useState } from "react";
import ProductList from "./components/productList/ProductList";
import Basket from "./components/basket/Basket";
import TotalAmount from "./components/totalAmount/TotalAmount";

import "./App.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 101,
      title: "Psychology",
      price: 40,
      photo:
        "https://m.media-amazon.com/images/I/91AiNeHUoNL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 102,
      title: "Psychology",
      price: 95,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8OYY9wZNL53GStVz8lu2p2E6kXra0vsE2jg&s",
    },
    {
      id: 103,
      title: "Sociology",
      price: 44,
      photo:
        "https://m.media-amazon.com/images/I/81z-Pj9NxjL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 104,
      title: "LGBTQ History",
      price: 57,
      photo:
        "https://static.wixstatic.com/media/2b6d5a_f98f7795d1494a24b02ebf18adffc1af~mv2.jpg/v1/fill/w_308,h_364,al_c,lg_1,q_80,enc_auto/2b6d5a_f98f7795d1494a24b02ebf18adffc1af~mv2.jpg",
    },
    {
      id: 105,
      title: "Art",
      price: 89,
      photo: "https://images.booksense.com/images/372/453/9781465453372.jpg",
    },
    {
      id: 106,
      title: "Politics",
      price: 55,
      photo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLHZrAuqLNo3hj2fuJgJxPXYs9XrPaF25QbA&s",
    },
    {
      id: 107,
      title: "Politics",
      price: 60,
      photo: "https://i.ebayimg.com/images/g/rGUAAOSwaQVh08aH/s-l1200.webp",
    },
    {
      id: 108,
      title: "Politics",
      price: 110,
      photo:
        "https://m.media-amazon.com/images/I/81G6Boga2rL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 109,
      title: "Politics",
      price: 30,
      photo:
        "https://m.media-amazon.com/images/I/41M0i0Sj8YL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 110,
      title: "Politics",
      price: 50,
      photo:
        "https://m.media-amazon.com/images/I/51KDCZAL6OL._AC_UF1000,1000_QL80_.jpg",
    },
  ]);
  const [basket, setBasket] = useState([]);
  const [saleApplied, setSaleApplied] = useState(false);

  const moveToCart = (id) => {
    let found = basket.find((x) => x.id == id);

    if (!found) {
      let product = products.find((x) => x.id == id);
      setBasket([...basket, { ...product, count: 1 }]);
    } else {
      setBasket(
        basket.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        )
      );
    }
  };

  const calculateTotalAmount = () => {
    return basket.reduce((acc, item) => acc + item.price * item.count, 0);
  };

  const addItem = (id) => {
    let found = basket.find((x) => x.id == id);

    if (!found) {
      let product = products.find((x) => x.id == id);
      setBasket([...basket, { ...product, count: 1 }]);
    } else {
      setBasket(
        basket.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
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
            item.id === id ? { ...item, count: item.count - 1 } : item
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

  const saleItem = () => {
    if (!saleApplied) {
      const updatedBasket = basket.map((item) =>
        item.count > 3
          ? { ...item, price: (item.price * (item.count - 1)) / item.count }
          : item
      );
      setBasket(updatedBasket);
      setSaleApplied(true);
    }
  };

  return (
    <div className="App">
      <div className="row">
        <ProductList items={products} onMove={moveToCart} />
        <div className="basket_section">
          <Basket
            items={basket}
            onAddItem={addItem}
            onDecreaseItem={decreaseItem}
            onDeleteItem={deleteItem}
            onSaleItem={saleItem}
            saleApplied={saleApplied}
          />
          <TotalAmount total={calculateTotalAmount()} />
        </div>
      </div>
    </div>
  );
}
