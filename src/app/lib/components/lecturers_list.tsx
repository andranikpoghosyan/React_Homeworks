import React from "react";
import { ILecturer } from "../api";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  lecturers: ILecturer[];
}

export const LecturerList = ({ lecturers }: IProps) => {
  return (
    <>
      <div className="columns">
        {lecturers.map((lecturer) => {
          return (
            <div key={lecturer.id} className="column lect_cart">
              <Image
                src={"/" + lecturer.cover}
                width={200}
                height={200}
                alt="lecturer photo"
              />
              <div className="info_div">
                <p>Name: {lecturer.name}</p>
                <p>Surname: {lecturer.surname}</p>
                <p>AGE: {lecturer.age}</p>
                <p>Subject: {lecturer.subject} </p>
                <Link
                  href={"/lecturers/edit/" + lecturer.id}
                  className="button"
                >
                  Edit
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
