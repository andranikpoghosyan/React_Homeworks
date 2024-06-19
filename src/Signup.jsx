import React, { useState } from "react";

export default function Signup({ users, onAddUser }) {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    login: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !user.name.trim() ||
      !user.surname.trim() ||
      !user.login.trim() ||
      !user.password.trim()
    ) {
      setMessage("All inputs are required, please fill all inputs");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    if (!isValidEmail(user.login)) {
      setMessage("Please type a valid email");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    const findLogin = users.some((elem) => elem.login === user.login);
    if (findLogin) {
      setMessage("This login is already exist");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    if (user.password.length < 6) {
      setMessage("Password must contains more than 6 symbols");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return;
    }

    onAddUser(user);

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);

    setUser({ name: "", surname: "", login: "", password: "" });
    setMessage("");
  };

  return (
    <div className="signup">
      {showNotification && <div className="notification">{message}</div>}
      {isSuccess && (
        <div className="success_message">Tnayin is done Successfully</div>
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Login</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((elem) => (
            <tr key={elem.id}>
              <td>{elem.id}</td>
              <td>{elem.name}</td>
              <td>{elem.surname}</td>
              <td>{elem.login}</td>
              <td>{elem.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Surname"
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
        />
        <input
          type="text"
          placeholder="Login"
          value={user.login}
          onChange={(e) => setUser({ ...user, login: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="button-81">Save</button>
      </form>
    </div>
  );
}
