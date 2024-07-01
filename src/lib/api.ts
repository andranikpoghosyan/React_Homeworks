import axios from "axios";
import { FilterTypes, IEvent } from "./types";

const URL = "http://localhost:3004/events/";

export const getAllEvents = async (
  type: FilterTypes = FilterTypes.all
): Promise<IEvent[]> => {
  let temp = URL;
  if (type != FilterTypes.all) {
    temp += "?type=" + type;
  }

  const response = await axios(temp);
  return response.data;
};

export const addEvent = async (data: IEvent): Promise<IEvent> => {
  const response = await axios.post<IEvent>(URL, data);
  console.log(response.data);
  return response.data;
};

export const delEvent = async (id: string): Promise<void> => {
  const url = `${URL}${id}`;
  console.log(url);
  await axios.delete(url);
};
