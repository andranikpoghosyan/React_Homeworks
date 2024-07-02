import { useEffect, useReducer } from "react";
import "./App.css";
import { EventList } from "./components/EventList";
import { Filter } from "./components/Filter";
import { reducer } from "./lib/reducer";
import { initialState } from "./lib/initialState";
import { EventContext } from "./lib/Context";
import { delEvent, getAllEvents } from "./lib/api";
import { ActionTypes } from "./lib/types";
import { AddEvent } from "./components/AddEvent";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getAllEvents(state.currentFilter).then((response) => {
      dispatch({ type: ActionTypes.setEvents, payload: response });
    });
  }, [state.currentFilter]);

  const deleteEvent = async (id: string) => {
    await delEvent(id);
    dispatch({ type: ActionTypes.deleteEvent, payload: id });
  };

  return (
    <div className="App">
      <EventContext.Provider value={{ state, dispatch }}>
        <Filter />
        <AddEvent />
        <EventList onDelete={deleteEvent} />
      </EventContext.Provider>
    </div>
  );
}

export default App;
