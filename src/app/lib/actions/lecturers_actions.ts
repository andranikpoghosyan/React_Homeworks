"use server";

import { createWriteStream } from "fs";
import {
  LecturerWithout,
  InputLecturer,
  addLecturer,
  updateLecturerById,
} from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (data: FormData) => {
  const photo = data.get("cover") as File;
  if (photo) {
    let extension = photo.type.split("/").at(-1);
    const filename = Date.now() + "." + extension;

    const stream = createWriteStream("public/images/" + filename);

    const bufferedImage = await photo.arrayBuffer();

    stream.write(Buffer.from(bufferedImage));

    let lecturer: InputLecturer = {
      name: data.get("name") as string,
      surname: data.get("surname") as string,
      age: +(data.get("age") as string),
      subject: data.get("subject") as string,
      cover: "images/" + filename,
    };

    addLecturer(lecturer);
    redirect("/lecturers");
  }
};

export const handleUpdate = async (data: FormData) => {
  let lecturer: LecturerWithout = {
    name: data.get("name") as string,
    surname: data.get("surname") as string,
    age: +(data.get("age") as string),
    subject: data.get("subject") as string,
  };

  let id = +(data.get("id") as string);

  updateLecturerById(id, lecturer);
  redirect("/lecturers");
};
