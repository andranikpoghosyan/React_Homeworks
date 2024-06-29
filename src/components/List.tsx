import { useContext } from "react";
import { ToDoContext } from "../lib/context";
import { ToDoItem } from "./ToDoItem";

export const List: React.FC = () => {
  const context = useContext(ToDoContext);

  if (!context) {
    throw new Error("context is not defined");
  }

  const { state } = context;

  return (
    <div className="list">
      {state.todos.map((elem) => (
        <ToDoItem key={elem.id} todo={elem} />
      ))}
    </div>
  );
};
