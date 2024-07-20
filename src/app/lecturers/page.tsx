import React from "react";
import { LecturerList } from "../lib/components/lecturers_list";
import { getAllLecturers } from "../lib/api";

export default function Page() {
  const list = getAllLecturers();
  return (
    <div>
      <h1 className="is-size-1">Lecturers List</h1>
      <p>Choose Lecturers</p>

      <div className="lecturersList">
        <LecturerList lecturers={list} />
      </div>
    </div>
  );
}
