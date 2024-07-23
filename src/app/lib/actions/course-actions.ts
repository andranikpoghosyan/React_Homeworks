"use server";

import { createWriteStream } from "fs";
import {
  CourseWithout,
  InputCourse,
  InputModule,
  addCourse,
  addModuleDb,
  getAllCourses,
  updateCourseById,
} from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (prev: unknown, data: FormData) => {
  let name = data.get("name") as string;
  let price = +(data.get("price") as string);
  let duration = +(data.get("duration") as string);
  let photo = data.get("cover") as File;

  if (!name) {
    return { message: "Name is required" };
  }

  if (!price || isNaN(Number(price)) || Number(price) <= 0) {
    return { message: "Price must be a valid number greater than 0." };
  }

  if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
    return { message: "Duration must be a valid number greater than 0." };
  }

  if (!photo) {
    return { message: "Cover image is required" };
  }

  const existingCourses = getAllCourses();
  if (existingCourses.some((course) => course.name === name)) {
    return { message: "A course with this name already exists" };
  }

  if (photo) {
    let extension = photo.type.split("/").at(-1);
    const filename = Date.now() + "." + extension;

    const stream = createWriteStream("public/images/" + filename);

    const bufferedImage = await photo.arrayBuffer();

    stream.write(Buffer.from(bufferedImage));

    let course: InputCourse = {
      name: name,
      price: Number(price),
      duration: Number(duration),
      cover: "images/" + filename,
    };

    addCourse(course);
    redirect("/");
  }
};

export const handleUpdate = async (data: FormData) => {
  let course: CourseWithout = {
    name: data.get("name") as string,
    price: +(data.get("price") as string),
    duration: +(data.get("duration") as string),
  };

  let id = +(data.get("id") as string);

  updateCourseById(id, course);
  redirect("/courses");
};

export const addModule = async (data: FormData) => {
  let obj: InputModule = {
    name: data.get("name") as string,
    duration: +(data.get("duration") as string),
    courseId: +(data.get("courseId") as string),
  };

  addModuleDb(obj);
  redirect("/courses");
};
