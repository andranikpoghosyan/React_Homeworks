import React from "react";
import { ICourse } from "../api";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  courses: ICourse[];
  onDelete: (id: number) => void;
}

export const CourseList = ({ courses, onDelete }: IProps) => {
  return (
    <>
      <div className="columns">
        {courses.map((course) => {
          return (
            <div key={course.id} className="column">
              <Image
                src={"/" + course.cover}
                width={200}
                height={200}
                alt="course photo"
              />
              <p>{course.name}</p>
              <p>for {course.duration} months</p>
              <p>with {course.price} per month</p>
              <ul>
                {course.modules?.map((module) => (
                  <li key={module.id}>{module.name}</li>
                ))}
              </ul>
              <Link href={"/courses/edit/" + course.id} className="button">
                Edit
              </Link>
              <button className="button is-danger">Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
