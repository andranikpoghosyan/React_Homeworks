import { handleUpdate } from "@/app/lib/actions/course-actions";
import { getCourseById } from "@/app/lib/api";
import React from "react";
interface IProps {
  params: { id: number };
}

export default function Page({ params }: IProps) {
  const course = getCourseById(params.id);
  console.log(course);
  return (
    <>
      <div className="is-size-1">Edit Course No. {params.id}</div>
      <div className="columns">
        <div className="column  is-two-fifths my-4">
          <form className="box" action={handleUpdate}>
            <input type="hidden" name="id" defaultValue={params.id} />
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="name"
                placeholder="enter a name"
                defaultValue={course.name}
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="price"
                placeholder="enter a price"
                defaultValue={course.price}
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                className="input is-primary"
                name="duration"
                placeholder="enter a duration"
                defaultValue={course.duration}
              />
            </div>
            <div className="field my-4"></div>
            <div className="field my-4">
              <button className="button is-danger">submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
