import React from "react";

export const UserContext = React.createContext();

export const initialState = {
  products: [
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
  ],
  basket: [],
  totalAmount: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        users: state.users.filter((elem) => elem.id !== action.payload),
      };

    case "deleteItem":
      return deleteItem(state, action.payload);

    case "addItem":
      return addItem(state, action.payload);

    case "decreaseItem":
      return decreaseItem(state, action.payload);

    case "calculateTotalAmount":
      return calculateTotalAmount(state, action.payload);

    case "calculateTotal":
      return { ...state, totalAmount: calculateTotalAmount(state.basket) };

    default:
      return state;
  }
};

const deleteItem = (state, id) => {
  return {
    ...state,
    basket: state.basket.filter((item) => item.id !== id),
  };
};

const addItem = (state, id) => {
  let item = state.basket.find((x) => x.id === id);
  if (item) {
    return {
      ...state,
      basket: state.basket.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      ),
    };
  } else {
    let product = state.products.find((x) => x.id === id);
    return {
      ...state,
      basket: [...state.basket, { ...product, count: 1 }],
    };
  }
};

const decreaseItem = (state, id) => {
  return {
    ...state,
    basket: state.basket
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0),
  };
};

const calculateTotalAmount = (basket) => {
  return basket.reduce((a, b) => a + b.price * b.count, 0);
};
