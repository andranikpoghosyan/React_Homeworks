import Database from "better-sqlite3";

export interface ILecturer {
  id: number;
  name: string;
  surname: string;
  age: number;
  cover: string;
  subject: string;
}

const db = new Database("lecturers.db");

export type InputLecturer = Omit<ILecturer, "id">;
export type LecturerWithout = Omit<InputLecturer, "cover">;

export const addLecturer = (lecturer: InputLecturer) => {
  db.prepare(
    `
            INSERT INTO lecturers(name, surname, age, cover, subject)
            VALUES(@name, @surname, @age, @cover, @subject)
    `
  ).run(lecturer);
};

export const getAllLecturers = (): ILecturer[] => {
  return db
    .prepare(
      `
            SELECT * FROM lecturers
    `
    )
    .all() as ILecturer[];
};

export const getLecturerById = (id: number): ILecturer => {
  return db
    .prepare("SELECT * FROM lecturers where id = ?")
    .get(id) as ILecturer;
};

export const updateLecturerById = (id: number, lecturer: LecturerWithout) => {
  return db
    .prepare(
      "UPDATE lecturers set name=?, surname=?, age=?, subject=? WHERE id = ?"
    )
    .run(lecturer.name, lecturer.surname, lecturer.age, lecturer.subject, id);
};
