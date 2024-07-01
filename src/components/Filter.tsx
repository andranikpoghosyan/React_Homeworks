import { MenuItem, Select } from "@mui/material";
import { useContext } from "react";
import { EventContext } from "../lib/Context";
import { ActionTypes } from "../lib/types";

export const Filter: React.FC = () => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Out of provider");
  }

  const { state, dispatch } = context;

  return (
    <div className="filter_container">
      <Select
        sx={{ width: 300 }}
        value={state.currentFilter}
        onChange={(e) =>
          dispatch({ type: ActionTypes.setFilter, payload: e.target.value })
        }
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="opera">Opera</MenuItem>
        <MenuItem value="ballet">Ballet</MenuItem>
      </Select>
    </div>
  );
};