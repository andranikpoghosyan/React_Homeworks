import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
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

export const AddEvent = () => {
  const [open, setOpen] = useState<boolean>(false);

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
  });

  const handleAdd: SubmitHandler<IEvent> = async (data) => {
    const newEvent = await addEvent(data);
    dispatch({ type: ActionTypes.addEvent, payload: newEvent });
    reset();
    setOpen(false);
  };

  return (
    <Box my={2}>
      <Button onClick={() => setOpen(true)} variant="contained">
        add
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(handleAdd)}>
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
                // helperText={errors.type?.message}
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
              submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
