import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { updateEvent } from "../lib/api";
import { ActionTypes, IEvent } from "../lib/types";
import { EventContext } from "../lib/Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

interface EditEventProps {
  event: IEvent;
  open: boolean;
  onClose: () => void;
}

const scheme = yup.object().shape({
  title: yup.string().required("Title is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  composer: yup.string().required("Composer is required"),
  type: yup.string().required("Type is required"),
  cover: yup.string().required("Cover is required"),
});

export const EditEvent: React.FC<EditEventProps> = ({
  event,
  open,
  onClose,
}) => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Out of provider");
  }

  const { dispatch } = context;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEvent>({
    resolver: yupResolver(scheme),
  });

  useEffect(() => {
    if (event) {
      setValue("title", event.title);
      setValue("date", event.date);
      setValue("time", event.time);
      setValue("composer", event.composer);
      setValue("type", event.type);
      setValue("cover", event.cover);
    }
  }, [event, setValue]);

  const handleEdit: SubmitHandler<IEvent> = async (data) => {
    const updatedEvent = { ...data, id: event.id };
    const savedEvent = await updateEvent(updatedEvent);
    dispatch({ type: ActionTypes.updateEvent, payload: savedEvent });
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(handleEdit)}>
          <Box my={2}>
            <TextField
              className="ev_inputs"
              variant="outlined"
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              className="ev_inputs"
              variant="outlined"
              label="Date"
              {...register("date")}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              className="ev_inputs"
              variant="outlined"
              label="Time"
              {...register("time")}
              error={!!errors.time}
              helperText={errors.time?.message}
            />
          </Box>
          <Box my={2}>
            <TextField
              className="ev_inputs"
              variant="outlined"
              label="Composer"
              {...register("composer")}
              error={!!errors.composer}
              helperText={errors.composer?.message}
            />
          </Box>
          <Box my={2} className="ev_inputs">
            <Select
              {...register("type")}
              className="ev_inputs"
              error={!!errors.type}
              defaultValue=""
            >
              <MenuItem value="opera">Opera</MenuItem>
              <MenuItem value="ballet">Ballet</MenuItem>
            </Select>
          </Box>
          <Box my={2}>
            <TextField
              className="ev_inputs"
              variant="outlined"
              label="Cover"
              {...register("cover")}
              error={!!errors.cover}
              helperText={errors.cover?.message}
            />
          </Box>
          <Button type="submit" variant="outlined">
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
