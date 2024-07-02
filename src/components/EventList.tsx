import { useContext, useState } from "react";
import { EventContext } from "../lib/Context";
import { Button } from "@mui/material";
import { CopyModal } from "./CopyModal";
import { IEvent } from "../lib/types";
import { EditEvent } from "./EditEvents";

interface EventListProps {
  onDelete: (id: string) => void;
}

export const EventList: React.FC<EventListProps> = ({ onDelete }) => {
  const context = useContext(EventContext);

  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  if (!context) {
    throw new Error("Out of provider");
  }

  const { state } = context;

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleCopy = (event: IEvent) => {
    setSelectedEvent(event);
    setIsCopyModalOpen(true);
  };

  const handleEdit = (event: IEvent) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const closeCopyModal = () => {
    setIsCopyModalOpen(false);
    setSelectedEvent(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="eventlist">
      <h1 className="events_title">Event List</h1>
      <div className="list">
        {state.events.map((event) => (
          <div className="item_box" key={event.id}>
            <img src={event.cover} />
            <h2>{event.title}</h2>
            <p>
              {event.type} <small>by</small> <strong>{event.composer}</strong>
            </p>
            <h4>
              {event.date} at {event.time}
            </h4>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(event.id)}
            >
              Delete Event
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleCopy(event)}
            >
              Copy Event
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(event)}
            >
              Edit Event
            </Button>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <>
          <CopyModal
            open={isCopyModalOpen}
            onClose={closeCopyModal}
            ev={selectedEvent}
          />
          <EditEvent
            event={selectedEvent}
            open={isEditModalOpen}
            onClose={closeEditModal}
          />
        </>
      )}
    </div>
  );
};
