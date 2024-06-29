import { Filters, IState } from "./types";

export const initialState: IState = {
  todos: [],
  currentFilter: Filters.all,
};
