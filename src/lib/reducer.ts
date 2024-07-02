import { ActionTypes, FilterTypes, IAction, IEvent, IState } from "./types";

export const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.setEvents:
      return { ...state, events: action.payload as IEvent[] };

    case ActionTypes.setFilter:
      return { ...state, currentFilter: action.payload as FilterTypes };

    case ActionTypes.addEvent:
      return {
        ...state,
        events: [...state.events, action.payload as IEvent],
      };

    case ActionTypes.deleteEvent:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };

    case ActionTypes.updateEvent:
      return {
        ...state,
        events: state.events.map((ev) => {
          if (ev.id == (action.payload as IEvent).id) {
            return action.payload as IEvent;
          } else {
            return ev;
          }
        }),
      };

    default:
      return state;
  }
};
