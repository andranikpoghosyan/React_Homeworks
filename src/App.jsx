import { useState } from "react";
import Signup from "./Signup";
import "./App.css";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Marat",
      surname: "Hakobyan",
      login: "Marat666@gmail.com",
      password: "marat666",
    },
    {
      id: 2,
      name: "Harut",
      surname: "Simonyan",
      login: "Niva111@gmail.com",
      password: "niva666",
    },
    {
      id: 3,
      name: "Ashot",
      surname: "Ashotyan",
      login: "Ashot666@gmail.com",
      password: "ashot666",
    },
    {
      id: 4,
      name: "Babken",
      surname: "Babkenyan",
      login: "Babken666@mail.ru",
      password: "babken666",
    },
    {
      id: 5,
      name: "Sargis",
      surname: "Sargsyan",
      login: "Saqo666@yandex.ru",
      password: "saqo666",
    },
  ]);

  const handleAdd = (obj) => {
    setUsers([...users, { ...obj, id: users.length + 1 }]);
  };

  return (
    <div className="App">
      <Signup users={users} onAddUser={handleAdd} />
    </div>
  );
}

export default App;
