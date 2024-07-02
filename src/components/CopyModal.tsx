import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { addEvent } from "../lib/api";
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

interface Inputs {
  title: string;
  date: string;
  time: string;
  cover: string;
  type: string;
  composer: string;
}

const scheme = yup.object().shape({
  title: yup.string().required("Title is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  composer: yup.string().required("Composer is required"),
  type: yup.string().required("Type is required"),
  cover: yup.string().required("Cover is required"),
});

interface CopyModalProps {
  open: boolean;
  onClose: () => void;
  ev: IEvent;
}

export const CopyModal: React.FC<CopyModalProps> = ({ open, onClose, ev }) => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Out of provider");
  }

  const { dispatch } = context;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(scheme),
    defaultValues: {
      title: ev.title,
      date: ev.date,
      time: ev.time,
      composer: ev.composer,
      type: ev.type,
      cover: ev.cover,
    },
  });

  const handleCopy: SubmitHandler<IEvent> = async (data) => {
    const newEvent = await addEvent(data);
    dispatch({ type: ActionTypes.addEvent, payload: newEvent });
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(handleCopy)}>
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
              defaultValue={ev.type}
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
