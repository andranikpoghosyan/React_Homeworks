import { useContext } from "react";
import { EventContext } from "../lib/Context";
import { Button } from "@mui/material";

interface EventListProps {
  onDelete: (id: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ onDelete }) => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Out of provider");
  }

  const { state } = context;

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <>
      <h1>Event List</h1>
      <div className="list">
        {state.events.map((event) => (
          <div className="item_box" key={event.id}>
            <img src={event.cover} alt="" />
            <p>{event.title}</p>
            <small>
              {event.type} by <strong>{event.composer}</strong>
            </small>
            <p>
              {event.date} at {event.time}
            </p>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleDelete(event.id);
              }}
            >
              Delete Event
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
