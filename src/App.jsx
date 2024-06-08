import { useState } from "react";
import "./App.css";

// Լսարանում մշակված օրինակին ավելացնե փոփոխություններ.

function App() {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([
    { id: 101, name: "Tiko", salary: 200000 },
    { id: 102, name: "Luso", salary: 300000 },
    { id: 103, name: "Ano", salary: 100000 },
    { id: 104, name: "Valod", salary: 400000 },
    { id: 105, name: "Hayko", salary: 230000 },
    { id: 106, name: "Vacho", salary: 320000 },
    { id: 107, name: "Margo", salary: 160000 },
    { id: 108, name: "Gayan", salary: 410000 },
    { id: 109, name: "Simon", salary: 180000 },
    { id: 110, name: "Anna", salary: 80000 },
  ]);

  const salaryUp = (id) =>
    setUsers(
      users.map((elem) => {
        return elem.id === id ? { ...elem, salary: elem.salary + 50000 } : elem;
      })
    );

  // - աղյուսակիւ յուրաքանչյուր տողում ունենալ նաև այլ button՝ salary down
  // - քլիկի ժամանակ տվյալ մարդու աշխատավարձը պակասում է 50.000-ով, սակայն երբեք չի լինում ավելի փոքր թիվ, քան 50.000-y

  const salaryDown = (id) => {
    setUsers(
      users.map((elem) => {
        if (elem.id === id) {
          if (elem.salary > 100000) {
            elem.salary -= 50000;
          } else {
            elem.salary = 50000;
          }
        }
        return elem;
      })
    );
  };

  // - ավելացնել նաև remove button, որի քլիկի ժամանակ հեռացնել մարդու տվյալը

  const deleteCurrentUser = (id) => {
    setUsers(
      users.filter((elem) => {
        return elem.id !== id;
      })
    );
  };

  return (
    <div className="App">
      <h2>Number: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Up!!!</button>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elem) => {
            return (
              <tr key={elem.id}>
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{elem.salary} AMD</td>
                <td>
                  <button onClick={() => salaryUp(elem.id)}>Salary Up</button>
                  <button onClick={() => salaryDown(elem.id)}>
                    Salary Down
                  </button>
                  <button onClick={() => deleteCurrentUser(elem.id)}>
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
