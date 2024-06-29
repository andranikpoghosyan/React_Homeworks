import { useContext } from "react";
import { ActionTypes, ITodo } from "../lib/types";
import { ToDoContext } from "../lib/context";
import { deleteTodo, toggleCompleted } from "../lib/api";

interface Props {
  todo: ITodo;
}

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const context = useContext(ToDoContext);

  if (!context) {
    throw new Error("context is not defined");
  }

  const { state, dispatch } = context;

  const handleCompleted = async (id: string) => {
    try {
      const updatedTodo = await toggleCompleted(id, !todo.completed);
      dispatch({ type: ActionTypes.updateTodo, payload: updatedTodo });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const removeTodo = await deleteTodo(id);
      dispatch({ type: ActionTypes.removeTodo, payload: removeTodo });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`item ${todo.completed ? "completed" : ""}`}>
      <p>{todo.text}</p>
      <div>
        <button onClick={() => handleCompleted(todo.id)}>Done</button>
        <button onClick={() => handleDelete(todo.id)}>Remove</button>
      </div>
    </div>
  );
};
