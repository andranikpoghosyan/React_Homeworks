import { useEffect, useState } from "react";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import axios from "axios";
import Types from "prop-types";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const addNewUserNotify = (message) => toast(message);
  const deleteUserNotify = (message) => toast.warning(message);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    surname: yup.string().required("Surname is required"),
    salary: yup
      .number()
      .typeError("Salary must be a number")
      .required("Salary is required")
      .positive("Salary must be a positive number"),
  });

  const addItem = (obj) => {
    setUsers([...users, obj]);
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3004/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
    deleteUserNotify("You delete user");
  };

  const salaryUp = (id) => {
    const getUserId = users.find((elem) => elem.id == id);

    const updatedUser = {
      ...getUserId,
      salary: parseInt(getUserId.salary) + 50000,
    };

    axios
      .put(`http://localhost:3004/users/${id}`, updatedUser)
      .then(() => {
        setUsers(
          users.map((user) => {
            if (user.id == id) {
              toast.success("You are the best boss ever!!");
              return updatedUser;
            } else {
              return user;
            }
          })
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update salary.");
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3004/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="row">
      <AddUser
        onNotify={() => addNewUserNotify("You did it! Congratulations")}
        onAdd={addItem}
        schema={schema}
      />
      <UserList users={users} onDelete={deleteItem} onSalaryUp={salaryUp} />
      <ToastContainer />
    </div>
  );
}

export default App;

AddUser.propTypes = {
  addNewUserNotify: Types.func,
  deleteUserNotify: Types.func,
  users: Types.array,
};
