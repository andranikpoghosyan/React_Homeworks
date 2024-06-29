import { Dispatch } from "react";

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IState {
  todos: ITodo[];
  currentFilter: Filters;
}

export interface IAction {
  type: ActionTypes;
  payload: unknown;
}

export interface IContextType {
  state: IState;
  dispatch: Dispatch<IAction>;
}

export enum Filters {
  all,
  active,
  completed,
}

export enum ActionTypes {
  setTodos,
  addTodo,
  removeTodo,
  updateTodo,
  setFilter,
}
