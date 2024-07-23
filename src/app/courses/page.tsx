import React from "react";
import { deleteCourseById, getAllCourses } from "../lib/api";
import { CourseList } from "../lib/components/course-list";

export default function Page() {
  const list = getAllCourses();
  return (
    <div>
      <h1 className="is-size-1">Courses</h1>
      <p>Choose an amazing course for you!!</p>

      <div className="courseList">
        <CourseList courses={list} onDelete={deleteCourseById} />
      </div>
    </div>
  );
}
