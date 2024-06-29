import { ActionTypes, IAction, IState, ITodo } from "./types";

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.setTodos:
      return { ...state, todos: action.payload as ITodo[] };

    case ActionTypes.addTodo:
      return { ...state, todos: [...state.todos, action.payload as ITodo] };

    case ActionTypes.updateTodo:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };
    case ActionTypes.removeTodo:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id != action.payload.id),
      };
    default:
      return state;
  }
};
