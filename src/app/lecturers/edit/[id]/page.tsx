import { handleUpdate } from "@/app/lib/actions/lecturers_actions";
import { getLecturerById } from "@/app/lib/api";
import { ImagePicker } from "@/app/lib/components/image_viewer";
import React from "react";
interface IProps {
  params: { id: number };
}

export default function Page({ params }: IProps) {
  const lecturer = getLecturerById(params.id);
  return (
    <>
      <div className="is-size-1">Edit Lecturer With ID: #{params.id}</div>
      <div className="columns">
        <div className="column  is-two-fifths my-4">
          <form className="box" action={handleUpdate}>
            <input type="hidden" name="id" defaultValue={params.id} />
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="name"
                placeholder="Enter a Name"
                defaultValue={lecturer.name}
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="surname"
                placeholder="Enter Surname"
                defaultValue={lecturer.surname}
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="age"
                placeholder="Enter age"
                defaultValue={lecturer.age}
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="subject"
                placeholder="Enter Subject"
                defaultValue={lecturer.subject}
              />
            </div>

            <div className="field my-4">
              <button className="button is-danger">Save</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
