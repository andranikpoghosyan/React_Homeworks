import { useEffect, useReducer } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";
import { reducer } from "./lib/reducer";
import { initialState } from "./lib/initialState";
import { getAll } from "./lib/api";
import { ToDoContext } from "./lib/context";
import { ActionTypes } from "./lib/types";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getAll().then((res) => {
      dispatch({ type: ActionTypes.setTodos, payload: res });
    });
  }, []);

  return (
    <>
      <ToDoContext.Provider value={{ state, dispatch }}>
        <ToDoList />
      </ToDoContext.Provider>
    </>
  );
}

export default App;
