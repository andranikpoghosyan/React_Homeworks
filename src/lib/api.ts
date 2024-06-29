import axios from "axios";
import { ITodo } from "./types";

export const getAll = async (): Promise<ITodo[]> => {
  const response = await axios.get("http://localhost:3004/todos");
  return response.data;
};

type inputToDo = Omit<ITodo, "id">;

export const add = async (obj: inputToDo): Promise<ITodo> => {
  const response = await axios.post("http://localhost:3004/todos", obj);
  return response.data;
};

export const toggleCompleted = async (
  id: string,
  completed: boolean
): Promise<ITodo> => {
  const response = await axios.patch(`http://localhost:3004/todos/${id}`, {
    completed,
  });

  return response.data;
};

export const deleteTodo = async (id: string): Promise<ITodo> => {
  const response = await axios.delete(`http://localhost:3004/todos/${id}`);

  return response.data;
};
